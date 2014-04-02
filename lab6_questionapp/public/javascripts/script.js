$(document).ready(function(){
	console.log("ready");

	var client = new Faye.Client('http://localhost:3000/faye/',
		{timeout: 20 });


	//ipv gwn te appenden aan een div pushen in een array en deze dan uitlussen?
	//on click published ge de vragen (naam en vraag eerst mss in var)
	//error handling?
	//var vragen = [];
	//client.subscribe(/ask, function(message)){}
	//vragen.push(<li><p>naam</p><br/><p>vraag</p></li>)
	//each van jade testen anders toch aan div appenden.
	//ul
   //each question in questions
     //li #{question.text} 
	//dit ook doen voor de /allquestions
	//dan css click scalable.
	$('#error').css('display','none');
	
	var vraagId = 0;
	var idArray = [];

	client.subscribe('/ask', function(message){
		$("#questions").append("<div class='question' id='vraag" + vraagId + "'><p class='naam'>" + message.naam + "</p><p class='vraag'>" + message.vraag + "</p></div>");
		$('.question').css('display','none');
		$('.question').slideDown('slow');
		//css animation maken class adde aan nieuwste element :last
		//div element in var steken
		//var appenden
		//var add class met animation
		//of checken of classe al bestaat als da ni zo is toevoegen 
		//array maken van alle message objecten.
		// var vragen = [];
		// vragen.push({"naam" : message.naam, "vraag" : message.vraag});
		//klik op vraag detecteren welke index dit heeft en dit publishen.
		vraagId++;
		idArray.push("vraag" + vraagId);
		
	});

	

	$('#throw').on('click',function()
	{
		var vraag = $('#vraag').val();
		var naam = $('#naam').val();
		console.log(vraag + naam);

		if(vraag !="" && naam != "")
		{
			client.publish("/ask", {naam: naam, vraag: vraag});
		}
		else
		{
			$('#error').css('display','block');
			$('#error').text('Please fill in both your name and question.');
		}
	});

	/*if($(".question").length)
	{

		console.log("question exists!");
	$( ".question" ).on("click", function() {
 			// `this` is the DOM element that was clicked
  			//var index = $( ".question" ).index( this );
 			 //console.log("dit was vraag nr: " + index);
 	alert("vraag?");
	});
	}*/

	client.subscribe("/allquestions",function(vote){
		//if index die binnenkomt index.index === $(".question").index(this);
		//scaling in css 
		console.log(vote.index);
		$.each($(".question"), function(key,value){
			var gesteldeVraag = $(this)[0].id;
			if(gesteldeVraag === vote.index)
			{
				var gestemdeVraag = $("#" + vote.index);
				var fontSize = gestemdeVraag.css("font-size");
				var fontNumber = parseInt(fontSize, 10);
				gestemdeVraag.animate({height: gestemdeVraag.height() * 1.15, 
									   width: gestemdeVraag.width() * 1.05,
									   fontSize: gestemdeVraag.css("fontSize", (fontNumber * 0.07) + "rem")}, 500);
				//gestemdeVraag.animate({width: gestemdeVraag.width() * 1.05}, 500, {queue: false} );
			}
		});
	});

	$("#questions").on("click",".question",function(event){
		//var index = $(".question").index(this);
		var index = $(this)[0].id;
		console.log("dit was " + index);
		

		client.publish("/allquestions",{index: index});

	});
});	