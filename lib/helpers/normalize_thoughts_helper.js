var validator = require('validator');

module.exports = function(thoughts){
	var normalized = [];
	thoughts.forEach(function(thought){
		normalized.push({
			thought: validator.escape(thought.thought),
			created_at: thought.created_at
		})
	})
	return normalized;
}