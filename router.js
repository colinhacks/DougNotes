// Router.configure({
//   // the default layout
//   layoutTemplate: 'layout'
// });


Router.route('/', function () {
	if (Meteor.user()) {
		console.log("user");
		this.layout("layout");
		this.render('graph', {to: 'graph'});
		this.render('editor', {to: 'editor'});
		this.render('menu', {to: 'menu'});
	}else{
		console.log("nouser");
		this.layout("home");
		this.render('register', {to: 'register'});
		this.render('login', {to: 'login'});
	}
});		


