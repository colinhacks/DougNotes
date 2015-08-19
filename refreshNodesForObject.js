
refreshNodesForObject = function(id,loc){

  console.log("refreshNodesForObject");
  console.log(id);
  var objectLoc = loc;//cy.getElementById(id).position();
  console.log("Loc:");
  console.log(loc);
  if(!objectLoc){
    console.log("noLoc");
    objectLoc = cy.getElementById(id).position();
    console.log("ObjectLoc");
    console.log(objectLoc);
  }
  console.log("Final loc");
  console.log(objectLoc);

  var object = Objects.findOne(id);
  

  var cyData = generateElementsFromObject(object);  


  var cyNodes = cyData[0];
  var cyEdges = cyData[1];

  console.log("checking loc of main node");
  var main = cyNodes[0];
  var main = cy.getElementById(main["data"]["id"]);
  console.log(main.position());



  existingCyNodes = cy.collection();
  existingCyEdges = cy.collection();


  for (var i in cyNodes){
    
    var cyNode = cyNodes[i];
    var existingCyNode = cy.getElementById(cyNode["data"]["id"]);
    existingCyNodes = existingCyNodes.add(existingCyNode);
    console.log("examining node: "+cyNode["data"]["id"]);
    console.log(cyNode["data"]["name"]);
    console.log(cyNode);
    


    if(existingCyNode.data("newlyCreated") == true){
      existingCyNode.data("newlyCreated",false);
      console.log("perturbing objectLoc");
      console.log(objectLoc);
      var modLoc = perturb(objectLoc,10);
      console.log("poscheck: ");
      console.log(modLoc);
      existingCyNode.position(modLoc); // place object on top of its parent
      var classes = cyNode["data"]["_classes"];
      for (var i in classes) {
        console.log("addc: "+classes[i]);
        existingCyNode.addClass(classes[i]);
      }
    }else{ // node already exists in graph
      
      existingCyNode = cy.getElementById(cyNode["data"]["id"]);
      console.log("not adding node");
      console.log(cyNode["data"]["id"]);
      console.log("location of existing cyNode");
      console.log(existingCyNode.position());
    
    }
  }
  console.log("existingCyNodes");
  console.log(existingCyNodes);

  for (var i in cyEdges){

    var cyEdge = cyEdges[i];
    var existingCyEdge = cy.getElementById(cyEdge["data"]["id"]);
    existingCyEdges = existingCyEdges.add(existingCyEdge);
    console.log("examining edge: "+cyEdge["data"]["id"]);
    console.log(cyEdge);
    console.log(cyEdge["data"]["name"]);
    if(cy.getElementById(cyEdge["data"]["id"]).length == 1){
      console.log("currently adding edge");
      var classes = cyEdge["data"]["_classes"];
      console.log("cynode classes");
      console.log(classes);
      for (var i in classes) {
        console.log("addc: "+classes[i]);
        existingCyEdge.addClass(classes[i]);
      }
    }else{
      console.log("not adding edge");
      console.log(cyNode["data"]["id"]);
    }
  }




}
