$(document).ready(function(){
	console.log("ready");

	var client = new Faye.Client('http://localhost:3000/faye/',
		{timeout: 20 });

	$('#error p').hide();

//MENU ACCORDION

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

	var accordion_large = $('.large-accordion > li > a');
	var accordion_inner = $('.large-accordion li > .accordion');

	accordion_large.on('click', function(e){
		e.preventDefault();
		console.log("click");

		if($(this).attr('class') != 'active'){
			accordion_inner.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			accordion_large.removeClass('active');
			$(this).addClass('active');
		}
	});

//HOE TE BESTELLEN

	$('.item').on('click', function(){

		$(this).parent().toggleClass('bestel');

	});	

	var getBestelling = function(){

		var bestelling = [];

		$(".bestel").each(function(index)
		{
			var naam = $(this).find('div:first-child').text();
			var prijs = $(this).find('div:nth-child(2)').text();
			var aantal = $(this).find('div:last-child input').val();
			bestelling.push({aantal: aantal, naam: naam, prijs: prijs});
			console.log(bestelling);
			
			
			//console.log(index + ":" + aantal + "" + naam + "" + prijs);
		});
		client.publish("/order", bestelling);
		/*var bestellingnaam = $('.bestel div:first-child').text();
		var bestellingprijs = $('.bestel div:nth-child(2)').text();
		var bestellingaantal = $('.bestel div:last-child input').val();
		console.log(bestellingaantal + " " + bestellingnaam + " " + bestellingprijs);*/
	}

	

	$('#bestel').on('click', function(){
		console.log('getbestelling');
		var items = $('.bestel div:first-child').text();
		var inputfield = $('.bestel input').val();
		console.log(items + ":" + inputfield);

		if(items === "")
		{
			console.log("bestelling niet correct!");
			$('#error p').text("Je kan niet niets bestellen!");
			$('#error p').slideDown();	

		}
		else
		{
		
			var allFilled = true;
			$(".bestel input").each(function(){
				return allFilled = allFilled && $(this).val();
			});
				if(!allFilled)
				{
					console.log('vergeet aantal niet');
					$('#error p').text("Vergeet de hoeveelheid niet!");
					$('#error p').slideDown();
					
				}
				else
				{
					getBestelling();
					$('#error p').hide();
				}
			
		}
		
		
	});

	var orderId = 0;
	var idArray = [];

	client.subscribe("/order",function(result){
		console.log(result);
		var ul = document.createElement('ul');
		ul.id = orderId;
		$('#orders').prepend(ul);
		//var aantal = 0;
		//var naam = " ";
		//var prijs = 0;
		var bestelling2 = [];
		$.each(result, function( index, value ) {
  			console.log(index + " " + value.naam);
  			aantal = value.aantal;
  			naam = value.naam;
  			prijs = value.prijs;
  			//console.log(aantal + "," + naam + "," + prijs);
  			var order = "<li><p>" + aantal + " </p><h4>" + naam + " </h4><p>" + prijs + "</p></li>";
  			console.log(order);	
  			bestelling2.push(order);
		});
		
		$.each(bestelling2, function(index, value){
			console.log(value);

			$("#orders ul:first").append(value);
			
		});

		$('#orders ul:first').append("<input type='button' value='print'/>")

		orderId++;
		idArray.push("order" + orderId);
	});

});
