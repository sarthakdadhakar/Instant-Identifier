window.onload = function() {

	console.log("yooo");

	setTimeout(function(){
			//document.getElementById("container").remove();
			//document.getElementByClassName("style-scope").remove();
			var ggparent = document.getElementById("info-contents");
			console.dir(ggparent);

			var grandparent = document.createElement("div");
			grandparent.id="grandcontainer";
			grandparent.className="p-grandcontainer";
			ggparent.appendChild(grandparent);
			addData(grandparent,1,"Hrithik Roshan","Hrithik Roshan ( , born 10 January 1974) is an Indian actor who appears in Bollywood films. The son of the filmmaker Rakesh Roshan, he has portrayed a variety of characters and is known for his dancing ability. He is one of the highest-paid actors in India and has won many awards, including six Filmfares","https://upload.wikimedia.org/wikipedia/commons/9/9c/Hrithik_at_Rado_launch.jpg","https://www.google.com");	
			addData(grandparent,1,"Hrithik Roshan","Hrithik Roshan ( , born 10 January 1974) is an Indian actor who appears in Bollywood films. The son of the filmmaker Rakesh Roshan, he has portrayed a variety of characters and is known for his dancing ability. He is one of the highest-paid actors in India and has won many awards, including six Filmfares","https://upload.wikimedia.org/wikipedia/commons/9/9c/Hrithik_at_Rado_launch.jpg","www.google.com");	
			addData(grandparent,1,"Hrithik Roshan","Hrithik Roshan ( , born 10 January 1974) is an Indian actor who appears in Bollywood films. The son of the filmmaker Rakesh Roshan, he has portrayed a variety of characters and is known for his dancing ability. He is one of the highest-paid actors in India and has won many awards, including six Filmfares","https://upload.wikimedia.org/wikipedia/commons/9/9c/Hrithik_at_Rado_launch.jpg","www.google.com");	
			addData(grandparent,1,"Hrithik Roshan","Hrithik Roshan ( , born 10 January 1974) is an Indian actor who appears in Bollywood films. The son of the filmmaker Rakesh Roshan, he has portrayed a variety of characters and is known for his dancing ability. He is one of the highest-paid actors in India and has won many awards, including six Filmfares","https://upload.wikimedia.org/wikipedia/commons/9/9c/Hrithik_at_Rado_launch.jpg","www.google.com");	

			var cleardiv = document.createElement("div");
	 		cleardiv.className="clear-fix";
	 		
	 		var video = document.querySelector('video');
	 		var canvas = document.createElement("canvas");
	 		canvas.id="canvas_element";
	 		canvas.height=360;
	 		canvas.width=640;
	 		var ctx = canvas.getContext("2d");
	 		video.addEventListener('play', function()
	 			{
	 				console.log("Event added!");
	 				window.vidInterval=setInterval(function(){
	 					drawVideo(ctx,video,canvas.width,canvas.height);				    
	 				},100);
	 			});
	 		video.addEventListener('ended', function()
	 			{
	 				console.log("Event ended!");
	 				clearInterval(window.vidInterval);
	 			});
	 		grandparent.appendChild(canvas);
	 		grandparent.appendChild(cleardiv);
	}, 1000);
}

function drawVideo(context,video,width,height){
	context.drawImage(video,0,0,width,height);
	//console.log(ccv);
	var canvas = document.querySelector("canvas");
	console.log ( ccv.detect_objects({"canvas":(ccv.pre(canvas)),
									"cascade":cascade,
									"interval":5,
									"min_neighbors":1}));
	//console.log(comp);
	var delay = 100;
	setTimeout(drawVideo,delay,context,video,width,height);
}

/*
	Data Hieracrchy

	div#meta-contents
		div#grandcontainer.p-grandcoontainer
			div#mycontainer1.p-container
				div.p-title
				div.p-desc
			div#mycontainer2.p-container
				div.p-title
				div.p-desc
*/
function addData(grandparent,parid,title,description,image_url,wiki_url)
{
		var parent = document.createElement("div");
		parent.id="mycontainer"+parid; 
	 	parent.className="p-container";
		var var1 = document.createElement("h6");
		var1.className="p-title";
		var var2 = document.createElement("p");                 
	 	var2.className="p-desc";
	 	var var3 = document.createElement("img");
	 	var3.className="p-img";
	 	var var4 = document.createElement("a");
	 	var4.setAttribute("href",wiki_url);
	 	var4.className = "p-link";
	 	var4.target = "_blank";
	 	var textnode4 = document.createTextNode("Read More");
	 	var4.appendChild(textnode4);
	 	var textnode1 = document.createTextNode(title);    
	 	var textnode2 = document.createTextNode(description);
	 	var3.src = image_url;
	 	var1.appendChild(textnode1);  
	 	var2.appendChild(textnode2);     
	 	parent.appendChild(var3);                    			
		parent.appendChild(var1);
		parent.appendChild(var2);
		parent.appendChild(var4);
		var g = document.getElementById("grandcontainer");
		g.appendChild(parent);
		console.log('sabka baapppppp');
			// var node = document.createElement("h1");
			// var text = document.createTextNode("sdsdsdddddddddddddddddd");
			// node.appendChild(text);
			// console.dir(node);
			// parent.insertBefore(node,parent.firstChild);
}

// document.addEventListener("DOMContentLoaded", function(){



// });