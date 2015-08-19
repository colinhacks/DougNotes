getIncoming = function(id){
	return cy.edges("[target = '"+nodeId+"']");
}

getOutgoing = function(id){
	return cy.edges("."+nodeId+"KeyEdge");
}