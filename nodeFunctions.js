
createNodeAtPosition = function(id,x,y){
	console.log("createNodeAtPosition");
	var node = {"group":"nodes"};
	node["data"] = {"id":id};
	node["classes"] = "object"
	node["position"] = {};
	node["position"]["x"] = x;
	node["position"]["y"] = y;
	console.log(node);
	console.log(node["position"]);
	
	return node;
}

getNodeHeight = function(node){
	return cy.zoom()*node.height();
}

postAddModification = function(nn){
	return undefined;
	
	// return undefined;
	if (!nn.hasClass("object")) return undefined;

	console.log("made it");
	var ncontent = nn.style("content");
	var nlength = ncontent.length;
	if(nlength){
		console.log("nlength");
		console.log(nlength);
		var w = Math.sqrt(nlength*25*20);
		if (w < 80){
			w = 80;
		}if (w > 350){
			w = 350;
		}
		console.log("W");
		console.log(w);

		var h = nlength*25*20/w;
		if (h < 80){
			h = 80;
		}
		console.log("h");
		console.log(h);
		
	}else{
		console.log("nlength not real");
		console.log(nlength);
		w = 80;
		h = 80;
	}

	nn.style("height",h);
	// nn["_private"]["style"]["height"]["pxValue"] = h;
	nn.style("width",w);
	// nn["_private"]["style"]["width"]["pxValue"] = w;
	
	nn.style("text-wrap","wrap");
	if (ncontent.split(" ").length == 1){
		nn.style("text-max-width",1000);
	}else{
		nn.style("text-max-width",w-5);
	}
	
	nn.style("content","");
	var labelNode = createNodeAtPosition(nn.id()+"LabelNode",nn.position()["x"],nn.position()["y"])
	labelNode["classes"] = "labelNode";
	labelNode["data"]["parent"] = nn.id();
	labelNode["data"]["name"] = ncontent;
	labelNode["style"] = {
		"content":"data(name)",
		"font-size":25,
		"text-background-opacity":0,
		"text-background-color":"white",
		"text-border-width":0,
		"text-valign":"center",
		"width":function(n){return n.parent()[0].width()-10},
		"text-wrap":"wrap",
		"text-max-width":function(n){return n.parent()[0].width()-20},
		"height":"auto"
	};
	console.log("Label node"+labelNode);
	cy.add(labelNode);
	console.log("done");

}

freezeNodes = function(selector){
		
	if (!selector){
		selector = ".object";
	}
	
	var objs = cy.nodes(selector);
	for (var i in objs){	// return undefined;
		var nn = objs[i];
		if (i=="_private" || i=="length") return undefined;
		if(!nn.hasClass("object")) return undefined;

		// console.log("made it");
		var ncontent = nn.style("content");
		var nlength = ncontent.length;
		if(nlength){
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

			var h = nlength*25*20/w;
			if (h < 80){
				h = 80;
			}
			// console.log("h");
			// console.log(h);
			
		}else{
			// console.log("nlength not real");
			// console.log(nlength);
			w = 80;
			h = 80;
		}

		nn.style("height",h);
		// nn["_private"]["style"]["height"]["pxValue"] = h;
		nn.style("width",w);
		// nn["_private"]["style"]["width"]["pxValue"] = w;
		
		nn.style("text-wrap","wrap");
		if (ncontent.split(" ").length == 1){
			nn.style("text-max-width",1000);
		}else{
			nn.style("text-max-width",w-5);
		}
		
		// nn.style("text-opacity",0);
		// var labelNode = createNodeAtPosition(nn.id()+"LabelNode",nn.position()["x"],nn.position()["y"])
		// labelNode["classes"] = "labelNode";
		// labelNode["data"]["parent"] = nn.id();
		// labelNode["data"]["name"] = ncontent;
		// labelNode["style"] = {
		// 	"content":"data(name)",
		// 	"font-size":25,
		// 	"text-background-opacity":0,
		// 	// "text-background-color":"white",
		// 	"text-border-width":0,
		// 	"text-valign":"center",
		// 	// "width":function(n){return nn.width()-10},
		// 	// "width":nn.width()-10,
		// 	"text-wrap":"wrap",
		// 	//"text-max-width":function(n){return n.parent()[0].width()-20},
		// 	"text-max-width":nn.width()-20
		// };
		// console.log("Label node"+labelNode);
		// cy.add(labelNode);
		// console.log("done");
	}

}

meltNodes = function(selector){
		
	if (!selector){
		selector = ".object";
	}
	
	wFun = function(nn){
		var ncontent = nn.data("name");
		var nlength = ncontent.length;
		if(nlength){
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
	}

	hFun = function(nn){
		var ncontent = nn.data("name");
		var nlength = ncontent.length;
		if(nlength){
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
	}
	
	var objs = cy.nodes(selector);
	for (var i in objs){	// return undefined;
		var obj = objs[i];
		if (i=="_private" || i=="length") return undefined;
		if(!obj.hasClass("object")) return undefined;

		console.log("made it");
		obj.style("height",hFun);
		// obj["_private"]["style"]["height"]["pxValue"] = h;
		obj.style("width",wFun);
		// obj["_private"]["style"]["width"]["pxValue"] = w;

	}
}


getWidthAndHeight = function(nlength){
	console.log("nlength");
	console.log(nlength);
	var w = Math.sqrt(nlength*25*20);
	if (w < 80){
		w = 80;
	}if (w > 350){
		w = 350;
	}
	console.log("W");
	console.log(w);

	var h = nlength*25*20/w;
	if (h < 80){
		h = 80;
	}
	console.log("h");
	console.log(h);
	
	return [w,h];
	
}	
addLabelNodes = function(){
	var objs = cy.nodes(".object");
	for (var i in objs){
		if (i=="_private" || i=="length") return undefined;
		var nn = objs[i];
		var ncontent = nn.style("content");
		var wandh = getWidthAndHeight(ncontent.length);

		nn.style("text-opacity",0);
		var labelNode = createNodeAtPosition(nn.id()+"LabelNode",nn.position()["x"],nn.position()["y"])
		labelNode["classes"] = "labelNode";
		labelNode["data"]["parent"] = nn.id();
		labelNode["data"]["name"] = ncontent;
		// labelNode["style"] = {
		// 	"content":"data(name)",
		// 	"shape":"rectangle",
		// 	"font-size":25,
		// 	"background-color":"white",
		// 	"background-opacity":0,
		// 	"text-border-width":0,
		// 	"text-valign":"center",
		// 	// "width":function(n){return nn.width()-10},
		// 	"width":wandh[0],
		// 	"height":wandh[1],
		// 	"text-wrap":"wrap",
		// 	//"text-max-width":function(n){return n.parent()[0].width()-20},
		// 	"text-max-width":nn.width()-20
		// };
		console.log("Label node");
		console.log(labelNode);
		
		cy.add(labelNode);
		console.log("done");
	
	}
}

connectLabelsAndKeyNodes = function(){
	console.log("connectLabelsAndKeyNodes");
	var labelNodes = cy.nodes(".labelNode");
	labelNodes.each(function(i,labelNode){
		console.log(i+": ");
		console.log(labelNode.data("name"));
		var edge = {"group":"edges"}
		var revedge = {"group":"edges"}
		var keyNodes = cy.nodes("."+labelNode.parent().id()+"KeyNode"); // parent object id
		keyNodes.each(function(j, keyNode){
			console.log("keynode");
			console.log(keyNode.data("name"));
			edge["data"] = []
			edge["data"]["id"] = labelNode.id()+"_"+keyNode.id()+"_LabelKeyEdge";
			edge["data"]["source"] = labelNode.id();
			edge["data"]["target"] = keyNode.id();
			edge["classes"] = "labelKeyNodeEdge internalEdge";
			revedge["data"] = []
			revedge["data"]["id"] = "reverse_"+labelNode.id()+"_"+keyNode.id()+"_LabelKeyEdge";
			revedge["data"]["source"] = keyNode.id();
			revedge["data"]["target"] = labelNode.id();
			revedge["classes"] = "labelKeyNodeEdge internalEdge";
			cy.add(edge);
			cy.add(revedge);
		});
	})
}

connectLabelsAndAttrNodes = function(){
	console.log("connectLabelsAndAttrNodes");
	var labelNodes = cy.nodes(".labelNode");
	labelNodes.each(function(i,labelNode){
		
		console.log(i+": ");
		console.log(labelNode.data("name"));
		var edge = {"group":"edges"}
		var revedge = {"group":"edges"}
		var attrNodes = cy.nodes("."+labelNode.parent().id()+"AttrNode"); // parent object id
		attrNodes.each(function(j, attrNode){
			console.log("attrNode");
			console.log(attrNode.data("name"));
			edge["data"] = []
			edge["data"]["id"] = labelNode.id()+"_"+attrNode.id()+"_LabelKeyEdge";
			edge["data"]["source"] = labelNode.id();
			edge["data"]["target"] = attrNode.id();
			edge["classes"] = "labelAttrEdge internalEdge";
			revedge["data"] = []
			revedge["data"]["id"] = "reverse_"+labelNode.id()+"_"+attrNode.id()+"_LabelKeyEdge";
			revedge["data"]["source"] = attrNode.id();
			revedge["data"]["target"] = labelNode.id();
			revedge["classes"] = "labelAttrEdge internalEdge";
			console.log("new edge");
			console.log(edge);
			cy.add(edge);
			cy.add(revedge);
		});
	});
}

nodifyAttributes = function(){
	var keyEdges = cy.edges().difference(cy.edges(".keyNodeEdge"));
	console.log(keyEdges);
	for (var i in keyEdges){
		//console.log(i);
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var keyEdge = keyEdges[i];
		console.log("keyEdge");
		console.log(keyEdge.id()+": "+keyEdge.data("name"));
		console.log(keyEdge);
		var monoTargetId = keyEdge.data("target");
		var monoTarget = cy.getElementById(monoTargetId)
		console.log("monoTarget");
		console.log(monoTargetId);
		console.log(monoTarget.id()+": "+monoTarget.data("name"));
		console.log(monoTarget);
		if (monoTarget.hasClass("noKeys") && cy.edges("[target = '"+monoTargetId+"']").length<2){

			var monoSourceKeyNode = cy.getElementById(keyEdge.data("source"));
			var monoSource = monoSourceKeyNode.parent()[0];
			var monoSourceLabelNode = cy.getElementById(monoSource.data("id")+"LabelNode");
			// var currName = monoSourceKeyNode.data(name);
			// var newName = currName + 
			var attrNode = createNodeAtPosition(monoSource.id()+keyEdge.id()+"AttrNode",monoSource.position()["x"],monoSource.position()["y"]);
			attrNode["data"]["parent"] = monoSource.id();
			var name = keyEdge.data("name")+": "+monoTarget.data("name");
			attrNode["data"]["name"] = name;
			attrNode["classes"] = "attrNode "+monoSource.id()+"AttrNode";
			
			// determine size
			var width = 20*name.length;
			var lines = width/300;
			if (width>300){
				width = 300;
			}
			var height = 25*lines * 1.2;
			if (lines<1){
				height = 30;
			}
			


			// attrNode["style"] = {
			// 	"content":"data(name)",
			// 	"text-valign":"center",
			// 	"background-opacity":0,
			// 	"border-width":2,
			// 	"border-color":"black",
			// 	"shape":"rectangle",
			// 	"width":function(n){
			// 		var width = 10*n.data("name").length;
			// 		if (width>200) { console.log("h: 200"); return 200;}
			// 		console.log("w: "+width)
			// 		return width;
			// 	},
			// 	"height":function(n){
			// 		var width = 20*n.data("name").length;
			// 		var lines = width/200;
			// 		if (lines<1) { console.log("h: "+30); return 30;}
			// 		console.log("h: "+(16*lines));
			// 		return 16*lines;
			// 	},
			// 	"text-wrap":"wrap",
			// 	"text-max-width":function(n){
			// 		var width = 10*n.data("name").length;
			// 		if (width>200) width = 200;
			// 		console.log("mw: "+(width-15));					
			// 		return width-15;
			// 	}
			// }
			// {
			// 	"content":"data(name)",
			// 	"text-valign":"center",
			// 	"background-opacity":0,
			// 	"border-width":2,
			// 	"border-color":"black",
			// 	"shape":"rectangle",
			// 	"width":function(n){
			// 		var width = 10*n.data("name").length;
			// 		if (width>200) return 200;
			// 		return width;
			// 	},
			// 	"height":function(n){
			// 		var width = 20*n.data("name").length;
			// 		var lines = width/200;
			// 		if (lines<1) return 30;
			// 		return 20*lines*1.25;
					
			// 	},
			// 	"text-max-width":function(n){
			// 		var width = 10*n.data("name").length;
			// 		if (width>200) width = 200;
			// 		return width-15;
			// 	}
			// };
			console.log("attrNode");
			console.log(attrNode);
			cy.add(attrNode);
		
			console.log("HIDING");
			monoTarget.style("display","none");
			console.log(monoTarget.data("name"));
			monoSourceKeyNode.style("display","none");
			console.log(monoSourceKeyNode.data("name"));
			keyEdge.style("display","none");
			console.log(keyEdge.data("name"));
		}
	}
	

}	