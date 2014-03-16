// in vanila javascript kunnen we een functie "weer" aanmaken
// waarin alle variabelen van hieronder gedefinieerd kunnen worden
/*
function weer(container)
{
	
}
*/
$(document).ready(function(){
	console.log("ready");

	var dag = $("#dag");
	var maa = $("#maand");
	var ico = $("#icoon");
	var temp = $("#temp");
	var om = $("#omschr");
	var min = $("#min");
	var max = $("#max");
	var zop = $("#zonsopkomst");
	var zon = $("#zonsondergang");

	// dit kan in een functie gestoken worden weer.prototype.getcurrentdate
	dag.text(new Date().getDate()+1);
	var maand = new Date().getMonth()+1;

	switch(maand)
	{
		case 1:
			maa.text("januari");
			break;
		case 2:
			maa.text("februari");
			break;
		case 3:
			maa.text("maart");
			break;
		case 4:
			maa.text("april");
			break;
		case 5:
			maa.text("mei");
			break;
		case 6:
			maa.text("juni");
			break;
		case 7:
			maa.text("juli");
			break;
		case 8:
			maa.text("augustus");
			break;
		case 9:
			maa.text("september");
			break;
		case 10:
			maa.text("oktober");
			break;
		case 11:
			maa.text("november");
			break;
		case 12:
			maa.text("december");
			break;				
	}

	if (navigator.geolocation) {

		// Get the user's current position
		console.log("location");
		navigator.geolocation.getCurrentPosition(/*showPosition, */showWeather, errorFunction);

	}
	else 
	{
    alert('Geolocation is not supported in your browser');
	}

	/*function showPosition(position) 
	{
		//reverseGeocoding zie ander bestand voor 
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		$.ajax({
			url:"api.geonames.org/findNearbyPlaceName?lat=" + lat + "&lng=" + lng + "&username=liesbeth",
			dataType: "jsonp",
			cities: "cities1000",
			success: function
				});*/
	
	function showWeather(position)
	{	

		//dit is gelijk de getForecast
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		$.ajax({
			url:"https://api.forecast.io/forecast/9c576ebb4c7e72858d05e3bbee38479a/" + lat + "," + lng,
			dataType: "jsonp",	
			success: function(response){
				temp.text(Math.round((response.currently.temperature - 32)/1.8) + " C°");
				om.text(response.daily.data[1].summary);
				min.text("MIN " + Math.round((response.daily.data[1].temperatureMin - 32)/1.8) + " C°");
				max.text("MAX " + Math.round((response.daily.data[1].temperatureMax - 32)/1.8) + " C°");
				var sunrise = new Date((response.daily.data[1].sunriseTime)*1000);
				var sr_hours = sunrise.getHours();
				var sr_minutes = sunrise.getMinutes();
				var sr_sec = sunrise.getSeconds();
				zop.text(sr_hours + ":" + sr_minutes + ":" + sr_sec);
				var sunset = new Date((response.daily.data[1].sunsetTime)*1000);
				var ss_hours = sunset.getHours();
				var ss_minutes = sunset.getMinutes();
				var ss_sec = sunset.getSeconds();
				zon.text(ss_hours + ":" + ss_minutes + ":" + ss_sec);
			}
		})

		console.log('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);
	}

	function errorFunction()
	{
		location.text("Geocoder failed");
	}

			

	/*var location = document.getElementById("location");

		function showPosition(position)
		{
			console.log("location");
			console.log(position.coords.latitude);
			console.log(position.coords.longitude);
			alert("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
		}

		function getLocation()
			{
				console.log("location");
				navigator.geolocation.getCurrentPosition(showPosition);

				if(navigator.geolocation)
				{
					navigator.geolocation.getCurrentPosition(showPosition);
				}
				else
				{
					location.innerHTML = "doesn't work in this browser."
				}
			}*/

	

});	