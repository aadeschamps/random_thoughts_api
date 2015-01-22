
var input = document.querySelector("input");
var button = document.querySelector("#button");
var h1 = document.querySelector("#filler");
var button2 = document.querySelector("#button2");

button.addEventListener("click", function(e){
	// if(e.keyCode === 13){
		var url = "/add";
		var info = input.value;
		input.value = "";
		console.log("in here");
		var msg = {info: info}
		var j_msg = JSON.stringify(msg);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.addEventListener('load',function(e){
			console.log("sucess"); 	
		});
		console.log(j_msg);
		xhr.send(j_msg);
	// }
});

button2.addEventListener("click", function(e){
	var url = "/";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.addEventListener('load',function(){ 
		var d = xhr.responseText;
		var parsed = JSON.parse(d);
		h1.innerHTML = parsed.thought;
	});
	xhr.send();
});


var url = "/";
var info = input.value;
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.addEventListener('load',function(){
	var d = xhr.responseText;
	var parsed = JSON.parse(d);
	h1.innerHTML = parsed.thought;
});
xhr.send();

