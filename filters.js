keyOk = function(){
	var skipKeys = ["name","type","createdAt"];
	filterKeyNameDoesNotMatch = get("filterKeyNameDoesNotMatch");
	if(!empty(filterKeyNameDoesNotMatch)){
		skipKeys = skipKeys.concat(filterKeyNameDoesNotMatch);
	}

	var filterKeyNameMatches = get("filterKeyNameMatches");
	if(!empty(filterKeyNameMatches)){
		if (filterKeyNameMatches.indexOf(keyName) == -1) {
			console.log("Key name does not match.");
			return false;
		};
	}
	console.log("made it past filterkeyname");
	console.log("skipkeys");
	if (skipKeys.indexOf(keyName) != -1) return false;
	console.log("defaultFilter");
	if (!defaultFilter(keyName)) return false; 
	console.log("clear inverses");
	var filterInverses = get("filterInverses");
	if (filterInverses && !inverseFilter(keyName)) return false; 
	console.log("Made it past the return falses!");

	return true;
}

checkKey = function(keyName){
	var skipKeys = ["name","type","createdAt"];
	filterKeyNameDoesNotMatch = get("filterKeyNameDoesNotMatch");
	if(!empty(filterKeyNameDoesNotMatch)){
		skipKeys = skipKeys.concat(filterKeyNameDoesNotMatch);
	}

	var filterKeyNameMatches = get("filterKeyNameMatches");
	if(!empty(filterKeyNameMatches)){
		if (filterKeyNameMatches.indexOf(keyName) == -1) {
			console.log("Key name does not match.");
			return false;
		};
	}
	console.log("made it past filterkeyname");
	console.log("skipkeys");
	if (skipKeys.indexOf(keyName) != -1) return false;
	console.log("defaultFilter");
	if (!defaultFilter(keyName)) return false; 
	console.log("clear inverses");
	var filterInverses = get("filterInverses");
	if (filterInverses && !inverseFilter(keyName)) return false; 
	console.log("Made it past the return falses!");

	return keyName;
}


getGoodKeys = function(obj){
	var skipKeys = ["name","type","createdAt"];
	filterKeyNameDoesNotMatch = get("filterKeyNameDoesNotMatch");
	if(!empty(filterKeyNameDoesNotMatch)){
		skipKeys = skipKeys.concat(filterKeyNameDoesNotMatch);
	}
	var filterKeyNameMatches = get("filterKeyNameMatches");
	var filterInverses = get("filterInverses");
	
	goodKeys = {}
	for(var keyName in obj){

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
		if (filterInverses && !inverseFilter(keyName)) continue; 
		console.log("Made it past the continue!");

		goodKeys[keyName] = obj[keyName];
	}
	console.log("goodkeys returning: "+goodKeys);
	return goodKeys;
}

objOk = function(id){
	filters["type"] = {"$all":["_value"]}

	//Filter by name of objects
	var filterObjNameMatches = get("filterObjNameMatches");
	if(!empty(filterObjNameMatches)){
		filters["name"] = {"$in":arr(filterObjNameMatches)}
	}else{
		filters["name"] = {"$exists":true}
	}
	console.log(filters);

	//Filter by name of objects
	var filterObjTypeMatches = get("filterObjTypeMatches");
	if(!empty(filterObjTypeMatches)){
		ors = []
		for (var i in filterObjTypeMatches){ 
			ors.push({"type":{"$all":arr(filterObjTypeMatches[i])}});
		}
		if(!empty(ors)) filters["$or"] = ors;
	}
	console.log(filters);

	// Filter by whether certain fields exist
	var filterFieldExists = get("filterFieldExists");
	if(!empty(filterFieldExists)){
		for (var k in filterFieldExists){					
			filters[filterFieldExists[k]] = {"$exists":true};				
		}
	}
	console.log(filters);
	
	// Filter by whether the value of a field matches a given value
	var filterFieldValueMatches = get("filterFieldValueMatches");
	if(!empty(filterFieldValueMatches)){
		for (var k in filterFieldValueMatches){			
			filters[k+".value"] = {"$in":arr(filterFieldValueMatches[k])};				
		}
	}
	console.log(filters);
	
	var query = Objects.find(filters);
	var objects = query.fetch();
	var objectIds = _.map(objects,function(o){return o["_id"]});

	return (objectIds.indexOf(id) != -1);
}

getObjectFilters = function(id){
	var filters = {};
	filters["type"] = {"$all":["_value"]}

	//Filter by name of objects
	var filterObjNameMatches = get("filterObjNameMatches");
	if(!empty(filterObjNameMatches)){
		filters["name"] = {"$in":arr(filterObjNameMatches)}
	}else{
		filters["name"] = {"$exists":true}
	}
	console.log(filters);

	//Filter by name of objects
	var filterObjTypeMatches = get("filterObjTypeMatches");
	if(!empty(filterObjTypeMatches)){
		ors = []
		for (var i in filterObjTypeMatches){ 
			ors.push({"type":{"$all":arr(filterObjTypeMatches[i])}});
		}
		if(!empty(ors)) filters["$or"] = ors;
	}
	console.log(filters);

	// Filter by whether certain fields exist
	var filterFieldExists = get("filterFieldExists");
	if(!empty(filterFieldExists)){
		for (var k in filterFieldExists){					
			filters[filterFieldExists[k]] = {"$exists":true};				
		}
	}
	console.log(filters);
	
	// Filter by whether the value of a field matches a given value
	var filterFieldValueMatches = get("filterFieldValueMatches");
	if(!empty(filterFieldValueMatches)){
		for (var k in filterFieldValueMatches){			
			filters[k+".value"] = {"$in":arr(filterFieldValueMatches[k])};				
		}
	}
	console.log(filters);
	
	return filters;
}