$(document).ready(function(){
	console.log("ready");

	$(".koffiecat").on("click", function(){
		console.log("click");
		//$(this).find("ul").not(this).removeClass("inactive");
        //$(this).find("ul").addClass("active");
        var koffiecat = $(this).find("ul");
        $('.koffiecat ul').removeClass('active').addClass('inactive');
        koffiecat.addClass('active').removeClass('inactive');
    });

    if($('.koffiecat ul').hasClass('active'))
    {
    	$('.koffiecat ul').on('click',function(){
    		$(this).removeClass('active');
    		$(this).addClass('inactive');
    	});
    }

});
//proberen met slide up and down