var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var thoughts = ["This API is awesome", "I like eggs"];

app.get('/', function(req, res){
	res.render("index.ejs",{});
});

app.get('/thought', function(req, res){
	var rand = Math.floor(Math.random() * thoughts.length)
	var thought = thoughts[rand];
	var response = {
		thought: thought
	}
	res.send(response);
});

app.post('/add', function(req, res){
	var data = req.body.info;
	if(data != "" && data.length < 30){
		console.log(data);
		thoughts.push(data);
		console.log(thoughts);
	}
});

app.listen(80);
