var express = require('express'),
	router = express.Router(),
	moment = require("moment"),
	searchKeywords = require('../lib/helpers/search_helper'),
	sortTop = require('../lib/helpers/sort_helper'),
	normalize = require('../lib/helpers/normalize_thoughts_helper')
	mongoose = require('mongoose'),
	Thoughts = require('../models/thought');


router.get('/', function(req, res){
	var amount = req.query.amount;
	if(amount === undefined){
		amount = 1;
	}else{
		amount = parseInt(amount);
	}
	Thoughts.find(function(err, thoughts){
		if (err) {
			console.log(err);
		}else{
			thoughts = normalize(thoughts);
			console.log(thoughts[2].created_at);
			var results = 	[]
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
		}
	})
	
});

router.post('/', function(req, res){
	var data = req.body.info;
	if(data != "" && data.length < 30){
		var input = {
			thought: data,
		}
		Thoughts.create(input, function(err, thought) {
			if (err){
				console.log('error')
				var response = {
					results: [],
					status: "Failure"
				}
				res.send(response);
				throw err;
				console.log()
			}else{
				console.log(thought);
				var response = {
					results: [thought],
					status: "Success"
				}
				res.send(response);
			}
		})
	}
});


router.get('/search', function(req, res){
	var keyword = req.query.keyword;
	var key_thoughts = [];
	Thoughts.find(function(err, thoughts){
		if (err) {
			console.log(err);
		}else{
			thoughts = normalize(thoughts);
			if(keyword != undefined){
				key_thoughts = searchKeywords(keyword.toUpperCase(), thoughts);
			}
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
		}
	})
});


router.get('/word_freq', function(req, res){
	var amount = req.query.amount;
	Thoughts.find(function(err, thoughts){
		if (err) {
			console.log(err);
		}else{
			thoughts = normalize(thoughts);
			var frequencies = sortTop(thoughts);
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
		}
	})
	
});



module.exports = router;