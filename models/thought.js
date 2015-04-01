
module.exports = function(mongoose){
	// Creates the Schema for each thought
	var ThoughtSchema = new mongoose.Schema({
		thought: String,
		created_at: {type: Date, default: Date.now}
	})
	// returns the model to be used in the router 
	return mongoose.model('Thought', ThoughtSchema);
}