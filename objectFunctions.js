

getOrCreateObj = function(coll,pairs){

	console.log("getOrCreateObj");
	console.log(pairs);
	var target = coll.findOne(pairs);
	if (target){
		console.log(target);
		return [target,false];
	}else{
		// newPairs = {}
		// for (var k in pairs){
		// 	if (k.indexOf(".") == -1){
		// 		newPairs[k] = pairs[k];
		// 	}else{
		// 		sp = k.split(".")
		// 		ne = {}
		// 		ne[sp[1]] = pairs[k];
		// 		newPairs[sp[0]] = ne;
				
		// 	}
		// }
		// console.log("New Pairs");
		// console.log(JSON.stringify(newPairs));
		if (!pairs["_keys"]){
			console.log("setting pairs[_keys]");
			pairs["_keys"]=[];
		}
		if (typeof pairs["type"] != "array"){
			pairs["type"]=[pairs["type"]];
		}
		pairs["createdAt"] = Date.now();
		console.log(JSON.stringify(pairs));
		var keyObjId = coll.insert(pairs);
		var keyObj = coll.findOne(keyObjId);
		return[keyObj,true];
	}
}


createObj = function(coll,pairs){

	console.log("getOrCreateObj");
	console.log(pairs);
	var target = coll.findOne(pairs);

	if (!pairs["_keys"]){
		console.log("setting pairs[_keys]");
		pairs["_keys"]=[];
	}
	if (typeof pairs["type"] != "array"){
		pairs["type"]=[pairs["type"]];
	}
	pairs["createdAt"] = Date.now();
	console.log(JSON.stringify(pairs));
	var keyObjId = coll.insert(pairs);
	var keyObj = coll.findOne(keyObjId);
	return[keyObj,true];
	
}

createEmptyObject = function(){
	defaults = {}
	defaults["type"] = ["_value"];
	// Add user defaults here
	return Objects.insert(defaults);
}

getOrCreateValue = function(coll,pairs){
	console.log("getOrCreateKey");
	var result = getOrCreateObj(coll,pairs);
	var obj = result[0];
	var created = result[1];
	if (created){
		var s = coll.update(obj["_id"],{"$set":{"type":["_value"]}});
		console.log("Update: "+s);
	}
	return [obj,created];
}	

getOrCreateKey = function(coll,pairs){
	console.log("getOrCreateKey");
	var result = getOrCreateObj(coll,pairs);
	var obj = result[0];
	var created = result[1];
	if (created){
		var temp = pairs;
		var inv = "inverse_"+pairs["name"];
		temp["name"] = inv
		temp["_inverse"] = obj["_id"];
		temp["_inverseName"] = obj["name"];
		var invKeyObjId = coll.insert(temp);
		coll.update(obj["_id"],{"$set":{"_inverse":invKeyObjId,"_inverseName":inv}});
		console.log("Updated.");
		obj = Objects.findOne(obj["_id"]);
	}

	return [obj,created];
}

printClasses =function(id){
	console.log(cy.elements("#"+id)[0]["_private"]["classes"]);
}