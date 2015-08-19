  printPrompt = function(){
    var curr = $("#commandTextarea").val();
    $("#commandTextarea").val(curr+"\n>>  ")
  }
  print = function(text){
    var curr = $("#commandTextarea").val();
    $("#commandTextarea").val(curr+text);
  }
  output = function(text){
    var curr = $("#commandTextarea").val();
    $("#commandTextarea").val(curr+"\n\t"+text);
  }
  currentCommand = function(){
    var curr = $("#commandTextarea").val();
    var commands = curr.split("\n")
    console.log("current command");
    console.log(commands[commands.length-2]);
    console.log(commands[commands.length-1]);
    var command = commands[commands.length-1].slice(4).trim();
    return command;
  }
  clearLine = function(){
    var curr = $("#commandTextarea").val();
    var commands = curr.split("\n")
    var oldCommands = commands.slice(0,commands.length-1);
    if (oldCommands.length != 0){
      var oldText = oldCommands.join([separator="\n"])+"\n>>  ";
    }else{
        var oldText = ">>  ";
    }
    $("#commandTextarea").val(oldText);
  }