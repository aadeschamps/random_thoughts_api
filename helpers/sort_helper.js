module.exports = function sortTop(){
	var word_freq = [];
	thoughts.forEach(function(elem){
		// console.log(elem);
		words = elem.thought.split(" ");
		words.forEach(function(word){
			var contains = false;
			word_freq.forEach(function(match){
				if( match.word === word){
					contains = true;
					match.times+=1;
				}
				// console.log(word);
			});
			if(!contains){
				word_freq.push({word: word, times:1});
			}
		});	
	});
	word_freq.sort(function(a,b){
		return b.times - a.times;
	})
	return word_freq;
};