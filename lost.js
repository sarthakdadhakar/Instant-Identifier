window.onload = function() {
	window.ocount=0;
	setTimeout(function(){

			var ggparent = document.getElementById("info-contents");
			console.dir(ggparent);
			var t=1;

			var ggparent = document.getElementById("info-contents");
			console.dir(ggparent);
			var grandparent = document.createElement("div");
			grandparent.id="grandcontainer-c";
			grandparent.className="p-grandcontainer";
			ggparent.appendChild(grandparent);
			var headtitle = document.createElement("h2");
				headtitle.className="head-title";
				var textnode = document.createTextNode("Powered By Instant-Identifier");
	 			headtitle.appendChild(textnode);
	 			grandparent.appendChild(headtitle);

			var cleardiv = document.createElement("div");
	 		cleardiv.className="clear-fix";
	 		//var resp_count=0;
			
	 		var video = document.querySelector('video');
	 		var canvas = document.createElement("canvas");
	 		video.addEventListener('pause', function()
	 			{
			 		addLoader();
			 		canvas.id="canvas_element";
			 		canvas.height=360;
			 		canvas.width=640;
			 		var ctx = canvas.getContext("2d");
	 				grandparent.appendChild(canvas);
	 				console.log("Event pause!");
	 				drawVideo(ctx,video,canvas.width,canvas.height,t);	
	 				t++;	

	 				
	 			});
	 		video.addEventListener('ended', function()
	 			{
	 				console.log("Event ended!");
	 			});
	 		
	 		grandparent.appendChild(cleardiv);
	}, 1000);
}

function drawVideo(context,video,width,height,t){
	context.drawImage(video,0,0,width,height);
	//console.log(ccv);
	
	var canvas = document.getElementById("canvas_element");
	var comp= ccv.detect_objects({"canvas":(ccv.pre(canvas)),
									"cascade":cascade,
									"interval":5,
									"min_neighbors":1});
	var new_face = comp.length;
	canvas.style.display = "none";
	console.log("faces => " + new_face);
	if(new_face>0)
	{	
		ocount+=1;
		if(t==1)
		{
				
				var ggparent = document.getElementById("grandcontainer-c");
				var grandparent = document.createElement("div");
				grandparent.id="grandcontainer";
				grandparent.className="p-grandcontainer";
				ggparent.appendChild(grandparent);
		}

			var gp=document.getElementById("grandcontainer");
			
			
			
			var resp_count=0;
			var dataURL = canvas.toDataURL("image/png");
    		var bs64 =  dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

		  	var opt=	{
						  "requests":[
						    {
						      "image":{
						        "content": bs64
						      },
						      "features": [
						        {
						          "type":"WEB_DETECTION",
						          "maxResults":10
						        }
						      ]
						    }
						  ]
						};

		  	var tosend=JSON.stringify(opt);
		  	//console.log(bs64);
			


		  	 $.ajax({
		 	            url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAfX9CRH4BHag6GUQ29YaLBc9FRKHlIwiw",
		 	            type: "POST",
		 	            data:tosend,
		 	            contentType: "application/json; charset=utf-8",
		 	        	dataType: "json",
		 	             success: function(response) {
		 	             		console.log(response);

		 	             		//Call to node

		 	             		var lol = [];
				var tp = response.responses[0].webDetection.webEntities;
				        		for(var i=0;i<new_face;i++)
				        		{
				        			console.log(tp[i]);
				        			var actor = {
						  				"actor":tp[i].description
						  			};
				        			lol.push(actor);
				        		}

				        		for(var j=0;j<lol.length;j++){
				        			var tobe = lol[j];
				        			$.ajax({
						 	            url: "https://instant-identifier.herokuapp.com/getdata",
						 	            type: "POST",
						 	            data:JSON.stringify(tobe),
						 	            contentType: "application/json; charset=utf-8",
						 	        	dataType: "json",
						 	             success: function(response) {
						 	             	resp_count+=1;
						 	            	console.log(response);
						 	            	var title=response.title;
						 	            	var wiki_url=response.link;
						 	            	var image_url= response.image;
						 	            	var smry=response.summary;
						 	            	console.dir(gp);
						 	            	addData(gp,ocount,title,smry,image_url,wiki_url);
						 			        },
						 			      error: function(error_msg){
						 			      		console.log(error_msg);
						 			      }
						 			    });
				        		}

		 	             		
		 	             	},
		 	             error : function(error_msg){
		 	             	console.log(error_msg);
		 	             }
		 	         });

					$(document).ajaxStop(function () {
      						var x = document.getElementById('myLoader');
      						x.remove();
      							//loader band
  					});
	}

}

/*
	Data Hieracrchy

	div#meta-contents

		div.grandcontainer-c
			div.spinner

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

function addLoader()
{
	var parent = document.createElement("div");
		parent.id="myLoader"; 
		parent.className="spinner"
;	var c1=document.createElement("div");
		c1.className="rect1";
	var c2=document.createElement("div");
		c2.className="rect2";
	var c3=document.createElement("div");
		c3.className="rect3";
	var c4=document.createElement("div");
		c4.className="rect4";

		parent.appendChild(c1);
		parent.appendChild(c2);
		parent.appendChild(c3);
		parent.appendChild(c4);

		var g = document.getElementById("grandcontainer-c");
		g.appendChild(parent);
		console.dir(g);
}



/// RESPONSE /////
// 		  	var response={
//   "responses": [
//     {
//       "webDetection": {
//         "webEntities": [
//           {
//             "entityId": "/m/09w2qd",
//             "score": 1.9316,
//             "description": "Koffee with Karan"
//           },
//           {
//             "entityId": "/m/09k68f",
//             "score": 1.4272,
//             "description": "Deepika Padukone"
//           },
//           {
//             "entityId": "/m/03fwln",
//             "score": 1.4064,
//             "description": "Priyanka Chopra"
//           },
//           {
//             "entityId": "/m/0_qjzfv",
//             "score": 0.2267,
//             "description": "Giphy"
//           },
//           {
//             "entityId": "/m/0f2f9",
//             "score": 0.2105487,
//             "description": "Television program"
//           },
//           {
//             "entityId": "/m/03bfb",
//             "score": 0.2105,
//             "description": "GIF"
//           },
//           {
//             "entityId": "/m/01chg",
//             "score": 0.2087,
//             "description": "Bollywood"
//           },
//           {
//             "entityId": "/m/03wpmd",
//             "score": 0.061260004,
//             "description": "Karan Johar"
//           },
//           {
//             "entityId": "/m/04lgc34",
//             "score": 0.04502,
//             "description": "Anushka Sharma"
//           },
//           {
//             "entityId": "/m/08knbm",
//             "score": 0.04164,
//             "description": "Ranbir Kapoor"
//           }
//         ],
//         "partialMatchingImages": [
//           {
//             "url": "https://i.ytimg.com/vi/-kmed71sHzQ/maxresdefault.jpg"
//           },
//           {
//             "url": "http://edtimes.in/wp-content/uploads/2016/10/maxresdefault-3-640x360.jpg"
//           },
//           {
//             "url": "https://i.ytimg.com/vi/-kmed71sHzQ/hqdefault.jpg"
//           },
//           {
//             "url": "https://media.giphy.com/media/3ohfFhXAx8bosmOLmw/giphy.gif"
//           },
//           {
//             "url": "https://secure-media0.hotstar.com/r1/thumbs/PCTV/86/1000012086/PCTV-1000012086-hsm.jpg"
//           },
//           {
//             "url": "https://i.ytimg.com/vi/-kmed71sHzQ/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLClyagXh3DxEktFltmxOOTjW4u9Dw"
//           }
//         ],
//         "pagesWithMatchingImages": [
//           {
//             "url": "https://www.youtube.com/watch?v=-kmed71sHzQ"
//           },
//           {
//             "url": "https://giphy.com/india/TV/koffee-karan/4x06-priyanka-chopra-deepika-padukone"
//           },
//           {
//             "url": "https://wn.com/Priyanka_And_Deepika_Keep_It_Buzzing_At_Koffee_With_Karan"
//           },
//           {
//             "url": "https://giphy.com/india/TV/koffee-karan"
//           },
//           {
//             "url": "http://edtimes.in/2016/10/these-6-episodes-of-koffee-with-karan-will-leave-you-hysterical-with-laughter/"
//           },
//           {
//             "url": "http://video.indiaeveryday.com/p/priyanka-and-deepika-keep-it-buzzing-at-koffee-with-karan/-kmed71sHzQ.htm"
//           },
//           {
//             "url": "http://worldwide.chat/mwVe9iSCu0s.video"
//           },
//           {
//             "url": "http://i1os.com/H5vQQVegLyg.video"
//           },
//           {
//             "url": "http://worldwide.chat/Koffee_With_Karan_Season_5-Kareena_Kapoor_And_Sonam_Kapoor_FUNNY_MOMENTS/KcxmQmfHvrA.video"
//           },
//           {
//             "url": "http://cyberspaceandtime.com/CvWFaBKvQQk.video"
//           }
//         ],
//         "visuallySimilarImages": [
//           {
//             "url": "http://edtimes.in/wp-content/uploads/2016/10/maxresdefault-3-640x360.jpg"
//           },
//           {
//             "url": "https://secure-media0.hotstar.com/r1/thumbs/PCTV/86/1000012086/PCTV-1000012086-hcdl.jpg"
//           },
//           {
//             "url": "https://i.ytimg.com/vi/7s8pdIkX_bM/maxresdefault.jpg"
//           },
//           {
//             "url": "https://secure-media0.hotstar.com/r1/thumbs/PCTV/91/1000012091/PCTV-1000012091-hsm.jpg"
//           },
//           {
//             "url": "https://s3-eu-west-1.amazonaws.com/sosnewbucketforlive/blog_img/Priyanka+Chopra+on+Koffee+With+Karan.jpg"
//           },
//           {
//             "url": "https://www.filmibeat.com/img/2014/01/06-priyankadeepikakwk.jpg"
//           },
//           {
//             "url": "http://cutmirchi.co/upimages/1388763994_Deepika%20Padukone%20&%20Priyanka%20Chopra%20at%20Koffee%20With%20Karan%204%20Images%20(3).jpg"
//           },
//           {
//             "url": "http://www.fashionlady.in/wp-content/uploads/2014/03/1389195018_kwk-gallery-priyanka-and-deepika-5.jpg"
//           }
//         ]
//       }
//     }
//   ]
// };