
refreshEdges = function(){
	//CYTOSCAPE CODE
	if(cy){
		cy.remove(cy.edges());
	}
	console.log("refreshGraph");
	var objects = getFilteredObjects();
	var cyData = generateGraphFromObjects(objects);
	var cyEdges = cyData[1];
	cy.add(cyEdges);	
	return cy;
}

refreshNodes = function(){
	
	console.log("refreshNodes");

	var objects = getFilteredObjects();
	var cyData = generateGraphFromObjects(objects);
	var cyNodes = cyData[0];
	var cyEdges = cyData[1];

	var cyNodesIds = _.map(cyNodes,function(o){
		return o["data"]["id"];
	});
	console.log(cyNodesIds);

	var oldCyNodes = cy.nodes();
	var oldCyNodesIds = _.map(oldCyNodes,function(o){
		return o.data()["id"];
	});

	var oldCyEdges = cy.edges();
	var oldCyEdgesIds = _.map(oldCyEdges,function(o){
		return o.data()["id"];
	});

	// Get rid of old nodes
	for (var i in oldCyNodes){
		console.log(typeof i);
		if(isNaN(parseInt(i)) ){
			continue;
		}
		oldCyNode = oldCyNodes[i];
		console.log(oldCyNode.data()["name"]);
		console.log(oldCyNode);
		if(cyNodesIds.indexOf(oldCyNode.id()) == -1){
			console.log("removing");
			cy.remove(oldCyNode);
		}else{
			console.log("not removing");
			console.log(oldCyNode.id());
		}
	}

	// Add in new nodes
	for (var i in cyNodes){
		console.log(typeof i);
		if(isNaN(parseInt(i)) ){
			continue;
		}
		cyNode = cyNodes[i];
		console.log(cyNode["data"]["name"]);
		console.log(cyNode);
		if(oldCyNodesIds.indexOf(cyNode["data"]["id"]) == -1){
			console.log("adding");
			cy.add(cyNode);
		}else{
			console.log("not adding node");
			console.log(cyNode["data"]["id"]);
		}
	}

	// Display all the new edges
	for (var i in cyEdges){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var cyEdge = cyEdges[i];
		console.log(cyEdge["data"]["name"]);
		if(oldCyEdgesIds.indexOf(cyEdge["data"]["id"]) == -1){
			console.log(cyEdge);
			cy.add(cyEdges[i]);
		}else{
			console.log("not adding edge");
			console.log(cyNode["data"]["id"]);
		}
	}

	
	addClassesToNodes();
	addClassesToEdges();
	addParents();

	return cy;
	//cy.add(cyData);

	// cy.style("node { content : data(name); }");
	// cy.style("edge { content : data(name); }");
 
}

