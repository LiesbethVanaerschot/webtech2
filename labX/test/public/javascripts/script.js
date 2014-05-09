$(document).ready(function(){
	console.log("ready");

	var client = new Faye.Client('http://localhost:3000/faye/',
		{timeout: 20 });

	$('#error p').hide();

	var orderId = 0;
	var idArray = [];
	var idArray_2 = [];

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
		//data variabelen
		orderId ++;
		idArray_2.push(orderId);

		//ajax call voor het saven in mongodb
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000',
			data: {_id: 'order_' + orderId, bestelling: bestelling},
			dataType: 'json',
			succes: function(data){
				console.log('success');
			}
		});
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
					console.log(idArray_2);
					$('#error p').hide();
					$('.bestel input').val("");
					$('.item').parent().removeClass('bestel');

				}
			
		}
		
		
	});

	client.subscribe("/order",function(result){
		//console.log(result);
		var ul = document.createElement('ul');
		ul.id = "order" + orderId;
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

		$('#orders ul:first').append("<input class='print' type='button' value='print'/>")

		orderId++;
		idArray.push("order" + orderId);
		console.log(idArray);
	});

//TIMER FUNCTIE START OP KLIK PRINT

	var timer = function(p_bestelling){
		console.log('hide');
		console.log(p_bestelling);
		p_bestelling.hide();
		//bestelling verplaatsen naar andere tabel
	}

	$('#orders').on('click', '.print', function(){
		console.log('print');
		console.log($(this).parent());
		var currentB = $(this).parent();
		//de bestelling verdwijnt uit van /order
		// currentB.hide();
		//timefunctie starten
		setTimeout(function() {timer(currentB);}, 2000);

	});

});




//twee tabbladen maken in /order
//1 recente orders, 2 alle orders
//recente bestelling op bestel in array time out 15 min * hoeveelste in array vanaf klik print
// print klik feedback naar / :  heel menu weg wel knop met terug naar menu
// na 15min moet oudste bestelling automatisch verhuizen naar de alle bestellingen tab.
