isObject = function(obj){
	return (obj["type"].indexOf("_value") > -1);
}
isObject = function(obj){
	return (obj["type"].indexOf("_key") > -1);
}

generateNodeFromObject = function(obj){
	console.log("generateNodeFromObject");
	console.log(JSON.stringify(obj,null,1));
	node = {"group":"nodes"}
	var filteredKeys = filterKeys(obj,defaultFilter)
	filteredKeys["id"] = obj["_id"];
	node["data"] = filteredKeys;
	return node;
}


generateEdge = function(to,from,keyName,classes){
	
	// Create key
	var key = {"group":"edges"}
	var data = {}
	data["name"] = keyName;
	data["source"] = from;
	data["target"] = to
	data["id"] = from+"_"+to+"_Edge"//(from+keyName+to).hashCode().toString();
	data["_classes"] = classes;
	key["data"] = data;
	
	console.log("KEYGEN");
	console.log(JSON.stringify(key));
	return key;
	
}

generateNode = function(id,name,parent,classes){
	
	// Create key
	var node = {"group":"nodes"}
	var data = {}
	var parentNode = cy.getElementById(parent);
	data["name"] = name;
	data["id"] = id;
	data["newlyCreated"] = false;
	data["parent"] = parent;
	data["_parent"] = parent;
	data["_classes"] = classes;
	node["data"] = data;
	console.log("parentNode");
	console.log(parentNode);
	if (parentNode.length > 0  && Object.keys(parentNode.position()).length > 0) node["position"] = perturb(parentNode.position(),10);
	else node["position"] = perturb({x:0,y:0},15);
	// var parent = cy.getElementById(parent);
	
	// var parentPosition = parent.position();
	// if (parent.length==0) {
	// 	var curr = Session.get("currJSON");
 //        var currId = curr["_id"];
 //        var currNode = cy.getElementById(currId);
 //        parentPosition = currNode.position();
	// }
	// var perturbedPosition = perturb(parentPosition,10);
	// node["position"] = perturbedPosition;
	console.log("NODEGEN");
	console.log(JSON.stringify(node));
	return node;
}


generateGraphFromObjects = function(objects){
	console.log("getCyData");
	modObjects = []; 
	var objectIds = _.map(objects,function(o){return o["_id"]});
	
	// Loop over objects
	var nodes = [];
	var edges = [];
	for (var k in objectIds){
		var objectId = objectIds[k];
		// var result = generateElementsFromObject(objects[k],objectIds);
		var result = refreshNodesForObject(objectId);
		// nodes = nodes.concat(result[0]);
		// edges = edges.concat(result[1]);
	}
	console.log("genCyData");
	console.log(nodes);
	console.log(edges);
	return [nodes,edges];
}

makeGraph = function(){
	//cytoscape options
	options = {}
	options["container"] = document.getElementById('graphShower');
	options["motionBlur"] = false;
	options["layout"] = get("initialView");
	options["style"] = []

	var nodeStyles = {
			selector: 'node',
			style: {'content': "data(name)"}
		}
	var edgeStyles = {
			selector: 'edge',
			style: {'content': 'data(name)'}
		}
	options["style"] = [nodeStyles,edgeStyles];

	var keyNodeStyles = {
		"selector":"node.keyNode",
		"style":{"background-color":"black","color":"white","text-outline-width":3,"text-outline-color":"black"}
	}
	options["style"].push(keyNodeStyles);

	var internalKeyNodeStyles = {
		"selector":"node.internalKeyNode",
		"style":{"background-color":"black","color":"white","text-outline-width":3,"text-outline-color":"black"}
	}
	options["style"].push(internalKeyNodeStyles);

	var keyNodeEdgesHidden = {
		"selector":".keyNodeEdge",
		"style":{"text-opacity":0,"visibility":"hidden"}
	}
	options["style"].push(keyNodeEdgesHidden);

	var objectStyle = {
		"selector":".object",
		"style":{
			// width:80,
			// height:80,
			// shape:"circle",
			"shape":"roundrectangle",
			"width":function(n){
				// return 80;
				var nlength = n.style("content").length;
				if(nlength){
					var w = Math.sqrt(nlength*25*15);
					if (w < 80){
						return 80;
					}if (w > 400){
						return 400;
					}
					return w;
				}else{
					return 80;
				}
			},
			"height":function(n){
				// return 80;
				var nlength = n.style("content").length;
				if(nlength){
					if (n.width()){
						var h = nlength*25*15/Math.sqrt(nlength*25*15);
					}else{
						h = 80;
					}
					
					if (h < 80){
						return 80;
					}
					return h;
				}else{
					return 80;
				}
			},
			"text-wrap":"wrap",
			"text-max-width":function(n){
				// return 80;
				var nlength = n.style("content").length;
				if(nlength){
					var w = Math.sqrt(nlength*25*15);
					if (w < 80){
						return 70;
					}if (w > 400){
						return 400;
					}
					return w;
				}else{
					return 80;
				}
			},
			"border-width":4,
			"border-style" : "solid",
			"border-color" : "black",
			"text-valign":"center",
			"color":"black",
			"font-size":25,
			"background-color":"white",
			"text-outline-color":"white",
			"text-outline-width":4,
			"text-outline-opacity":1

		}
	}
	options["style"].push(objectStyle);

	
	var labelNodeStyle = {
		"selector":"node.labelNode",
		"style":{
			"content":"data(name)",
			"shape":"rectangle",
			"font-size":25,
			"background-color":"black",
			"background-opacity":1,
			color:"white",
			"text-border-width":3,
			"text-border-color":"black",
			"text-border-opacity":1,
			"text-valign":"center",
			// "width":function(n){return nn.width()-10},
			"width":function(nn){
				var ncontent = nn.data("name");
				
				if(ncontent){
					var nlength = ncontent.length;
					// console.log("nlength");
					// console.log(nlength);
					var w = Math.sqrt(nlength*25*20);
					if (w < 80){
						w = 80;
					}if (w > 350){
						w = 350;
					}
					// console.log("W");
					// console.log(w);
				}else{
					// console.log("nlength not real");
					// console.log(nlength);
					w = 80;
				}
				return w;
			},
			"height":function(nn){
				var ncontent = nn.data("name");
				
				if(ncontent){
					var nlength = ncontent.length;
					var w = Math.sqrt(nlength*25*20);
					if (w < 80){
						w = 80;
					}if (w > 350){
						w = 350;
					}
					var h = nlength*25*20/w;
					if (h < 80){
						h = 80;
					}
					// console.log("h");
					// console.log(h);
				}else{
					// console.log("nlength not real");
					// console.log(nlength);
					h = 80;
				}
				return h;
			},
			"text-wrap":"wrap",
			//"text-max-width":function(n){return n.parent()[0].width()-20},
			"text-max-width":function(n){
				var nname = n.data("name");
				if (nname){
					var nlength = nname.length;
					console.log("nlength");
					console.log(nlength);
					var w = Math.sqrt(nlength*25*20);
					if (w < 80){
						w = 80;
					}if (w > 350){
						w = 350;
					}
					console.log("label max w: "+(w-15));
					return w-15;
				}else{
					return 70;
				}

			}
		}
	};
	options["style"].push(labelNodeStyle);
	

	var attrNodeStyle = {
		"selector":"node.attrNode",
		"style":{
			"content":"data(name)",
			"text-valign":"center",
			"background-opacity":0,
			"border-width":2,
			"border-color":"black",
			"shape":"rectangle",
			"width":function(n){
				var name = n.data("name");
				var charWidth = _.max(_.map(name.split("\n"),function(ele){return ele.length}))
				var width = 10*charWidth;
				if (width>200) { console.log("h: 200"); return 200;}
				console.log("w: "+width)
				return width;
			},
			"height":function(n){
				var name = n.data("name");
				var width = 16*name.length;
				var lines = name.split("\n").length;
				if (lines == 1){
					var lines = width/200;
				}
				if (lines<1) { console.log("h: "+30); return 30;}
				console.log("h: "+(30+20*(lines-1)));
				var height = 30+20*(lines-1);
				return height;
			},
			"text-wrap":"wrap",
			"text-max-width":function(n){
				var width = 10*n.data("name").length;
				if (width>200) width = 200;
				console.log("mw: "+(width-15));					
				return width-15;
			}
		}
	}
	options["style"].push(attrNodeStyle);

	var internalEdgeStyles = {
		"selector":"edge.internalEdge",
		"style":{
			"visibility":"hidden",
			"text-valign":"center"
		}
	}
	options["style"].push(internalEdgeStyles);

	var notDisplayed = {
			selector: '.notDisplayed',
			style: {'display': "none"}
		}
	options["style"].push(notDisplayed);

	var displayed = {
			selector: '.displayed',
			style: {'display': "element"}
		}
	options["style"].push(displayed);
	
	
	// var keyNodeStyles = {
	// 	"selector":"node.keyNode",
	// 	"style":{"text-valign":"center"}
	// }
	
	console.log("Cyto Options");
	console.log(options);
	var cy = cytoscape(options);
	return cy;
}

populateGraph = function(){
	//CYTOSCAPE CODE
	if(cy){
		cy.remove(cy.nodes());
		cy.remove(cy.edges());
	}
	
	console.log("refreshGraph");

	var objects = getFilteredObjects();
	var cyData = generateGraphFromObjects(objects);
	// var cyNodes = cyData[0];
	// var cyEdges = cyData[1];

	// // Add random positions
	// for (var i in cyNodes){
	// 	cyNodes[i]["position"] = perturb({x:0,y:0},100);
	// 	cy.add(cyNodes[i])
	// }
	// cy.add(cyEdges);

	// addClassesToNodes();
	// addClassesToEdges();
	// addParents();


	return cy;
 	
}
