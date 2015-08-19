// getFilteredObjects = function(){
// 	var filters = {};

// 	console.log("getFilteredObjects");
// 	console.log("Filters:");

// 	// Filter by _value type
// 	filters["type"] = {"$all":["_value"]}

// 	//Filter by name of objects
// 	var filterObjNameMatches = get("filterObjNameMatches");
// 	if(!empty(filterObjNameMatches)){
// 		filters["name"] = {"$in":arr(filterObjNameMatches)}
// 	}else{
// 		filters["name"] = {"$exists":true}
// 	}
// 	console.log(filters);

// 	//Filter by name of objects
// 	var filterObjTypeMatches = get("filterObjTypeMatches");
// 	if(!empty(filterObjTypeMatches)){
// 		ors = []
// 		for (var i in filterObjTypeMatches){ 
// 			ors.push({"type":{"$all":arr(filterObjTypeMatches[i])}});
// 		}
// 		if(!empty(ors)) filters["$or"] = ors;
// 	}
// 	console.log(filters);

// 	// Filter by whether certain fields exist
// 	var filterFieldExists = get("filterFieldExists");
// 	if(!empty(filterFieldExists)){
// 		for (var k in filterFieldExists){					
// 			filters[filterFieldExists[k]] = {"$exists":true};				
// 		}
// 	}
// 	console.log(filters);
	
// 	// Filter by whether the value of a field matches a given value
// 	var filterFieldValueMatches = get("filterFieldValueMatches");
// 	if(!empty(filterFieldValueMatches)){
// 		for (var k in filterFieldValueMatches){			
// 			filters[k+".value"] = {"$in":arr(filterFieldValueMatches[k])};				
// 		}
// 	}
// 	console.log(filters);
	
// 	var query = Objects.find(filters);
// 	var objects = query.fetch();
// 	var objectIds = _.map(objects,function(o){return o["_id"]});
// 	console.log(objects);
// 	console.log(objectIds);
// 	return objects;
// 	// return [objects,objectIds];
// }
