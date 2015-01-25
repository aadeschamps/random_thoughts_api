var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var moment = require("moment")
var bodyParser = require('body-parser');
var levelup = require('level');
var db = levelup('./models/mydb', { valueEncoding:'json' } );
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var thoughts = [];
var items;
var first = {
	thought: "This is awesome!",
	timestamp: moment().format()
}
var second = {
	thought: "I like eggs",
	timestamp: moment().format()
}
db.put("1", first);
db.put("2", second);

db.createReadStream()
	.on('data', function(data){
		// parsed = JSON.parse(data.value);
		thoughts.push(data.value);
		console.log(data);
		items = parseInt(data.key);
	})
	.on('error', function(err){
		console.log("Error reading DB");
	})
	.on('end', function(){
		console.log(thoughts);
		console.log(items);
	});


app.get('/', function(req, res){
	res.render("index.ejs",{});
});

app.get('/thought', function(req, res){
	var rand = Math.floor(Math.random() * thoughts.length)
	var thought = thoughts[rand];
	var response = {
		results: thought,
		status: "Success"
	}
	res.send(response);
});

app.get('/all', function(req, res){
	var response = {
		results: thoughts,
		status: "Success"
	}
	res.send(response);
})

app.post('/add', function(req, res){
	var data = req.body.info;
	if(data != "" && data.length < 30){
		var input = {
			thought: data,
			timestamp: moment().format()
		}
		console.log(data);
		thoughts.push(input);
		console.log(thoughts);
		items++;
		var key = items.toString()
		db.put(key, input);
	}
});

app.listen(3000);
