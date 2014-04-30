$(document).ready(function(){
	console.log("ready");

	/*$(".koffiecat").on("click", function(){
		console.log("click");
		//$(this).find("ul").not(this).removeClass("inactive");
        //$(this).find("ul").addClass("active");
        var koffiecat = $(this).find("ul");
        
        $('.koffiecat ul').not(this).removeClass('active').addClass('inactive');
        koffiecat.toggleClass('active inactive');
        
    });*/

	var accordion_mini = $('.miniaccordion > li > a');
	var accordion_mini_body = $('.miniaccordion li > .mini-sub');

	accordion_mini.on('click', function(e){
		e.preventDefault();
		if($(this).attr('class') != 'active'){
			accordion_mini_body.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			accordion_mini.removeClass('active');
			$(this).addClass('active');
		}
	});

	var accordion_head = $('.accordion > li > a');
	var accordion_body = $('.accordion li > .miniaccordion');

	accordion_head.on('click', function(e){
		e.preventDefault();
		if($(this).attr('class') != 'active'){
			accordion_body.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			accordion_head.removeClass('active');
			$(this).addClass('active');
		}
	});

});
//proberen met slide up and down