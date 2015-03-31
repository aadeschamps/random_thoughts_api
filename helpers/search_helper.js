


module.exports = function searchKeywords( keyword ){
	array = [];
	thoughts.forEach(function(elem){
		words = elem.thought.split(" ");
		var exists = false;
		words.forEach(function(word){
			console.log(word);
			if ( word.toUpperCase() === keyword && !exists){
				array.push(elem);
				exists = true;
			}
		})
	})
	return array;
}