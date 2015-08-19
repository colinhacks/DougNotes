
empty = function(a){
	if (typeof a == "string"){
		return a=="";
	}else if (Array.isArray(a)){
		return a.length == 0;
	}else if (Array.isArray(a)){
		for(var prop in a) {
	        if(a.hasOwnProperty(prop))
	            return false;
	    }
	    return true;
	}		
}


arr = function(item){
	if(Array.isArray(item)) return item;
	else return [item];
}

perturb = function(input, radius){

	console.log("perturb");
	console.log("input");
	console.log(input);
	console.log("radius");
	console.log(radius);
	var newX = input["x"]+radius*(Math.random()-.5)
	var newY = input["y"]+radius*(Math.random()-.5)
	console.log("newx"+newX);
	console.log("newy"+newY);
	console.log(JSON.stringify({x:newX,y:newY}));
	return {x:newX,y:newY};

}
