var express = require('express');
var router = express.Router();
var moment = require("moment");
var searchKeywords = require('../helpers/search_helper');
var sortTop = require('../helpers/sort_helper.js')
console.log(searchKeywords);
var thoughts = ['something'];

// router.get('/', function(req, res){
// 	var response = {
// 		results: thoughts,
// 		status: "Success"
// 	}
// 	res.send(response);
// });

router.get('/', function(req, res){
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

router.post('/', function(req, res){
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


router.get('/search', function(req, res){
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

router.get('/word_freq', function(req, res){
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



module.exports = router;