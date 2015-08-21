processCommand = function(command){

  var stack = Session.get("stack");
  stack.unshift(command);
  Session.set("stack",stack);
  console.log(command);



  // disambiguation logic
  if(get("waitingForNumber")){
    console.log("waiting for number");
    var index = parseInt(command.trim());
    console.log("index: "+index);
    var foundObjs = get("foundObjs");
    if (isNaN(index) || index<0 || index>foundObjs.length-1){
      return ["\n\tNot a valid number.  Try again.",""];
    }else{
      set("waitingForNumber",false);
      set("currJSON",foundObjs[index]); 
      return ["\n\tNew object set.",""];
    }
  }
  

  // Check if "new" keyword in command
  if (command.slice(0,3) == "new" && command.indexOf(":")==-1){
    console.log("new");
    var curr = createEmptyObject();
    Session.set("currJSON",Objects.findOne(curr));
    var types = command.slice(4).split(",")
    types = _.map(types,function(s){return s.trim();})
    console.log(types);

    // Add new object to graph
    var currPos = cy.extent();
    // console.log("perturb currpos");
    var modLoc = perturb({x:currPos["x2"]-150,y:currPos["y2"]-150},10);
    console.log("poscheck");
    console.log(modLoc);
    refreshNodesForObject(curr,modLoc);
    // var n = createNodeAtPosition(curr,modLoc["x"],modLoc["y"]);
    console.log("Inserting new node into graph");
    // console.log(n);
    // n["classes"] = "object noKeys";
    // cy.add(n);

    return ["","name : "];
  }else if(command.slice(0,1) == "@"){
    console.log("Found @");
    var searchName = command.slice(1);
    foundObjs = Objects.find({"name":searchName}).fetch();
    
    if (foundObjs.length > 1){
      console.log("multiple found");
      
      //////  Temp   /////////
      console.log("one found.");
      set("currJSON",foundObjs[0]);
      return ["\n\t"+formatObject(foundObjs[0]),""];
      //////  /Temp   /////////
      
      console.log(JSON.stringify(foundObjs));
      set("foundObjs",foundObjs);
      outText = ""
      outText = outText +"\n\tMultiple objects found:\n";
      for (var i in foundObjs){
        outText = outText +"\t\t("+i+"): \t"+formatObject(foundObjs[i])+"\n";
      }
      outText = outText +"\n\tEnter number of desired object.";
      set("waitingForNumber",true);
      return [outText,""];
    }else if (foundObjs.length == 1){
      console.log("one found.");
      set("currJSON",foundObjs[0]);
      return ["\n\t"+formatObject(foundObjs[0]),""];
    }else{
      console.log("none found.");
      return ["\n\tNo objects found with that name.",""];
    }
  }
  // Check if command line is empty
  else if (command == ""){
    console.log("empty");
    return ["",""];
  }else if (command.indexOf(":") > -1){
    
    //split command
    console.log("splitting cmd");
    var commandParts = command.split(commandSplitChar);
    if (commandParts.length>2){
      commandParts[1] = commandParts.slice(1).join([separator = commandSplitChar])
    }
  
    // var key = commandParts[0].trim();
    // var keys = key.split(keySplitChar);
    var key = commandParts[0].toLowerCase().trim();
    var keys = key.split(keySplitChar);
    var value = commandParts.slice(1).join([separator = ':']);
    var values = _.map(value.split(valueSplitChar),function(it){return it.trim();});
    console.log("valid command");
    console.log(keys);
    console.log(values);

    var pairs = _.zip(keys,values);
    console.log(pairs);

    if (keys.indexOf("name")>-1 && values.length > 1){
      return ["Please specify only one name (no commas).",""];
      // Prevent default keypress reaction
    }
    // Modify JSON and update
    for (i=0;i<keys.length;i++){
      
      // Process key object
      var key = keys[i].trim();

  // Special case if setting object name
      if (key == "name"){
        var val = values[0];
        var curr = Session.get("currJSON");
        var currId = curr["_id"];
        var updates = {};
        updates["$addToSet"] = {"_keys":key};
        console.log(updates);
        updates["$set"] = {};
        updates["$set"][key] = val;
        var s = Objects.update(currId,updates);
        console.log("updated curr: ");
        console.log(JSON.stringify(Objects.findOne(currId)));
        Session.set("currJSON",Objects.findOne(currId));

        // Updating graph node
        var node = cy.getElementById(currId);
        node.data("name",val);
        var node = cy.getElementById(currId+"LabelNode");
        node.data("name",val);
        hideElements();
        postAddModification(node);
        return ["",""];
      }

      // Create or find _key object named key
      var result = getOrCreateKey(Objects,{"type":"_key","name":key});
      var keyObj = result[0];
      var keyCreated = result[1];
      console.log("new Key: ");
      console.log(JSON.stringify(keyObj));
      // console.log(JSON.stringify(Objects.findOne(keyObj["_id"])));
      
      // Loop over values
      //var ids = [];
      for (j=0;j<values.length;j++){
        
        // Create target object
        var val = values[j].trim();
        if(val.slice(0,1)=="@"){
          console.log("value starts with @");
          var result = getOrCreateObj(Objects,{"type":"_value","name":val.slice(1)});
        }else{
          var result = createObj(Objects,{"type":"_value","name":val});
        }
        
        // Split up result
        var valObj = result[0];  // created/gotten object
        var objCreated = result[1]; // bool: true = object just created
        var valId = valObj["_id"];  // getting object ID
        //ids.push(valId);  // Adding ID of new/retrieved object to IDs list

        console.log("new Val: ");
        console.log(JSON.stringify(Objects.findOne(valObj["_id"])));

        // Update target object
        var curr = Session.get("currJSON");
        var currId = curr["_id"];
        curr_data = {"id":curr["_id"],"value":curr["name"]}; // current object id/value dictionary
        var inv = keyObj["_inverseName"];  // inverse of user-entered key
        console.log("INV!: "+inv);
        var updates = {"$addToSet":{}};
        updates["$addToSet"]["type"] = {"$each":[keyObj["name"],"_value"]}; // updating types
        updates["$addToSet"]["_keys"] = inv;  //updating keys
        updates["$addToSet"][inv] = curr_data; //creating inverse relation
        console.log("Updates!:");
        console.log(JSON.stringify(updates));
        var s = Objects.update(valId,updates);  // submit update to Mongo
        
        // Debug output
        console.log("curr data");
        console.log(curr_data);
        console.log("updated target: ");
        console.log(JSON.stringify(Objects.findOne(valId)));

        // Updating current object
        var updates = {};
        updates["$addToSet"] = {"type":{"$each":[inv,"_value"]},"_keys":key}; //updating types
        updates["$addToSet"][key] = {"id":valId,"value":valObj["name"]};  // updating keys
        var s = Objects.update(currId,updates); // Submit update to Mongo
        console.log("updated curr: ");
        console.log(JSON.stringify(Objects.findOne(currId)));
        

        // display recently updated/created node
        var currNode = cy.getElementById(currId);
        var currNodePosition = currNode.position();
        console.log("refreshing new node");
        refreshNodesForObject(valId,currNodePosition);  

        // Adding node to graph
        // if (objCreated){
        //   // var allCyNodes = cy.nodes();
        //   // var cyNodesIds = _.map(cyNodes,function(o){
        //   //   return o["data"]["id"];
        //   // });
        //   // console.log(cyNodesIds);
        //   // var result = generateElementsFromObject(Objects.findOne(valId),cyNodesIds);
        //   // var nodes 
        //   var elements = generateElementsFromObject(valId);
        //   var nodes = elements[0];
        //   var edges = elements[1];
          
        //   var currNode = cy.getElementById(currId);
        //   var currNodePosition = currNode.position();
          
        //   // var n = createNodeAtPosition(valId,modLoc["x"],modLoc["y"]);
        //   n["classes"] = "object noKeys";
        //   n["data"]["name"] = val;
        //   console.log("insertnode process");
        //   console.log(JSON.stringify(n,null,1));
        //   cy.add(n);
        //   postAddModification(cy.getElementById(n["data"]["id"]));
        // }
      }
    }

    set("currJSON",Objects.findOne(currId));
    refreshNodesForObject(currId);

    var view = get("view");
    console.log("how's the view");
    console.log(view);
    if(view=="connection"){
      cyConnectionView();
      connectionUpdateLayout();
    }else if (view == "attribute"){
      cyAttributeView();
      attrUpdateLayout();
    }else{
      console.log("hiya");
    }

    return ["",""];

  }else{
    return ["\n\tInvalid command",""];
  }
}


checkForDisplayStatus = function(cyElement){

  var view = get("view");
  console.log("how's the view");
  console.log(view);
  if(view=="connection"){
    
  }else if (view == "attribute"){
    attributeView(existingCyNodes);
  }else{
    console.log("hiya");
  }

}

