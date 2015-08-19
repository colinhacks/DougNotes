

if (Meteor.isClient) {
  // counter starts at 0
  Session.set("stack",[])
  Session.set("stackPointer",-1)

  Objects = new Mongo.Collection("objects");
  Object.size = function(obj) {
    var size = 0, key;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  //Parameters
  commandSplitChar = ":"
  valueSplitChar = ","
  keySplitChar = ","
  

  //##########################################
  //                  MAIN
  //##########################################

  Template.layout.onRendered(function(){
    // Create example data
    // var r = {"_keys":["hi","sfklnd"],"name":{"id":"sfnsdkfjbf","value":"sdflskdnf"},"sdfdf":"sdfsdfsdf"}//,2345:134523,"sdfgf":"dgdg"};
    // Session.set("currJSON",r);
    

    //set Session vars
    // set("filterKeyNameMatches",[])
    // set("filterObjNameMatches",["yoyo","blarg","a","s","d"]);
    // set("filterFieldExists",["blarg"]);
    // set("filterFieldValueMatches",{"name":["yoyo"]});

    set("filterKeyNameMatches",[]);
    set("filterKeyNameDoesNotMatch",[]);
    set("filterInverses",true);
    set("filterObjNameMatches",[]);
    set("filterObjTypeMatches",[]);
    set("filterFieldExists",[]);
    set("filterFieldValueMatches",{});
    set("view",undefined);
    
    // cose functions
    var stop = function(){
      cy.nodes().each(function(i,node){
    
        var par = node.data("_parent");
        if (par){
          node.move({"parent":par});
        }
      });

      meltNodes(".object");
      // makeKeysInternal();
      // gatherAllKeyNodes(50);
    }
    var ready = function(){
      //makeKeysExternal();
      cy.nodes(".object").children().move({parent:null});
    }

    //initial view
    var init = { "name":"cose","gravity":200,"idealEdgeLength":20,"edgeElasticity":1,"initialTemp":150,
      "animate":true,"randomize":false, "nodeRepulsion":10000000,"nodeOverlap": 1000,
      coolingFactor:.95,numIter:300
    }
    init["ready"] = ready;
    init["stop"] = stop;
    set("initialView",init);//{"name":"cose","initialTemp":1000,"randomize":false,"fit":true});
    
    //update view
    var update = {"name":"cose","gravity":200,"idealEdgeLength":20,"edgeElasticity":1,"initialTemp":1.5,
      "animate":true,"randomize":false, "nodeRepulsion":10000000,"nodeOverlap": 1000,
      "coolingFactor":1,"numIter":30, "fit":false
    }
    update["stop"] = stop;
    update["ready"] = ready;
    set("updateView", update);

    set("cutoffForKeyNode",1);
    set("detailViewEnabled", true);
    set("right",false);

    set("left",false);
    set("up",false);
    set("down",false);
    set("command",false);
    set("waitingForNumber",false);

    cy = makeGraph();
    

    // var commands2 = ["new","name:1","cxn:2,3,4,5",
    // "@2","cxn:@1,@3,@4,@5",
    // "@3","cxn:@1,@2,@4,@5",
    // "@4","cxn:@1,@2,@3,@5",
    // "@5","cxn:@1,@3,@4,@2"];
    commands2 = [
    "new",
    "name:DNA",
    "transcription:RNA",
    "@RNA",
    "translation:protein",
    "@protein",
    "post-translational modification:@protein",
    "metabolism:metabolites",
    "@metabolites",
    "regulation:@DNA,@RNA",
    "new",
    "name:histone",
    "regulation:@DNA",
    "new",
    "name:promoter",
    "up-regulates:@DNA",
    "new",
    "name:silencer",
    "down-regulates:@DNA",
    "new",
    "name:small interfering RNA (siRNA)",
    "down-regulates:@protein"
    ]
    var commands = [];

    for (var i in commands2){
      processCommand(commands2[i]);
    }

    forceLayout();
    // for (var i in commands){
    //   processCommand(commands[i]);
    // }
    px=40;
    temp = 1.5;


    // cy = populateGraph();
    
    cy = updateStyles(cy,[edgeLabelsOff,keyNodeLabelsCentered,internalKeyNodeLabelsCentered,arrowsOn]);
    
    addListeners([
      cyClickForNewObject,
      cyClickForId,
      cyShowEvents]);

    cy.on("click","node",clickToUpdateCurrJSON);
    // cy.on("click","node",highlightNode);
    // cy.on("click","node",highlightConnections);
    cy.on("click","node",clickForColoring);
    cy.edgehandles(handleOptions);
    cy.on("click",".attrNode",attrNodeExpand);

    cy.on("tapstart","",deleteInputElements);
    $(document).on("keydown",panGraph);
    $(document).on("keydown",setPressed);
    $(document).on("keyup",setUnpressed);


    $("body").on("click", ".inputNodeName", inputFocus);

    $("body").on("keydown", ".inputNodeName", processInputKeypress);

  });   


  //##########################################
  //                  GRAPH
  //##########################################
  Template.layout.onRendered(function(){
    Blaze.render(Template.menu,$("#main").get(0));
    $("#graphMenu").hide();

    // $("#graphMenuButton").click(function(){
    //   console.log("gmb clicked.");
    //   $("#graphMenu").toggle('slide', {direction:'right'}, 400);
    //   return false;
    // });

    $('#graphMenuButton').click(function () {
      if($('#graphMenuButton').is(':visible')){
        // $('#graphMenuButton').fadeOut(function () {
          $('#graphMenu').toggle('slide', {direction: 'left'}, 1000);
        // });
      }
      else{
        $('#graphMenu').toggle('slide', {
            direction: 'left'
        }, 1000);
      }
    });

    $('#attributeViewButton').click(function (evt) {
      cyAttributeView();
      attrForceLayout();
      evt.stopPropagation();

    });

    $('#connectionViewButton').click(function (evt) {
      cyConnectionView();
      connectionForceLayout();
      evt.stopPropagation();
      var d = 6;
    });
  });

  Template.menu.onRendered(function(){
    // $("#graphMenu").hide();

    // // $("#graphMenuButton").click(function(){
    // //   console.log("gmb clicked.");
    // //   $("#graphMenu").toggle('slide', {direction:'right'}, 400);
    // //   return false;
    // // });

    // $('#graphMenuButton').click(function () {
    //   if($('#graphMenuButton').is(':visible')){
    //     // $('#graphMenuButton').fadeOut(function () {
    //       $('#graphMenu').toggle('slide', {direction: 'left'}, 1000);
    //     // });
    //   }
    //   else{
    //     $('#graphMenu').toggle('slide', {
    //         direction: 'left'
    //     }, 1000);
    //   }
    // });

    // $('#attributeViewButton').click(function (evt) {
    //   cyAttributeView();
    //   attrForceLayout();
    //   evt.stopPropagation();

    // });

    // $('#connectionViewButton').click(function (evt) {
    //   cyConnectionView();
    //   connectionForceLayout();
    //   evt.stopPropagation();
    //   var d = 6;
    // });

  });
  
  Template.graph.helpers({
    "jsonText":function(){
      //Text rendering of current JSON
      // var t = Session.get("currJSON");
      // delete t["_id"];

      // return JSON.stringify(Objects.findOne(Session.get("currJSON")["_id"]),undefined, 2);
      var modJSON = filterKeys(Session.get("currJSON"),function(key){
        return (key.slice(0,1) != "_" && key != "id"); 
      },1);
      
      return JSON.stringify(modJSON,undefined, 2);
    },
    "jsonList":function(){
      var curr = get("currJSON");
      jsonList = [];
      for (var key in curr){
        jsonList.push([key,curr["key"]]);
      }
      console.log(jsonList);
      return jsonList;
    }
  });




  //##########################################
  //                  EDITOR
  //##########################################


  Template.editor.onRendered(function(){
    console.log("adding text to textbox");
    $("#commandTextarea").val(">>  ");
  });


  Template.editor.events({
    "blur":function(){
      Session.set("tempStack",[]);  
    },
    // 
    "keydown":function(e){
      console.log("Keydown");
      console.log(get("currJSON"));
      if(e.keyCode == 13) // ENTER
      {
        result = processCommand(currentCommand()); 
        var debugOutput = result[0];
        var promptOnNewLine = result[1];
        if(!empty(debugOutput)){
          print(debugOutput);
        }
        printPrompt();
        if(!empty(promptOnNewLine)){
          print(promptOnNewLine);
        }
        // Scroll editor to bottom
        var d = $('#commandTextarea');
        d.scrollTop(d.prop("scrollHeight"));
        
        //cy = refreshNodes();
        //cy.layout(get("updateView"));
        
        return false;


      }else if(e.keyCode==38){ // UP ARROW
        // Up arrow key
        // Pop previous commands off of stack
        var stack = Session.get("stack");
        var stackPointer = get("stackPointer");
        if(stackPointer < stack.length-1){
          stackPointer = stackPointer+1;
          set("stackPointer",stackPointer);
        }
        clearLine();
        var newCommand = stack[stackPointer];
        if(newCommand){
          print(stack[stackPointer]);
        }
        return false;

      }else if(e.keyCode==40){ //  DOWN ARROW
        // Up arrow key
        // Pop previous commands off of stack
        var stack = Session.get("stack");
        var stackPointer = get("stackPointer");
        if (stackPointer>-1){
          stackPointer = stackPointer-1;
          set("stackPointer",stackPointer);
        }
        
        clearLine();
        var newCommand = stack[stackPointer];
        if(newCommand){
          print(newCommand);
        }
        return false;
        
      }else if(e.keyCode == 8 || e.keyCode == 37){  // BACKSPACE and DELETE respectively
        commandText = $("#commandTextarea").val().split("\n");
        if (commandText[commandText.length-1] == ">>  "){
          return false;
        }
      }
      console.log(e.keyCode);
      return true;  // process other keys normalls
    }
  });
}
  