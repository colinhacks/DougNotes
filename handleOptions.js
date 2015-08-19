// the default values of each option are outlined below:
handleOptions = {
  preview: true, // whether to show added edges preview before releasing selection
  handleSize: 30, // the size of the edge handle put on nodes
  handleColor: '#ff0000', // the colour of the handle and the line drawn from it
  handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
  handleLineWidth: 2, // width of handle line in pixels
  handleNodes: '.object', // selector/filter function for whether edges can be made from a given node
  hoverDelay: 100, // time spend over a target node before it is considered a target selection
  cxt: true, // whether cxt events trigger edgehandles (useful on touch)
  enabled: true, // whether to start the plugin in the enabled state
  toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
  edgeType: function( sourceNode, targetNode ){
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
    return 'flat'; 
  },
  loopAllowed: function( node ){
    // for the specified node, return whether edges from itself to itself are allowed
    return false;
  },
  nodeLoopOffset: -50, // offset for edgeType: 'node' loops
  nodeParams: function( sourceNode, targetNode ){
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for intermediary node
    return undefined;//{};
  },
  edgeParams: function( sourceNode, targetNode, i ){
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
    return {group:"edges","classes":"handleEdge"};
  },
  start: function( sourceNode ){
    // fired when edgehandles interaction starts (drag on handle)
  },
  complete: function( sourceNode, targetNodes, addedEntities ){
    // fired when edgehandles is done and entities are added
    var from = sourceNode.id();
    
    var targetNodes = _.filter(targetNodes,function(ele){
    	return (ele.hasClass("object") || ele.hasClass("labelNode"));
    });
    var tos = _.map(targetNodes,function(ele){
    	if (ele.hasClass("object")){
    		var eleId = ele.id();
    		return {"id":eleId,"value":ele.data("name")};
    	}else if (ele.hasClass("labelNode")){
    		var eleId = ele.id().slice(0,-9);
    		return {"id":eleId,"value":ele.data("name")};
    	}
    });
    console.log("COMPLETE HANDLES");
    var edgeName = prompt("Please enter the key type.", "");
	if (edgeName != null && edgeName != "") {
	    var updates = {};
	    updates[edgeName] = {$each:tos};
		console.log("RESULTS");
	    console.log({$addToSet:updates});
	    Objects.update({_id:from},{$addToSet:updates});

	}else{
		alert("no type, not creating relation");
	}
	console.log("sourcenode position");
	console.log(sourceNode.position());
	refreshNodesForObject(from,sourceNode.position());
	
	var view = get("view");
    if(view=="connection"){
      cyConnectionView();
      // connectionUpdateLayout();
    }else if (view == "attribute"){
      cyAttributeView();
      // attrUpdateLayout();
    }else{
      console.log("hiya");
    }

  },
  stop: function( sourceNode ){
    // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)

    cy.edges(".handleEdge").remove();
  }
};