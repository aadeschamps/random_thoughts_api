
var input = document.querySelector("input");
var button = document.querySelector("#button");
var h1 = document.querySelector("#filler");
var button2 = document.querySelector("#button2");

button.addEventListener("click", function(e){
	var url = "/add";
	var info = input.value;
	input.value = "";
	if(info != "" && info.length < 30){
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
	}else{
		alert("Entry needs to be between 1 and 30 characters");
	}
});

button2.addEventListener("click", function(e){
	var url = "/thought";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.addEventListener('load',function(){ 
		var d = xhr.responseText;
		var parsed = JSON.parse(d);
		h1.innerHTML = parsed.results.thought;
	});
	xhr.send();
});


var url = "/thought";
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.addEventListener('load',function(){
	var d = xhr.responseText;
	var parsed = JSON.parse(d);
	h1.innerHTML = parsed.results.thought;
});
xhr.send();

