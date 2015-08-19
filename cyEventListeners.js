
addListeners = function(listeners){
	console.log("Adding event listeners");
	for (var i in listeners){
		var listener = listeners[i];
		console.log("listener:", listener);
		cy.on(listener["event"],listener["selector"],listener["func"]);
	}
}

addListener = function(listener){
	console.log("Adding event listeners");
	console.log("listener:", listener);
	cy.on(listener["event"],listener["selector"],listener["func"]);
}

clearListeners = function(listeners){
	console.log("Clearing event listeners");
	for (var i in listeners){
		var listener = listeners[i];
		console.log("listener:", listener);
		cy.off(listener["event"],listener["selector"],listener["func"]);
	}
}

clearListeners = function(evt, selector){
	cy.off(evt,selector);
}

clearListener = function(listener){
	console.log("Clear event listener");
	console.log("listener:", listener);
	cy.off(listener["event"],listener["selector"],listener["func"]);
}




cyClickNodeForConcentricKeyNodes = {
	"event":"click",
	selector:"node",
	"func":function(evt){
		var node = evt.cyTarget;
		var nodeId = node.id();
		tryExternalKeyNodes(nodeId);
	}
}

cyClickToGatherNodes = {
	"event":"click",
	selector:"node",
	"func":gatherKeyNodes
}

cySpaceOutKeyNodes = {
	"event":"click",
	"selector":"node",
	"func":function(evt){
		var node = evt.cyTarget;
		var nodeId = node.id();
		spaceKeyNodes(nodeId);
	}
}


cyClickForNewObject = {
	"event":"tap",
	"selector":"",
	"func":clickForObjectFunction
}

cyShowEvents = {
	"event":"tap",
	selector:"",
	"func":function(evt){
		var events = ["mousedown","mouseup","click","","","","touchstart","touchmove","touchend","tapstart","vmousedown","","","","","tapend","vmouseup","tap","vclick","taphold"]
		for (var i in events){
			eventNotifier(events[i]);
		}	
	}
}



cyClickForId = {
	
	"event":"tap",
	"selector":"*",
	func: function(evt){
		console.log("Node clicked");
		console.log(evt.cyTarget);
		console.log(typeof evt.cyTarget);
		var node = evt.cyTarget;
		console.log(node.id());
		console.log(node.boundingBox());
		active = node;
		// print classes
		printClasses(evt.cyTarget.id());

		// evt.stopPropagation();
		// return false;
	}
}
