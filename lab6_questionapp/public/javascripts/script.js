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
	

	client.subscribe('/ask', function(message){
		$("#questions").append("<div class='question'><p class='naam'>" + message.naam + "</p><p class='vraag'>" + message.vraag + "</p></div>");
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
		$( ".question" ).click(function() {
 			// `this` is the DOM element that was clicked
  			var index = $( ".question" ).index( this );
 			 console.log("dit was vraag nr: " + index);
			});
		
	});

	client.subscribe('/allquestions', function(message){
		$("#questions").append("<div class='question'><p class='naam'>" + message.naam + "</p><p class='vraag'>" + message.vraag + "</p></div>");
		$('.question').css('display','none');
		$('.question').slideDown('slow');
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

	$('.question').on('click',function()
	{
		console.log('vraag');
	});
});	