$(document).ready(function(){

	$("#geel").click(function(){

		$("#geel").addClass("geel_trans");
		$("#groen").addClass("groen_trans");
		$("#rood").addClass("rood_trans");

	});

	/*$("#wrapper").on("mouseover",function(){*/

		$(".box").addClass("spinner");
		$(".box div, .box img").addClass("slide_in");
		$(".box2").addClass("flapper");
	/*});

	$("#wrapper").on("mouseout",function(){

		$(".box").removeClass("spinner");
		$(".box p").removeClass("slide_in");
		$(".box2").removeClass("flapper");
	});*/

});
