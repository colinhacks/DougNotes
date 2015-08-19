push = function(variable, val){
  var temp = Session.get(variable);
  temp.push(val);

  Session.set(variable,temp);
  return temp;
}
push = function(variable, key, val){
  console.log("push");
  var temp = Session.get(variable);
  temp[key]=val;
  Session.set(variable,temp);
  console.log("Modified session var "+variable);
  console.log(temp);
  return temp;
}
pop = function(variable, val){
  console.log("pop");
  var temp = Session.get(variable);
  temp.pop();
  Session.set(variable,temp);
  console.log("Modified session var "+variable);
  console.log(temp);
  return temp;
}
get = function(variable){
  var temp = Session.get(variable);
  return temp;
}
set = function(variable,val){
  if(variable == "currJSON"){
    set("prevJSON",get("currJSON"));
  }
  console.log("Set");
  Session.set(variable,val);
  Session.get(variable);
}
soa = function(object,key,value){
  //check if object has key
  //if yes, append value
  //otherwise create relation
}
  