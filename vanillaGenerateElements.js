vanillaGenerateElementsFromObject = function(obj, ids){
	var cutoffForKeyNode = get("cutoffForKeyNode")
	from = "";
	console.log("genCyData");
	var nodes = [];
	var edges = [];
	var source = obj["_id"];
	
	console.log("source");
	console.log(source);


	//// Create node
	var node = generateNodeFromObject(obj);	
	node["data"]["_classes"]=["object","noKeys"]
	node["data"]["attributes"]={}
	

	// Get ID for later use
	var nodeId = node["data"]["id"];
	console.log("nodeId");
	console.log(nodeId);


	//// Create edges
	var skipKeys = ["name","type","createdAt"];
	filterKeyNameDoesNotMatch = get("filterKeyNameDoesNotMatch");
	if(!empty(filterKeyNameDoesNotMatch)){
		skipKeys = skipKeys.concat(filterKeyNameDoesNotMatch);
	}
	console.log(skipKeys);
	for(var keyName in obj){

		var from = source;
		console.log("from: "+from);
		var classes = [from+"KeyEdge","monoEdge"];
		// Debug output
		console.log(node["data"]["name"]);
		console.log("Key!");
		console.log(keyName);
		console.log(obj[keyName]);

		//// Checks
		// Check that the current key isn't being filtered
		var filterKeyNameMatches = get("filterKeyNameMatches");
		if(!empty(filterKeyNameMatches)){
			if (filterKeyNameMatches.indexOf(keyName) == -1) {
				console.log("Key name does not match.");
				continue;
			};
		}
		console.log("made it past filterkeyname");
		console.log("skipkeys");
		if (skipKeys.indexOf(keyName) != -1) continue;
		console.log("defaultFilter");
		if (!defaultFilter(keyName)) continue; 
		console.log("clear inverses");
		var filterInverses = get("filterInverses");
		if (filterInverses && !inverseFilter(keyName)) continue; 
		console.log("Made it past the continues!");
		console.log(keyName);
		// Node has real attributes
		console.log("Adding class haskeys: "+node["data"]["id"]);
		node["data"]["_classes"].pop();
		node["data"]["_classes"].push("hasKeys");



		// Start looping over field values
		var targetObjects = obj[keyName];

		// Generate child element for multivalued keys
		if(targetObjects.length==1){
			console.log("adding attr:" +keyName);
			node["data"]["attributes"][keyName] = targetObjects[0];
		}

		if(targetObjects.length>cutoffForKeyNode-2){
			node["data"]["_classes"].push("hasKeyNodes");
			console.log("inner node parent: "+from);
			var keyNodeId = obj["name"]+"_"+keyName+"_node";
			var keyNode = {
				"group":"nodes",
				"data":{
					"name":keyName,
					"id":keyNodeId,
					"_parent":from,
					"_classes":["keyNode",from+"KeyNode"]
				}
			}
			console.log("keynode:");
			console.log(keyNode);
			from = keyNodeId;  // overwriting from if inner node generated
			classes.pop()
			classes.push("multiEdge");
			nodes.push(keyNode);

			var keyNodeEdge = generateKey(keyNodeId,source,obj["name"]+"_"+keyName+"_edge",["keyNodeEdge"]);
			console.log("keyNodeEdge");
			console.log(JSON.stringify(keyNodeEdge,null,2));
			edges.push(keyNodeEdge);
		}
		console.log("from: "+from);

		for (var i in targetObjects){
			var to = targetObjects[i]["id"];
			if (ids.indexOf(to) == -1 ) continue;
			
			newKey = generateKey(to,from,keyName,classes);
			edges.push(newKey);
		}
	}
	
	console.log("pushing node");
	console.log(JSON.stringify(node,null,1));
	nodes.push(node);

	console.log("Done!");
	console.log(JSON.stringify(edges));
	console.log(JSON.stringify(nodes));
	return [nodes,edges];
}