

module.exports = function(thoughts){
	var normalized = [];
	thoughts.forEach(function(thought){
		normalized.push({
			thought: thought.thought,
			created_at: thought.created_at
		})
	})
	return normalized;
}