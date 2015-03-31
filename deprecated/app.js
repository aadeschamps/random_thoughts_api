

var Sequelize = require('sequelize');
sequelize = new Sequelize('sql_thoughts.db', 'alex', 'open1234', {
		dialect: 'sqlite',
	});

sequelize
	.authenticate()
	.complete(function(err){
		if(!!err){
			console.log('Unable to connect', err);
		}else{
			console.log('Connection established');
		}
	});

var Thought = sequelize.define('Thought', {
	thought: Sequelize.STRING
});

sequelize
	.sync({ force: true})
	.complete(function(err){
		if(!!err){
			// console.log('error:', err);
		}else{
			// console.log('worked');
			Thought
				.create({
					thought: "Hey"
				})
				.complete(function(err,thought){
					if(!!err){
						console.log("error");
					}else{
						// if(err){throw err;}
						console.log("worked");
						console.log(thought);
						find()
					}
				})
		}
	});



var find = function(){
	Thought.find({ where: {id: 1} })
		.complete(function(err, first){
			if(!!err){
				console.log('err');
			}else{
				console.log(first.thought)
			}
		})
}