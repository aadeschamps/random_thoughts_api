
console.log('logger is here');

module.exports = function(req, res, next){
	var stream = process.stdout;
	var start = +new Date;
	var method = req.method;
	var url = req.url;
	res.on('finish', function(){
		var time = +new Date - start;
		stream.write(method + ' ' + url + '\n' + 'Time: ' + time + ' ms\n\n');
	})
	next();
}
