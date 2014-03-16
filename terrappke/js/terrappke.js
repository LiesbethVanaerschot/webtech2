$(document).ready(function(){
	console.log("ready");

	var temp = $("#temp");
	var icon = $("#icon");

	if (navigator.geolocation) {

		// Get the user's current position
		console.log("location");
		navigator.geolocation.getCurrentPosition(/*showPosition, */showWeather, errorFunction);

	}
	else 
	{
    alert('Geolocation is not supported in your browser');
	}

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
				
				var ico = response.currently.icon;

				switch(ico)
				{
					case "clear-day":
						icon.attr
					break;
					case "clear-night":
					break;
					case "rain":
					break;
					case "snow":
					break;
					case "sleet":
					break;
					case "fog":
					break;
					case "cloudy":
					break;
					case "partly-cloudy-day":
					break;
					case "partly-cloudy-night":
					break;

				}
			}
		})

		console.log('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);
	}

	function errorFunction()
	{
		location.text("Geocoder failed");
	}

});	