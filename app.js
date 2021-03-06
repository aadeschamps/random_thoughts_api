// require npm packages
var express = require('express'),
	fs = require('fs'),
	ejs = require('ejs'),
	moment = require("moment"),
	bodyParser = require('body-parser'),
	levelup = require('level'),
	app = express(),
	mongoose = require('./models/connection'),
	cors = require('cors');
	logger = require('./lib/middleware/logger');

// import route files
var thoughts = require('./routes/thoughts')
// console.log(mongoose);
// initiate middlewares
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(logger);
app.use(cors());

// mount route files
app.use('/thoughts', thoughts);

// setup index route (only file to send html)
app.get('/', function(req, res){
	res.render("index.ejs",{});
});


// start server on port specified
var port = parseInt(process.argv[2]) || 3000;
app.listen(port, function(){
	console.log('listening on port ' + port);
});








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