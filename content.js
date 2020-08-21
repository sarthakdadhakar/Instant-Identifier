window.onload = function() {
	setTimeout(function(){
			//document.getElementById("container").remove();
			//document.getElementByClassName("style-scope").remove();
			var ggparent = document.getElementById("info-contents");
			console.dir(ggparent);
			var grandparent = document.createElement("div");
			grandparent.id="grandcontainer-c";
			grandparent.className="p-grandcontainer";
			ggparent.appendChild(grandparent);
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
	 					drawVideo(ctx,video,canvas.width,canvas.height,1);				    
	 				},1000);
	 			});
	 		video.addEventListener('ended', function()
	 			{
	 				console.log("Event ended!");
	 				clearInterval(window.vidInterval);
	 			});
	 		grandparent.appendChild(canvas);
	 		
	}, 1000);
}
var face=0;
//var cache = [];
function drawVideo(context,video,width,height,t){
	context.drawImage(video,0,0,width,height);
	//console.log(ccv);
	if(t!=1)
	{
		var tbd = document.getElementById("grandcontainer");
	tbd.remove();
	
	}
	var canvas = document.querySelector("canvas");
	var comp= ccv.detect_objects({"canvas":(ccv.pre(canvas)),
									"cascade":cascade,
									"interval":5000,
									"min_neighbors":1});
	var resp_count=0;
	var actor = {
  				"actor":"Hrithik Roshan"
  			};
	var new_face = comp.length;
	if((face != new_face) && (new_face !=0))
	{
		console.log(JSON.stringify(comp, null, "  "));
		for(var i=0;i<new_face;i++)
		{
			var ggparent = document.getElementById("info-contents");
			console.dir(ggparent);

			var grandparent = document.createElement("div");
			grandparent.id="grandcontainer";
			grandparent.className="p-grandcontainer";
			ggparent.appendChild(grandparent);
  			

			var cleardiv = document.createElement("div");
	 		cleardiv.className="clear-fix";
				$.ajax({
		 	            url: "https://instant-identifier.herokuapp.com/getdata",
		 	            type: "POST",
		 	            data:JSON.stringify(actor),
		 	            contentType: "application/json; charset=utf-8",
		 	        	dataType: "json",
		 	             success: function(response) {
		 	             	resp_count+=1;
		 	            	console.log(response);
		 	            	var title=response.title;
		 	            	var wiki_url=response.link;
		 	            	var image_url= response.image;
		 	            	var smry=response.summary;
		 	            	addData(grandparent,resp_count,title,smry,image_url,wiki_url)
		 			        },
		 			      error: function(error_msg){
		 			      		console.log(error_msg);
		 			      }
		 			    });
		} 	
		face=new_face;
		
	 		grandparent.appendChild(cleardiv);
	}
	var delay = 5000;
	setTimeout(drawVideo,delay,context,video,width,height,0);
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
}