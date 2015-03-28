var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var moment = require("moment")
var bodyParser = require('body-parser');
var levelup = require('level');
var db = levelup('./db/mydb', { valueEncoding:'json' } );
// var wordsDb = levelup('./models/words');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var thoughts = [];
var items;
db.createReadStream()
	.on('data', function(data){
		// parsed = JSON.parse(data.value);
		thoughts.push(data.value);
		items = parseInt(data.key);
	})
	.on('error', function(err){
		console.log("Error reading DB");
	})
	.on('end', function(){
		// console.log(thoughts);
		// console.log(items);
	});


app.get('/', function(req, res){
	res.render("index.ejs",{});
});

app.get('/demo', function(req,res){
	res.render('top.ejs', {});
});

app.get('/thought', function(req, res){
	var amount = req.query.amount;
	if(amount === undefined){
		amount = 1;
	}else{
		amount = parseInt(amount);
	}
	var results = []
	for(var i = 0; i < amount; i++) {
		var rand = Math.floor(Math.random() * thoughts.length)
		var thought = thoughts[rand];
		results.push(thought);
	};
	var response = {
		results: results,
		status: "Success"
	}
	res.send(response);
});

app.get('/thought/search', function(req, res){
	var keyword = req.query.keyword;
	var key_thoughts = [];
	if(keyword != undefined){
		key_thoughts = searchKeywords(keyword.toUpperCase());
	}
	console.log(key_thoughts);
	if(key_thoughts.length > 0){
		var response = {
			results: key_thoughts,
			status: "Success"
		}
	}else{
		var response = {
			results: key_thoughts,
			status: "Must have keyword param"
		}
	}
	res.send(response);
});

app.get('/thought/word_freq', function(req, res){
	var amount = req.query.amount;
	var frequencies = sortTop();
	if(amount === undefined){
		amount = frequencies.length;
	}
	console.log(frequencies.length)
	if(amount <= frequencies.length && amount <= 50){
		var top = frequencies.slice(0, parseInt(amount));
		var response = {
			results: top,
			status: "Success"
		};
	}else{
		var response = {
			results: [],
			status: "Maximum amount is 50"
		} 
	}
	res.json(response);
});


app.get('/thoughts', function(req, res){
	var response = {
		results: thoughts,
		status: "Success"
	}
	res.send(response);
});

app.post('/thought', function(req, res){
	var data = req.body.info;
	if(data != "" && data.length < 30){
		var input = {
			thought: data,
			time_stamp: moment().format()
		}
		thoughts.push(input);
		items++;
		var key = items.toString()
		db.put(key, input);
	}
});


app.listen(3000);


function searchKeywords( keyword ){
	array = [];
	thoughts.forEach(function(elem){
		words = elem.thought.split(" ");
		var exists = false;
		words.forEach(function(word){
			console.log(word);
			if ( word.toUpperCase() === keyword && !exists){
				array.push(elem);
				exists = true;
			}
		})
	})
	return array;
}

function sortTop(){
	var word_freq = [];
	thoughts.forEach(function(elem){
		// console.log(elem);
		words = elem.thought.split(" ");
		words.forEach(function(word){
			var contains = false;
			word_freq.forEach(function(match){
				if( match.word === word){
					contains = true;
					match.times+=1;
				}
				// console.log(word);
			});
			if(!contains){
				word_freq.push({word: word, times:1});
			}
		});	
	});
	word_freq.sort(function(a,b){
		return b.times - a.times;
	})
	return word_freq;
};

function sortObjects(sorting){

}