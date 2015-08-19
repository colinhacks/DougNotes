if (Meteor.isClient){
	
	Template.graph.onRendered(function() {
		$("html").css("height",$(window).height());
		$("#graph").css("height",$("#graph").parent().innerHeight()-$("#editor").outerHeight());
		$("#graphRow").css("height",$("#graphRow").parent().innerHeight());
		$("#graphShower").css("width",$("#graphShower").parent().innerWidth()-$("#objectEditor").outerWidth());
		// $("#graphShower").css("overflow","scroll");
		$("#objectEditor").css("overflow","scroll");

		

	});
}