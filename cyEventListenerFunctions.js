
//################################
//################################
//			FUNCTIONS		
//################################
//################################

eventNotifier = function(e){
	cy.on(e,function(evt){
		console.log(e+"!");
	});
}

clickForObjectFunction = function(evt){

	console.log(evt.cyTarget === cy);
	if (evt.cyTarget === cy){

		// console output
		console.log("TAPPED");
		console.log(evt.cyTarget);
		console.log(typeof evt.cyTarget);
		console.log(evt);
		

		// if (evt.target.tagName == "INPUT" || evt.target.tagName == "input"){
		// 	return false;
		// }

		// Delete other input/node pairs
		console.log("Deleting other inputs");
		deleteInputElements();
		
		// click data
		var cyPosition = evt["cyPosition"];
		var cyRenderedPosition = evt["cyRenderedPosition"];


		var graphShowerPosition = $("#graphShower").position();
		// var parentPosition = $("#graphShower").position();
		// var parentX = parentPosition["left"];
		// var parentY = parentPosition["top"];

		// create empty object to get ID
		var objectId = createEmptyObject();
		var object = Objects.findOne(object)
		console.log("created "+objectId);
		set("currJSON",object);

		// create and add new node
		console.log("cyPosition");
		console.log(cyPosition);
		refreshNodesForObject(objectId,cyPosition);//createNodeAtPosition(object,cyPosition["x"],cyPosition["y"]);
		//hideElements();

		var node = cy.getElementById(objectId);
		// node["classes"] = "object"
		// node["name"] = "nodesOnTap";
		//var node = cy.add(node);


		// create and add text input box
		var adjustedNodeHeight = 80;//getNodeHeight(node);

		var inputEle = $("<input type='text'>");
		inputEle.attr("id",objectId);
		inputEle.css("position","absolute");
		var top = graphShowerPosition["top"]+cyRenderedPosition["y"]+adjustedNodeHeight/2+5
		var left = graphShowerPosition["left"]+cyRenderedPosition["x"]-50;
		inputEle.css("top",top);
		inputEle.css("left",left);
		inputEle.css("width","100px");
		inputEle.attr("class","inputNodeName");
		$("body").append(inputEle);
		inputEle.focus();
		cy.panningEnabled(false);
		cy.zoomingEnabled(false);
	}	
	return false;

}

deleteInputElements = function(evt){
	console.log("Deleting other inputs");
	$(".inputNodeName").each(function(i){
		console.log($(this));
		//a = $(this);
		var id = $(this).attr("id");
		console.log(id);
		cy.nodes("#"+id).remove();
        Objects.remove(id);
        $(this).remove();
	});
}


panWithKeys = function(evt){
	if(evt.cyTarget === cy){
		placeArrowIndicator(evt);
		enableArrowKeyNavigation(evt);
	}
}

// placeArrowIndicator = function(evt){
// 	$("#arrowIcon").remove();
// 	var offset = $("#graphShower").offset();
// 	var clickOffset = evt["cyRenderedPosition"];
// 	var left = offset["left"] + clickOffset["x"] - 18;
// 	var top = offset["top"] + clickOffset["y"] - 24;
// 	console.log("Locations: "+top+", "+left);
// 	var style = "position:absolute;top:"+top+"px;left:"+left+"px;-ms-transform: rotate(45deg);-webkit-transform: rotate(45deg); transform: rotate(45deg);"
// 	var html = "<i id='arrowIcon' class='fi-arrows-out' style='"+style+"'></i>"
// 	console.log("HTML");
// 	console.log(html);
// 	$("body").append(html);
// }


panGraph = function(evt){

	// console.log("Pan Graph");
	
	// add view logic?
	if(!$("#commandTextarea").is(":focus")){ //&& get("detailViewEnabled")){
		var re = cy.renderedExtent();
		var middle = {x:(re["x1"]+re["x2"])/2, y:(re["y1"]+re["y2"])/2}
		var zoomIn = 1.05*cy.zoom();
		var zoomOut = 0.952*cy.zoom();
		var x = 0;
		var y = 0;
		switch(evt.keyCode) {
			case 37: // left
				// console.log("left");
				x = x+20;
				if(get("up")){
					y = y+20;
				}else if(get("down")){
					y = y-20;
				}
				break;

	        case 38: // up
		        // console.log("up");
	        	if(get("command")){
					cy.zoom({level:zoomOut,renderedPosition:middle});
				}else{
					y = y+20;
					if(get("left")){
						x = x+20;
					}else if(get("right")){
						x = x-20;
					}
				}
				break;

	        case 39: // right
	        	// console.log("right");
	        	x = x-20;
				cy.panBy({x: -20, y: 0 });
				if(get("up")){
					y = y+20;
				}else if(get("down")){
					y = y-20;
				}
				break;

	        case 40: // down
	        	// console.log("down");
	        	if(get("command") ) {
					cy.zoom({level:zoomIn,renderedPosition:middle});
				}else{
					y = y - 20;
					if(get("left")){
						x = x+20;
					}else if(get("right")){
						x = x-20;
					}
				}
				break;

	        default: return; // exit this handler for other keys
	    }
	    // console.log("x: "+x);
	    // console.log("y: "+y);
	    cy.panBy({x:x,y:y});
	    return false;
	}
	// return false;
    //evt.preventDefault(); // prevent the default action (scroll / move caret)

}

setPressed = function(evt){

	// console.log("set pressed");
	switch(evt.keyCode) {
		case 37: // left
			set("left",true);
			// console.log("left");
			break;
        case 38: // up
	        set("up",true);
	        // console.log("up");
			break;
        case 39: // right
	        set("right",true);
        	// console.log("right");
			break;
        case 40: // down
	        set("down",true);
        	// console.log("down");
			break;
		case 91: // down
	        set("command",true);
        	// console.log("command");
			break;

        default: return; // exit this handler for other keys
    }
	//evt.preventDefault(); // prevent the default action (scroll / move caret)
}

setUnpressed = function(evt){

	// console.log("set pressed");
	switch(evt.keyCode) {
		case 37: // left
			set("left",false);
			// console.log("left");
			break;
        case 38: // up
	        set("up",false);
	        // console.log("up");
			break;
        case 39: // right
	        set("right",false);
        	// console.log("right");
			if(get("left")){
				cy.zoom(1.01*cy.zoom());
			}
			break;
        case 40: // down
	        set("down",false);
        	// console.log("down");
			break;
		case 91: // down
	        set("command",false);
        	// console.log("command");
			break;
        default: return; // exit this handler for other keys
    }
	//evt.preventDefault(); // prevent the default action (scroll / move caret)
}



enableArrowKeyNavigation = function(evt){

}

gatherKeyNodes = function(evt){

	var target = evt.cyTarget;
	var node = cy.nodes("#"+target.id());

	var objectNodes = node;
	for (var i in objectNodes){
		if(isNaN(parseInt(i)) ){
			continue;
		}
		var node = objectNodes[i];
		var nodeId = node.id();
		var loc = node.position();
		var x1 = loc["x"]
		var y1 = loc["y"]
		console.log("parent x: "+x1);
		console.log("parent y: "+y1);
		
		var eles = cy.nodes("."+nodeId+"KeyNode");

		for (var i in eles){
			if(isNaN(parseInt(i)) ){
				continue;
			}
			var keyNode = eles[i];
			var px = node.width()/2 + keyNode.width()/2;
			var x2 = keyNode.position()["x"];
			var y2 = keyNode.position()["y"];
			console.log("child x: "+x2);
			console.log("child y: "+y2);
			
			var dy = y2-y1;
			var dx = x2-x1;
			var signdy = dy/Math.abs(dy)
			var signdx = dx/Math.abs(dx)


			console.log("Diff: "+dy/dx);
			var angle = Math.atan(dy/dx);

			console.log("angle: "+angle);
			


			var dx = px*Math.abs(Math.cos(angle))
			var dy = px*Math.abs(Math.sin(angle))

			var newx = x1+signdx*dx;
			var newy = y1+signdy*dy;
			
			console.log("new x: "+newx);
			console.log("new y: "+newy);

			keyNode.animate({position:{x: newx, y: newy}},{duration:3000})
		}
	}
}

clickToUpdateCurrJSON = function(evt){
	// make active object
	if (evt.cyTarget.hasClass("object")){
		set("currJSON",Objects.findOne(evt.cyTarget.id()));
	}
}

highlightNode = function(evt){

	var node = evt.cyTarget;
	var nodeId = node.id();
	if(!node.hasClass("keyNode")){
		var prevDetailNode = get("detailNode");
		if (prevDetailNode){
			cy.nodes("#"+prevDetailNode).style({"border-width":4,"border-color":"black"});
			cy.edges("."+prevDetailNode+"KeyEdge").style({"width":1,"line-color":"#ddd"});

		}
		
		cy.nodes("#"+nodeId).style({"border-width":6,"border-color":"red"});
		set("detailNode",nodeId);
	}
}

highlightConnections = function(evt){

	var node = evt.cyTarget;
	var nodeId = node.id();
	if(!node.hasClass("keyNode")){
		var cxns = cy.edges("."+nodeId+"KeyEdge");
		cxns.style({"width":5,"line-color":"red"});
	}
}


clickForColoring = function(evt){


	var node = evt.cyTarget;
	var nodeId = node.id();
	if(node.hasClass("labelNode")) {
		console.log(node.id());
		node = node.parent()[0];
		nodeId = node.id();
	}

	if (!node.hasClass("object")) return undefined;

	if(node.hasClass("showOutgoing")){
		node.removeClass("showOutgoing");
		node.addClass("showIncoming");

		// clear old style
		cy.nodes("#"+nodeId).style({"border-width":6,"border-color":"blue"});
		cy.edges("."+nodeId+"KeyEdge").style({"width":1,"line-color":"#ddd"});
		cy.edges("."+nodeId+"InternalKeyEdge").style({"width":1,"line-color":"#ddd"});

		// add new style
		var incoming = cy.edges("[target = '"+nodeId+"']");
		incoming.style({"width":5,"line-color":"blue"});

		
	}else if(node.hasClass("showIncoming")){
		node.removeClass("showIncoming");
		cy.nodes("#"+nodeId).style({"border-width":4,"border-color":"black"});
		cy.edges("."+nodeId+"KeyEdge").style({"width":1,"line-color":"#ddd"});
		cy.edges("."+nodeId+"InternalKeyEdge").style({"width":1,"line-color":"#ddd"});
		cy.edges("[target = '"+nodeId+"']").style({"width":1,"line-color":"#ddd"});
		set("detailNode",undefined);
	}else{
		var prevDetailNode = get("detailNode");
		if (prevDetailNode){
			var prevs = cy.nodes("#"+prevDetailNode);
			prevs.style({"border-width":4,"border-color":"black"});
			cy.edges("."+prevDetailNode+"KeyEdge").style({"width":1,"line-color":"#ddd"});
			cy.edges("."+prevDetailNode+"InternalKeyEdge").style({"width":1,"line-color":"#ddd"});
			cy.edges("[target = '"+prevDetailNode+"']").style({"width":1,"line-color":"#ddd"});
			prevs.removeClass("showIncoming");
			prevs.removeClass("showOutgoing");
		}
		cy.nodes("#"+nodeId).style({"border-width":6,"border-color":"red"});
		set("detailNode",nodeId);

		var cxns = cy.edges("."+nodeId+"KeyEdge");
		var intcxns = cy.edges("."+nodeId+"InternalKeyEdge");
		cxns.style({"width":5,"line-color":"red"});
		intcxns.style({"width":5,"line-color":"red"});
		node.addClass("showOutgoing");
	}
}


inputFocus = function(){
	$(this).focus();
	console.log($(this).attr("id"));
}

attrNodeExpand = function(evt){

	var attrNode = evt.cyTarget;
	var classes = attrNode["_private"]["classes"];
	var targetObjects = attrNode.data("referencing");
	var keyName = attrNode.data("keyName");
	var objName = cy.getElementById(attrNode.data("_parent")).data("name");
	for (var i in classes){
		if (i.indexOf("attrNodeReferencing", 0) === 0){
			var targetId = i.slice(19);
			var target = Objects.findOne(targetId);
			var targetName = target["name"];
			targetObjects.push({id:targetId,value:targetName})
		} else if (i.indexOf("AttrNode") != -1){
			var objId = i.slice(0,-8);
		}
	}


	for (var i in targetObjects){
		var targetObject = targetObjects[i];
		var targetId = targetObject["id"];
		var targetName = targetObject["value"];
		// cy.nodes(".attrNodeReferencing"+targetId).style("display","none"); //dispnone
		// cy.nodes(".attrNodeReferencing"+targetId).style("border-color","red");
		attrNode.remove();

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

processInputKeypress = function(evt){
  console.log("input keypress");
  console.log(evt);
  var id = $(this).attr("id");
  console.log("id");
  console.log(id);
  if(evt.keyCode == 13){ // ENTER

    var text = $(this).val().trim();
    if (text==""){  // text box empty
      console.log('empty string');
      Objects.remove(id);
      cy.getElementById(id).remove();
    }else{  // text box has content
      var updates = {}
      updates["$set"] = {"name":text}
      Objects.update(id,updates);
      var cyNode = cy.getElementById(id);
      var labelNode = cy.getElementById(id+"LabelNode");
      cyNode.data("name", text);
      labelNode.data("name", text);
      hideElements();
      postAddModification(cyNode);
    }

    $(this).remove();

    // cy = refreshNodes();
    // cy.layout(get("updateView"));

    if ($(".inputNodeName").length == 0){
      cy.panningEnabled(true);
      cy.zoomingEnabled(true);
    }
    return false;
  }else if(evt.keyCode == 27){ // ESC
    console.log("ESC");
    cy.getElementById(id).remove();
    Objects.remove(id);
    $(this).remove();
    if ($(".inputNodeName").length == 0){
      cy.panningEnabled(true);
      cy.zoomingEnabled(true);
    }
    return false;
  }else{ // any other key
    return true;
  }

}

