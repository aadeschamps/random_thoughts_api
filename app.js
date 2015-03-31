
// require npm packages
var express = require('express'),
	fs = require('fs'),
	ejs = require('ejs'),
	moment = require("moment"),
	bodyParser = require('body-parser'),
	levelup = require('level'),
	app = express();

// import route files
var thoughts = require('./routes/thoughts')

// initiate middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// mount routers
app.use('/thoughts', thoughts);


require('./models/thoughts');

var thoughts = ['something'];


app.get('/', function(req, res){
	res.render("index.ejs",{});
});


app.listen(3000);








// deprecated

// var items;
// db.createReadStream()
// 	.on('data', function(data){
// 		// parsed = JSON.parse(data.value);
// 		thoughts.push(data.value);
// 		items = parseInt(data.key);
// 	})
// 	.on('error', function(err){
// 		console.log("Error reading DB");
// 	})
// 	.on('end', function(){
// 		// console.log(thoughts);
// 		// console.log(items);
// 	});

// var db = levelup('./db/mydb', { valueEncoding:'json' } );
// var wordsDb = levelup('./models/words');

// app.get('/thoughts', function(req, res){
// 	var response = {
// 		results: thoughts,
// 		status: "Success"
// 	}
// 	res.send(response);
// });