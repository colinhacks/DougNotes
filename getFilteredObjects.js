
getFilteredObjects = function(){
	var filters = getObjectFilters();
	var query = Objects.find(filters);
	var objects = query.fetch();
	var objectIds = _.map(objects,function(o){return o["_id"]});
	console.log(objects);
	console.log(objectIds);
	return objects;
}

getFilteredObjectIds = function(){
	var objects =  getFilteredObjects();
	return _.map(objects,function(o){return o["_id"]});

}