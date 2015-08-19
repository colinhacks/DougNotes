generateElementsFromObject = function(obj, ids){
	
	console.log("generateElementsFromObject: "+obj["name"]);
	// console.log(obj["name"]);
	var t = cy.getElementById("yoyo_up_InternalKeyNode");	
	if(t){
		console.log("middle_c_InternalKeyNode");
		console.log("classcheck start");
		console.log(t.hasClass("isAttribute"));
	}else{
		console.log("Not declared");
	}


	
	var nodes = [];
	var edges = [];
	var objId = obj["_id"];
	var objName = obj["name"]	


	var goodKeys = getGoodKeys(obj);



	//////////////////////
	//////   node   //////
	//////////////////////
	var node = generateNode(objId,objName,"",["object"]);
	if (goodKeys.length == 0){
		node["data"]["_classes"].push("noKeys");
	}else{
		node["data"]["_classes"].push("hasKeys");
		node["data"]["_classes"].push("hasKeyNodes");
	}
	if (cy.getElementById(node["data"]["id"]).length == 0){ 
		console.log("adding!");
		node["data"]["newlyCreated"] = true;
		console.log("addz");
		console.log(node);
		cy.add(node);
	}
		
	var parentPos = cy.getElementById(node["data"]["id"]).position();
	nodes.push(node);



	//////////////////////////
	//////  labelNode   //////
	//////////////////////////
	console.log("labelNode");
	var labelId = objId+"LabelNode";
	var labelNode = generateNode(labelId, objName, objId,["labelNode",objId+"LabelNode"]);
	console.log("to add or not to add");
	console.log(cy.getElementById(labelNode["data"]["id"]).length);
	if (cy.getElementById(labelNode["data"]["id"]).length == 0){ 
		console.log("adding!");
		labelNode["data"]["newlyCreated"] = true; 
		console.log("addz");
		console.log(labelNode);
		cy.add(labelNode);
	}
	nodes.push(labelNode);



	// Iterate over filtered keys
	for(var keyName in goodKeys){
		console.log("GoodKey: "+keyName);
		var targetObjects = obj[keyName];
		
		/////////////////////////
		//////   keyNode   //////
		/////////////////////////
		console.log("keyNode");
		var keyNodeId = obj["name"]+"_"+keyName+"_KeyNode";
		var keyNode = generateNode(keyNodeId,keyName,objId,["keyNode",objId+"KeyNode"])
		if (cy.getElementById(keyNode["data"]["id"]).length == 0){ 
			console.log("adding!");
			keyNode["data"]["newlyCreated"] = true;
			console.log("addz");
			console.log(keyNode);
			cy.add(keyNode);
		}
		nodes.push(keyNode);



		/////////////////////////
		//////  keyEdges   //////
		/////////////////////////
		console.log("keyEdges");
		var keyEdgeClasses = ["keyEdge",objId+"KeyEdge"];
		if (targetObjects.length>0){
			var created = []
			for (var i in targetObjects){
				var targetObject = targetObjects[i];
				var targetId = targetObject["id"]
				var targetName = targetObject["value"]
				cy.nodes(".attrNodeReferencing"+objId).remove();
				// cy.nodes(".attrNodeReferencing"+objId).style("border-color","red");

				var objNode = cy.getElementById(objId);
				if (objNode.length>0) {
					console.log("removing isAttribute: "+objId)
					// objNode.style("border-color","red");
					objNode.removeClass("isAttribute"); //dispnone
					objNode.style("display","element");
					

					//Siblings
					var attrSiblingsClass = objNode.data("attrSiblings");
					if (attrSiblingsClass){
						var attrSiblings = cy.nodes("."+attrSiblingsClass);
						attrSiblings.removeClass("isAttribute");
						attrSiblings.style("display","element");

						console.log("removing isAttribute");
						console.log(attrSiblings);
						attrSiblings.removeClass(attrSiblingsClass);
						var parentId = attrSiblingsClass.split("_")[0]
						attrSiblings.removeClass(parentId+"Attribute");
					}
				}
				// cy.nodes(".keyNodeReferencing"+objId).style("border-color","red");
				cy.nodes(".keyNodeReferencing"+targetId).removeClass("isAttribute"); //dispnone
				cy.nodes(".keyNodeReferencing"+targetId).style("display","element");
				
				console.log("removing isattribute: ");
				console.log(_.map(cy.nodes(".keyNodeReferencing"+targetId),function(o){o.data("id")}));

				// Add internal keynode edges
				for (var i in created){

				}
			}
		}
		if(targetObjects.length==1)  keyEdgeClasses.push("monoEdge");
		if(targetObjects.length>1) keyEdgeClasses.push("multiEdge");
		for (var i in targetObjects){
			console.log("target object "+i);	
			var to = targetObjects[i]["id"];
			newKey = generateEdge(to,keyNodeId,keyName,keyEdgeClasses);
			console.log("keyedgeclasses");
			console.log(keyEdgeClasses);
			if (cy.getElementById(newKey["data"]["id"]).length == 0){ 
				console.log("adding!");
				newKey["data"]["newlyCreated"] = true;
				console.log("addz");
				console.log(newKey);
				cy.add(newKey);
			}
			console.log("keyEdgeClasses after");
			console.log(newKey["classes"]);
			edges.push(newKey);
			console.log("newKey");
		}


		/////////////////////////////
		//////   keyNodeEdge   //////
		/////////////////////////////
		console.log("keyNodeEdge");
		var keyNodeEdge = generateEdge(keyNodeId,objId,obj["name"]+"_"+keyName+"_edge",["keyNodeEdge","externalKeyNodeEdge"]);
		if (cy.getElementById(keyNodeEdge["data"]["id"]).length == 0){ 
			console.log("adding!");
			keyNodeEdge["data"]["newlyCreated"] = true;
			console.log("addz");
			console.log(keyNodeEdge);
			cy.add(keyNodeEdge);
		}
		edges.push(keyNodeEdge);
		
		


		/////////////////////////////////
		//////  internalKeyNodes   //////
		/////////////////////////////////
		console.log("internalKeyNodes");
		var internalKeyNodeId = obj["name"]+"_"+keyName+"_InternalKeyNode";
		var internalKeyNode = generateNode(internalKeyNodeId,keyName,objId,["internalKeyNode",objId+"InternalKeyNode"]);
		
		if (cy.getElementById(internalKeyNode["data"]["id"]).length == 0){ 
			console.log("adding!");
			internalKeyNode["data"]["newlyCreated"] = true;
			console.log("addz");
			console.log(internalKeyNode);
			cy.add(internalKeyNode);

		}
		nodes.push(internalKeyNode);

		


		/////////////////////////////////
		//////  internalKeyEdges   //////
		/////////////////////////////////
		console.log("internalKeyEdges");
		var internalKeyEdgeClasses = ["internalKeyEdge",objId+"InternalKeyEdge"];
		if(targetObjects.length==1) internalKeyEdgeClasses.push("monoEdge");
		if(targetObjects.length>1) internalKeyEdgeClasses.push("multiEdge");
		for (var i in targetObjects){
			console.log("target object "+i);	
			var to = targetObjects[i]["id"];
			newKey = generateEdge(to,internalKeyNodeId,keyName,internalKeyEdgeClasses);
			if (cy.getElementById(newKey["data"]["id"]).length == 0){ 
				console.log("adding!");
				newKey["data"]["newlyCreated"] = true;
				console.log("addz");
				console.log(newKey);
				cy.add(newKey);
			}
			edges.push(newKey);
			
		}

		//////////////////////////////////
		//////  labelKeyNodeEdges   //////
		//////////////////////////////////
		console.log("labelKeyNodeEdges");
		var labelKeyNodeEdge = generateEdge(labelId,internalKeyNodeId,"",["internalEdge","labelKeyNodeEdge",objId+"InternalEdge"]);
		var labelKeyNodeEdgeReverse = generateEdge(internalKeyNodeId,labelId,"",["internalEdge","labelKeyNodeEdge",objId+"InternalEdge"]);
		if (cy.getElementById(labelKeyNodeEdge["data"]["id"]).length == 0){ 
			console.log("adding!");
			labelKeyNodeEdge["data"]["newlyCreated"] = true;
			console.log("addz");
			console.log(labelKeyNodeEdge);
			cy.add(labelKeyNodeEdge);
		}
		edges.push(labelKeyNodeEdge);
		if (cy.getElementById(labelKeyNodeEdgeReverse["data"]["id"]).length == 0){ 
			console.log("adding!");
			labelKeyNodeEdgeReverse["data"]["newlyCreated"] = true;
			console.log("addz");
			console.log(labelKeyNodeEdgeReverse);
			cy.add(labelKeyNodeEdgeReverse);
		}
		edges.push(labelKeyNodeEdgeReverse);
		
		


		//////////////////////////
		//////  attrNodes   //////
		//////////////////////////
		console.log("attrNodes");
		var isAttr = _.reduce(targetObjects,function(bool,target){
			var incoming = cy.edges("[target = '"+target["id"]+"'].internalKeyEdge");
			var incoming = _.filter(incoming,function(ed){return (!ed.source().hasClass(objId+"InternalKeyNode")); });
			var outgoing = cy.edges("."+target["id"]+"KeyEdge");
			console.log("checking attr status");
			console.log("[target = '"+target["id"]+"']:visible.internalKeyEdge");
			console.log(target["value"]);
			console.log("incoming edges: "+incoming.length);
			console.log("outgoing edges: "+outgoing.length);
			var incomingThreshold = 0;
			if (!get("view")) incomingThreshold = 0;
			var result = (bool && incoming.length==incomingThreshold && outgoing.length==0);
			console.log("ongoing result: "+result);
			return result;
		},true);

		if (isAttr){
			// add classes
			_.map(targetObjects,function(target){
				
				cy.getElementById(target["id"]).addClass("isAttribute");
				cy.getElementById(target["id"]).addClass(objId+"Attribute");
				cy.getElementById(target["id"]).addClass("attrSiblings",objId+"_"+keyName+"_Attribute");
				cy.getElementById(target["id"]).data("attrSiblings",objId+"_"+keyName+"_Attribute");

				var iknName = objName+"_"+keyName+"_InternalKeyNode";
				console.log("iknName: "+iknName);
				cy.getElementById(iknName).addClass("isAttribute");
				console.log("adding isattribute: "+iknName);
				console.log(cy.getElementById(iknName).length);
				console.log(target["value"]);
				cy.getElementById(iknName).addClass("keyNodeReferencing"+target["id"]);
			});
			var attrText = keyName+": \n-\t"+_.map(targetObjects,function(target){
				console.log(target);
				return target["value"];
			}).join("\n-\t");
			var attrClasses = _.map(targetObjects,function(target){
				console.log(target);
				var className = "attrNodeReferencing"+target["id"];
				return className;
			});
			var referencing = _.map(targetObjects,function(target){
				return {id:target["id"],value:target["name"]};
			});
			attrClasses.push("attrNode")
			attrClasses.push(objId+"AttrNode");
			attrClasses.push(objId+"_"+keyName+"_AttrNode");
			var attrId = objId+"_"+keyName+"_AttrNode";
			var attrNode = generateNode(attrId,attrText,objId,attrClasses);
			attrNode["data"]["keyName"] = keyName;
			attrNode["data"]["referencing"] = referencing;
			
			var exists = cy.getElementById(attrNode["data"]["id"]);
			if (exists.length == 0){ 
				console.log("adding!");
				attrNode["data"]["newlyCreated"] = true;
				console.log("addz");
				console.log(attrNode);
				cy.add(attrNode);

			}else if ($(exists.data("referencing")).not(referencing).length === 0 && $(referencing).not(exists.data("referencing")).length === 0){
				console.log("adding!");
				attrNode["data"]["newlyUpdated"] = true;
				console.log("addz");
				console.log(attrNode);
				cy.add(attrNode);
			}


			nodes.push(attrNode);

			
		}else{
			for (var i in targetObjects){
				var targetObject = targetObjects[i];
				var targetId = targetObject["id"]
				var targetName = targetObject["value"]
				// cy.nodes(".attrNodeReferencing"+targetId).style("display","none"); //dispnone
				// cy.nodes(".attrNodeReferencing"+targetId).style("border-color","red");
				cy.getElementById(objId+"_"+keyName+"_AttrNode").remove();

				var targ = cy.getElementById(targetId);
				if (targ.length>0) {
					console.log("removing isAttribute: "+targetId)
					// targ.style("border-color","red");
					targ.removeClass("isAttribute"); //dispnone
					targ.removeClass(objId+"Attribute");
					targ.removeClass("attrSiblings",objId+"_"+keyName+"_Attribute");
					targ.style("display","element");
					
				}

				var iknName = objName+"_"+keyName+"_InternalKeyNode";
				console.log("iknName: "+iknName);
				console.log("removing isattribute: "+iknName);
				// cy.getElementById(iknName).style("border-color","red");
				cy.getElementById(iknName).removeClass("isAttribute"); //dispnone
				cy.getElementById(iknName).removeClass("keyNodeReferencing"+targetId);
				cy.getElementById(iknName).style("display","element");
				
			}
		}


		///////////////////////////////
		//////  labelAttrEdges   //////
		///////////////////////////////
		if (isAttr){
			console.log("labelAttrEdges");
			var labelAttrEdge = generateEdge(attrId,labelId,"",["internalEdge","labelAttrEdge",objId+"InternalEdge"]);
			var labelAttrEdgeReverse = generateEdge(labelId,attrId,"",["internalEdge","labelAttrEdge",objId+"InternalEdge"]);
			if (cy.getElementById(labelAttrEdge["data"]["id"]).length == 0){ 
				console.log("adding!");
				labelAttrEdge["data"]["newlyCreated"] = true;
				console.log("addz");
				console.log(labelAttrEdge);
				cy.add(labelAttrEdge);
			}
			edges.push(labelAttrEdge);
			if (cy.getElementById(labelAttrEdgeReverse["data"]["id"]).length == 0){ 
				console.log("adding!");
				labelAttrEdgeReverse["data"]["newlyCreated"] = true;
				console.log("addz");
				console.log(labelAttrEdgeReverse);
				cy.add(labelAttrEdgeReverse);
			}
			edges.push(labelAttrEdgeReverse);
			
		}

		var t = cy.getElementById("yoyo_up_InternalKeyNode");	
		if(t){
			console.log("middle_c_InternalKeyNode");
			console.log("classcheck end");
			console.log(t.hasClass("isAttribute"));
		}else{
			console.log("Not declared");
		}
		

	}

	console.log("Done!");
	console.log(JSON.stringify(edges));
	console.log(JSON.stringify(nodes));
	return [nodes,edges];
}
