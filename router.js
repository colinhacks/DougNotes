Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});


Router.route('/', function () {
	this.layout("layout");
	this.render('graph', {to: 'graph'});
	this.render('editor', {to: 'editor'});
});		


