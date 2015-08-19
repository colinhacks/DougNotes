
/// View 1
// label centered
// No edge labels

/// View 2
// Label top
// Child keyNodes for all pairs

/// View 3
//Label top



tryExternalKeyNodes = function(id){

	console.log("tryExternalKeyNodes");
	var middleNode = cy.nodes("#"+id)[0];
	var box = middleNode.boundingBox();
	box["x1"]=box["x1"]-25
	box["y1"]=box["y1"]-25
	box["x2"]=box["x2"]+25
	box["y2"]=box["y2"]+25

	var concentric = function(node){
		console.log(node);
		return 1*(node.id()==middleNode.id());
	}
	var levelWidth = function(node){return 1;}
	concNodes = cy.nodes("."+middleNode.id()+"KeyNode");
	concNodes.add(middleNode);
	concNodes.layout({"name":"concentric",
		concentric: concentric,levelWidth:levelWidth,
		animate: true, // whether to transition the node positions
		animationDuration: 5000, // duration of animation in ms if enabled
		fit:false,
		boundingBox:box
	});
}


spaceKeyNodes = function(id){

	console.log("tryExternalKeyNodes");
	var middleNode = cy.nodes("#"+id)[0];
	var box = middleNode.boundingBox();
	// box["x1"]=box["x1"]-25
	// box["y1"]=box["y1"]-25
	// box["x2"]=box["x2"]+25
	// box["y2"]=box["y2"]+25


	concNodes = cy.nodes("."+middleNode.id()+"KeyNode");
	
	concNodes.layout({
		"name":"cose",
		initialTemp : temp,
		animate: true, // whether to transition the node positions
		animationDuration: 5000, // duration of animation in ms if enabled
		fit:false,
		boundingBox:box
	});
}

printOut = function(eles){

	for (i=0;i<eles.length;i++){
		console.log(eles[i].id()+" : "+eles[i].data()["name"]);

	}
}


makeKeysInternal = function(){
	
	eliminateKeyNodeEdges();
	createKeyNodeParents(".keyNode");

}

makeKeysExternal = function(){

	eliminateKeyNodeParents(".keyNode");
	eliminateKeyNodeParents(".labelNode");
	createKeyNodeEdges();

}

createKeyNodeParents = function(selector){
	if (!selector){
		selector = ".keyNode";
	}
	var keyNodes = cy.nodes(".keyNode");
	for (var i in keyNodes){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var keyNode = keyNodes[i];
		console.log("keynode");
		console.log(keyNode);
		var parent = keyNode.data("_parent");
		console.log("adding parent");
		console.log(keyNode.data()["name"]);
		console.log("parent");
		console.log(parent);

		// prevent hidden nodes from re-appearing
		var display = keyNode.style("display");
		if(display != "none"){
			console.log("display isn't none");
			console.log(display);
			if (parent) keyNode.move({parent:parent});
			var par = cy.getElementById(parent);
			if (par.width() < 80){
				par.style("width",80);
			}if (par.height()<80){
				par.style("height",80);
			}
		}else{
			console.log("display is none");
		}
		keyNode.style("display",display);
	}
}

eliminateKeyNodeEdges = function(){
	style(".keyNodeEdge",{"display":"none"});
	// var objectNodes = cy.nodes(".hasKeyNodes");
	// for (var i in objectNodes){
	// 	if(isNaN(parseInt(i)) ){
	// 		continue;
	// 	}
	// 	var objectNode = objectNodes[i]
	// 	var objectNodeId = objectNode.id();

	// 	// removing edges between parent and keynodes
	// 	objectNodeOutgoingEdges = cy.nodes("."+objectNodeId+"KeyNodeEdge");
	// 	objectNodeOutgoingEdges.style({"display":"none"});

	// }

}

createKeyNodeEdges = function(){
	// var objectNodes = cy.nodes(".keyNodeEdge");
	style(".keyNodeEdge",{"display":"element"});
	// for (var i in objectNodes){
	// 	if(isNaN(parseInt(i)) ){
	// 		continue;
	// 	}
	// 	var objectNode = objectNodes[i]
	// 	var objectNodeId = objectNode.id();
	// 	objectNodeOutgoingEdges = cy.nodes("."+objectNodeId+"KeyNode");
	// 	objectNodeOutgoingEdges.style({"display":"element"});

		
	// }
}
eliminateKeyNodeParents = function(selector){
	if (!selector){
		selector = ".keyNode";
	}
	var keyNodes = cy.nodes(selector);
	keyNodes = keyNodes.add(cy.nodes(".labelNode"));
	for (var i in keyNodes){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var keyNode = keyNodes[i];
		console.log(keyNode);
		// a = keyNode;
		var parent = keyNode.data("_parent")
		console.log("eliminating parent");
		console.log(keyNode.data()["name"]);
		console.log("parent");
		console.log(parent);

		// node.move re-displays the node if it is hidden
		//this maintains its state
		var display = keyNode.style("display");
		if (display!="none"){
			if (parent) keyNode.move({parent:null});
		}
		keyNode.style("display",display);
		
	}

}

magnetizeKeyNodes = function(node){


	var nodeId = node.id();
	
	var box = node.boundingBox();
	box["x1"]=box["x1"]-25
	box["y1"]=box["y1"]-25
	box["x2"]=box["x2"]+25
	box["y2"]=box["y2"]+25

	var concentric = function(node){
		console.log(node);
		console.log(node.data()["id"]==nodeId); 
		return 1*(node.data()["id"]==nodeId);
	}
	var levelWidth = function(node){return 1;}
	
	var eles = cy.nodes("."+nodeId+"KeyNode");
	eles.add(node);

	eles.layout({"name":"concentric",
		concentric: concentric,levelWidth:levelWidth,
		animate: true, // whether to transition the node positions
		animationDuration: 5000, // duration of animation in ms if enabled
		fit:false,
		boundingBox:box
	});
}

gatherAllKeyNodes = function(px){

	var objectNodes = cy.nodes(".object");
	for (var i in objectNodes){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var node = objectNodes[i]
		var nodeId = node.id();
		var loc = node.position();
		var x1 = loc["x"]
		var y1 = loc["y"]
		console.log("parent x: "+x1);
		console.log("parent y: "+y1);
		
		var eles = cy.nodes("."+nodeId+"KeyNode");

		for (var i in eles){
			if(isNaN(parseInt(i)) ){
				continue;
			}
			var keyNode = eles[i];
			var x2 = keyNode.position()["x"];
			var y2 = keyNode.position()["y"];
			console.log("child x: "+x2);
			console.log("child y: "+y2);
			
			var dy = y2-y1;
			var dx = x2-x1;
			var signdy = dy/Math.abs(dy)
			var signdx = dx/Math.abs(dx)


			console.log("Diff: "+dy/dx);
			var angle = Math.atan(dy/dx);

			console.log("angle: "+angle);
			
			var dx = px*Math.abs(Math.cos(angle))
			var dy = px*Math.abs(Math.sin(angle))

			var newx = x1+signdx*dx;
			var newy = y1+signdy*dy;
			
			console.log("new x: "+newx);
			console.log("new y: "+newy);

			// keyNode.animate({position:{x: newx, y: newy}},{duration:1500})
			if(isNaN(newx)){
				console.log("NaN Error");

				newx = x2 + 20*(Math.random()-.5);
				newy = y2 + 20*(Math.random()-.5);
				console.log("newnewx: "+newx);
				console.log("newnewy: "+newy);
			}
			keyNode.position({x: newx, y: newy});
		}
	}
}


addClassesToNodes = function(){
	var cyNodes = cy.nodes();
	for (var i in cyNodes){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var cyNode = cyNodes[i]
		var classes = cyNode.data()["_classes"]
		console.log("addclasses to node");
		console.log(cyNode.data()["name"]);
		console.log("classes");
		console.log(classes);
		if(classes) for (var j in classes) cyNode.addClass(classes[j]);

	}
}

addClassesToEdges = function(){
	var cyEdges = cy.edges();
	for (var i in cyEdges){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var cyEdge = cyEdges[i]
		var classes = cyEdge.data()["_classes"]
		console.log("addclasses to edge");
		console.log(cyEdge.data()["name"]);
		console.log("classes");
		console.log(classes);
		if(classes) for (var j in classes) cyEdge.addClass(classes[j]);

	}
}

addParents = function(){
	var cyNodes = cy.nodes();
	for (var i in cyNodes){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var cyNode = cyNodes[i]
		var parent = cyNode.data("_parent")
		console.log("postprocessing");
		console.log(cyNode.data()["name"]);
		console.log("parent");
		console.log(parent);
		if (parent) cyNode.move({parent:parent});
	}
}

niceForceLayout = function(animate){
	

	run2 = 0;
	makeKeysExternal();
	var arborOps = arborOptions;
	arborOps["animate"] = true;
	arborOps["maxSimulationTime"] = 10000;
	arborOps["animate"] = false;
	arborOps["stop"] = function(){
		// alert("done with arbot")
		run2 = run2 + 1;
		cy.layout({"name":"cose","randomize":false,"initialTemp":5,"fit":false,"animate":true,stop:function(){
			if (run2 == 2){
				run2 = false;
				// alert("done with cose");
				
				makeKeysInternal();
				gatherAllKeyNodes(50);
				
			}
		}});
	}

	// console.log(arborOps);
	// console.log(JSON.stringify(arborOps,null,1));
	cy.layout(arborOps);
}

resetView = function(){
	cy.nodes(".keyNode").style("display","element");
	cy.nodes(".isAttribute").style("display","element");
	cy.nodes(".labelNode").style("visibility","visible");
	cy.nodes(".attrNode").style("display","element");
	cy.nodes(".internalKeyNode").style("display","element");
	cy.nodes(".object").style("text-opacity",1);
}

connectionView = function(collection){
	if(!collection) collection = cy.nodes();

	set("view","connection");

	collection.filter(".object").children().move({parent:null});
	collection.filter(".keyNode").style("display","element");
	collection.filter(".isAttribute").style("display","element");
	collection.filter(".labelNode").style("visibility","hidden");
	collection.filter(".attrNode").style("display","none");
	collection.filter(".internalKeyNode").style("display","none");
	collection.filter(".object").style("text-opacity",1);

	// connectionForceLayout();
}


cyConnectionView = function(){
	//if(!collection) collection = cy.nodes();

	set("view","connection");

	cy.nodes(".object").children().move({parent:null});
	freezeNodes(".object");
	connectionDisplay();

	// connectionForceLayout();
}

attributeView = function(collection){
	//addLabelNodes();
	// nodifyAttributes();
	// connectLabelsAndAttrNodes();
	// connectLabelsAndKeyNodes();
	if(!collection) collection = cy.nodes();
	
	console.log(collection);

	set("view","attribute");

	collection.each(function(i,node){
		
		var par = node.data("_parent");
		if (par){
			node.move({"parent":par});
		}
	});

	//meltNodes(".object");
	collection.filter(".keyNode").style("display","none");
	collection.filter(".labelNode").style("visibility","visible");
	collection.filter(".attrNode").style("display","element");
	collection.filter(".internalKeyNode").style("display","element");
	collection.filter(".object").style("text-opacity",0);
	collection.filter(".isAttribute").style("display","none");
	// attrForceLayout();
}


cyAttributeView = function(){
	//addLabelNodes();
	// nodifyAttributes();
	// connectLabelsAndAttrNodes();
	// connectLabelsAndKeyNodes();
	//if(!collection) collection = cy.nodes();
	
	//console.log(collection);

	
	set("view","attribute");

	meltNodes(".object");
	cy.nodes().each(function(i,node){
		var par = node.data("_parent");
		if (par){
			node.move({"parent":par});
		}
	});

	attrDisplay();
	// attrForceLayout();
}

attrDisplay = function(){

	cy.nodes(".keyNode").style("display","none");
	cy.nodes(".labelNode").style("display","element");
	cy.nodes(".attrNode").style("display","element");
	cy.nodes(".internalKeyNode").style("display","element");
	cy.nodes(".object").style("text-opacity",0);
	cy.nodes(".isAttribute").style("display","none");

}

connectionDisplay = function(){

	cy.nodes(".keyNode").style("display","element");
	cy.nodes(".isAttribute").style("display","element");
	cy.nodes(".labelNode").style("display","none");
	cy.nodes(".attrNode").style("display","none");
	cy.nodes(".internalKeyNode").style("display","none");
	cy.nodes(".object").style("text-opacity",1);

}

hideElements = function(){
	var view = get("view");
	if (view == "attribute"){
		cyAttributeView();
	}else if (view == "connection"){
		cyConnectionView();
	}
}


connectionForceLayout = function(){
	
	//makeKeysExternal();
	cy.nodes(".object").children().move({parent:null});
	freezeNodes(".object");
	var options = {"name":"cose","gravity":200,"idealEdgeLength":20,"edgeElasticity":1,"initialTemp":1.1,
	"animate":true,"randomize":false, "nodeRepulsion":10000000,"nodeOverlap": 1000,
	coolingFactor:1,numIter:1000}
	options["stop"] = function(){
			
			gatherAllKeyNodes(50);
			makeKeysInternal();
	}
	cy.layout(options);
}

connectionUpdateLayout = function(){
	
	//makeKeysExternal();
	cy.nodes(".object").children().move({parent:null});
	var options = {"name":"cose","gravity":200,"idealEdgeLength":20,"edgeElasticity":1,"initialTemp":1.2,
      "animate":true,"randomize":false, "nodeRepulsion":10000000,"nodeOverlap": 1000,
      "coolingFactor":1,"numIter":200, "fit":false
    }
	options["stop"] = function(){
			
			gatherAllKeyNodes(50);
			freezeNodes(".object");
			makeKeysInternal();
	}
	cy.layout(options);
}

attrForceLayout = function(){
	
	// makeKeysExternal();
	var options = {"name":"cose","gravity":10000,"idealEdgeLength":5,"edgeElasticity":.5,"initialTemp":1.2,
	"animate":true,"randomize":false, "nodeRepulsion":100000,"nodeOverlap": 1000,
	coolingFactor:1,numIter:1000}
	options["stop"] = function(){
			return;
			// makeKeysInternal();
			// gatherAllKeyNodes(50);
	}
	
	cy.layout(options);
}


forceLayout = function(){
	var view = get("view");
	if (view == "attribute"){
		attrForceLayout();
	}else if (view == "connection"){
		connectionForceLayout();
	}
}

attrUpdateLayout = function(){
	// makeKeysExternal();
	var options = {"name":"cose","gravity":200,"idealEdgeLength":20,"edgeElasticity":1,"initialTemp":1.2,
      "animate":true,"randomize":false, "nodeRepulsion":10000000,"nodeOverlap": 1000,
      "coolingFactor":1,"numIter":200, "fit":false
    }
	options["stop"] = function(){
			return;
			// makeKeysInternal();
			// gatherAllKeyNodes(50);
	}
	
	cy.layout(options);
}
