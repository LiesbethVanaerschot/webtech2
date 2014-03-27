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
				console.log(response);
				temp.text(Math.round((response.currently.temperature - 32)/1.8) + " C°");
				
				var ico = response.currently.icon;

				switch(ico)
				{
					case "clear-day":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/sun-xxl.png");
						break;
					case "clear-night":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/moon-xxl.png");
						break;
					case "rain":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/rain-xxl.png");
						break;
					case "snow":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/snow-xxl.png");
						break;
					case "sleet":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/sleet-xxl.png");
						break;
					case "fog":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/fog-day-xxl.png");
						break;
					case "cloudy":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/clouds-xxl.png");
						break;
					case "partly-cloudy-day":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/partly-cloudy-day-xxl.png");
						break;
					case "partly-cloudy-night":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/partly-cloudy-night-xxl.png");
						break;
					case "wind":
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/little-rain-xxl.png");
						break;	
					default:
						return icon.attr("src","http://www.iconsdb.com/icons/preview/white/clouds-xxl.png");
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