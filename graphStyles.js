arrowsOn = {
	selector : "edge", 
	style : {
		"target-arrow-color" : "black",/*The colour of the edge's target arrow.*/
		"target-arrow-shape" : "triangle",/*The shape of the edge's target arrow; may be tee, triangle, triangle-tee, triangle-backcurve, square, circle, diamond, or none.*/
		"target-arrow-fill" : "filled"/*The fill state of the edge's target arrow; may be filled or hollow.*/
	}
}

arrowsOff = {
	selector : "edge", 
	style : {
		"target-arrow-shape" : "none",/*The shape of the edge's target arrow; may be tee, triangle, triangle-tee, triangle-backcurve, square, circle, diamond, or none.*/
	}
}

nodeLabelsOn = {
  selector: 'node',
  style: {
    'content': 'data(name)'
  }
}

nodeLabelsOff = {
  selector: 'node',
  style: {
    'content': ''
  }
}

nodeIdLabelsOn = {
  selector: 'node',
  style: {
    'content': 'data(id)'
  }
}

edgeLabelsOn = {
  selector: 'edge',
  style: {
    'content': 'data(name)'
  }
}

edgeLabelsOff = {
  selector: 'edge',
  style: {
    'content': ''
  }
}

multiEdgeLabelsOff = {
  selector: 'edge.multiEdge',
  style: {
    'content': ''
  }
}

keyEdgeLabelsOff = {
  selector: 'edge.keyEdge',
  style: {
    'content': ''
  }
}

keyEdgeLabelsOn = {
  selector: 'edge.keyEdge',
  style: {
    'content': "data(name)"
  }
}

multiEdgeLabelsOn = {
  selector: 'edge.multiEdge',
  style: {
    'content': 'data(name)'
  }
}

keyNodeLabelsCentered = {
  selector: 'node.keyNode',
  style: {
    'text-valign': 'center'
  }
}

internalKeyNodeLabelsCentered = {
  selector: 'node.internalKeyNode',
  style: {
    'text-valign': 'center'
  }
}

keyNodeLabelsTop = {
  selector: 'node.keyNode',
  style: {
    'text-valign': 'top'
  }
}

monoEdgeLabelBottom = {
  selector: 'edge.monoEdge',
  style: {
    'text-valign': 'center'
  }
}

orphanLabelBottom = {
  selector: 'node:orphan',
  style: {
    'text-valign': 'bottom'
  }
}

orphanLabelTop = {
  selector: 'node:orphan',
  style: {
    'text-valign': 'top'
  }
}

parentLabelTop = {
  selector: 'node:parent',
  style: {
    'text-valign': 'top'
  }
}

keyNodeLabelsTop = {
  selector: 'node.keyNode',
  style: {
    'text-valign': 'top'
  }
}



style = function(sel,sty){
	
	var update = cy.style().selector(sel)
		.style(sty)			  
		.update(); // update the elements in the graph with the new style		;	}
	return cy;
		}

updateStyles = function(cy,styleJSONs){
	for (i=0;i<styleJSONs.length;i++){
		sty = styleJSONs[i];
		var sel = cy.style().selector(sty["selector"])
			.style(sty["style"])			  
			.update(); // update the elements in the graph with the new style		;	}
	}
	return cy;
}


updateCollectionStyle = function(collection,sty){
	
	var sel = collection
		.style(sty)			  
		.update(); // update the elements in the graph with the new style		;	}
	return cy;
}