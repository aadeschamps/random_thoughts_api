var mongoose = require('mongoose');
// var mongoose = require('./thought')(mongoose);


// Starts the mongo connection to thoughts key
mongoose.connect('mongodb://localhost/thoughts', function(err){
	if(err) {
		console.log('connection error', err);
	} else {
		console.log('connection successful');
	}
});

module.exports = mongoose;