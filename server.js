

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Objects = new Mongo.Collection("objects");
    Objects.remove({});
    
  });

 //  var cytoscape = require('cytoscape');
	// var edgehandles = require('cytoscape-edgehandles');
	// var jquery = require('jquery');
 //  edgehandles( cytoscape, jquery ); // register extension
}
