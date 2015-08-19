defaultFilter = function(key){
  return (key.slice(0,1) != "_" && key != "id"); 
}

inverseFilter = function(key){
  return (key.slice(0,8) != "inverse_"); 
}

formatObject = function(obj){
  return JSON.stringify(filterKeys(obj,defaultFilter));
}

filterKeys = function(json,elimFunc,top){
    // console.log("call to filter keys");
    // console.log(JSON.stringify(json));
    //return json;
    if (typeof(elimFunc)==='undefined') elimFunc = defaultFilter;
    if (typeof(top)==='undefined') top = 1;
    //return json;
    var ujson = {}

    for (var key in json){
      // console.log("In for loop!");
      // console.log(key);
      var val = json[key];
      if (["string","number","boolean"].indexOf(typeof val) > -1 && elimFunc(key) ){
        // console.log("content is primitive object");
        // console.log("setting "+key+" -> "+json[key]);
        ujson[key]=json[key];
      }else if(Array.isArray(val)  && elimFunc(key) ){
        // console.log("val is Array");
        var newa = [];
        for (var t in val){
          // console.log(val[t]);
          if (typeof val[t] == "string"  || typeof val[t] == "number" || typeof val[t] == "boolean"){
            // console.log("valt is prim");
            newa.push(val[t]);
            // console.log(val[t]);
          }else{
            // console.log("valt not prim");
            var nv = filterKeys(val[t],elimFunc,0)
            newa.push(nv);
            // console.log(nv);
          }
          // console.log("pushed to array");
          // console.log(nv);
        }
        ujson[key]=newa;
        if (newa.length == 1){
          ujson[key] = newa[0]
        }
        
      }else if (typeof val == "object" && elimFunc(key)) {
        var newv = filterKeys(val,elimFunc,0);
        ujson[key] = newv;
        // console.log("setting "+key+" -> "+newv);
      }else{
        // console.log("key doesn't meet criteria");
      }
    }
    if (Object.size(ujson) == 1 && top==0){
      for (var k in ujson){
        // console.log("ejson is one element.");
        // console.log("returning content of single element.");
        // console.log(ujson[k]);
        if (!Array.isArray(ujson[k])){
          return ujson[k];
        }
      }
    }
    // console.log("json is multiple elements.");
    // console.log(JSON.stringify(ujson));
    return ujson;
  }

  filterIds = function(key){    
    return (key.slice(0,1) != "_" && key != "id"); 
  }

var genGraph = function(){
  var filterK = function(key){
        return (key.slice(0,1) != "_" && key != "id" && key!="name"); 
      };

  var findPos = function(objs,id){
    for (i=0;i<objs.length;i++){
      if (objs[i]["id"] = id){
        return i;
      }
    }
  }
  var graph = {nodes:[],links:[]};
  var allObjs = Objects.find().fetch();
  allObjs.forEach(function(obj,i){

    graph["nodes"].push({"name":obj.name});
    for (var k in obj){

      if(filterK(k) && obj[k]["id"] != undefined){
        targetObj = obj[k];
        targetObjId = targetObj["id"];
        graph["links"].push({
          "source":i,
          "target":findPos(allObjs,targetObjId),
          "name":k
        });
      }
    }

  });
}
