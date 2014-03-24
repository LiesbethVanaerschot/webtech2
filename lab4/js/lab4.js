function weer(container)
{
	this.container = container;
	this.dag = this.container.find('#dag');
	this.maand = this.container.find('#maand');
	this.city = this.container.find('#city');
	this.icoon = this.container.find('#icoon');
	this.temperatuur = this.container.find('#temp');
	this.omschrijving = this.container.find('#omschr');
	this.min = this.container.find('#min');
	this.max = this.container.find('#max');
	this.zonsopkomst = this.container.find('#zonsopkomst');
	this.zonsondergang = this.container.find('#zonsondergang');

	this.start();

}

weer.prototype.start = function()
{
	this.dag.text(new Date().getDate()+1);
	var maand = new Date().getMonth()+1;
	switch(maand)
	{
		case 1:
			this.maand.text("januari");
			break;
		case 2:
			this.maand.text("februari");
			break;
		case 3:
			this.maand.text("maart");
			break;
		case 4:
			this.maand.text("april");
			break;
		case 5:
			this.maand.text("mei");
			break;
		case 6:
			this.maand.text("juni");
			break;
		case 7:
			this.maand.text("juli");
			break;
		case 8:
			this.maand.text("augustus");
			break;
		case 9:
			this.maand.text("september");
			break;
		case 10:
			this.maand.text("oktober");
			break;
		case 11:
			this.maand.text("november");
			break;
		case 12:
			this.maand.text("december");
			break;				
	}
	console.log("location");
	this.getLocation();
	/*var latitude = localStorage.getItem("latitude");
	var longitude = localStorage.getItem("longitude");
	var forecastData = localStorage.getItem("forecastData");

	if(latitude === null || longitude === null)
	{
		console.log("getlocation");
		this.getLocation();
	}
	else if(forecastData === null)
	{
		console.log("getForecast");
		this.getForecast();
	}
	else
	{
		var localData = JSON.parse(forecastData);
		var localDataTime = localData.currently.time;
		var currentTime = Math.round((new Date()).getTime()/1000);

		if(currentTime - localDataTime >= 3600)//wanneer tijd langer is dan 1u
		{
			this.getLocation();
		}
		else
		{
			this.setForecast();
		}
	}*/
}

weer.prototype.getLocation = function()
{
	
	var his = this;
	if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(showPosition,error);
		}
	
	function showPosition(position)
	{
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var city = his.reverseGeocoding(latitude,longitude);

		localStorage.setItem("latitude",latitude);
		localStorage.setItem("longitude",longitude);
		console.log("lat " + latitude + " lon " + longitude);
		his.getForecast();
	}	

	function error(error)
	{
		console.log("geolocation isn't supported in your browser!");
	}

}

weer.prototype.reverseGeocoding = function(latitude,longitude)
{
	var apiLatLng = "?latlng="+latitude+","+longitude+"";
	var apikey = "AIzaSyBGFKu20YhC4Cn_lfmJnpG4Yrx6Tn5wKBY";
	var urlLocation = "https://maps.googleapis.com/maps/api/geocode/json"+apiLatLng+"&sensor=true&key="+apikey+"";
	
	$.ajax(urlLocation, {dataType: "jsonp"})
			.done(function(data)
			{
				var city = data.results[2]['address_components'][0]['long_name'];
				localStorage.setItem("city",city);
				console.log(data);
			})
				
}

weer.prototype.getForecast = function()
{
	var his = this;
	var latitude = localStorage.getItem("latitude");
	var longitude = localStorage.getItem("longitude");
	console.log(latitude + " " + longitude);
	var apiKey = "9c576ebb4c7e72858d05e3bbee38479a";
	var url = "https://api.forecast.io/forecast/" + apiKey +"/" + latitude + "," + longitude;
	$.ajax(url, {
			dataType: "jsonp"})
			.done(function(data)
					{
						localStorage.setItem("forecastData",JSON.stringify(data));
						his.setForecast();
						console.log("succes");
					});
}	

weer.prototype.setForecast = function()	
{
	console.log("setForecast");
	var forecastData = localStorage.getItem("forecastData");
	var localData = JSON.parse(forecastData);
	console.log(localData);
	var latitude = localStorage.getItem("latitude");
	var longitude = localStorage.getItem("longitude");
	var city = localStorage.getItem("city");
	

	
	this.city.text(city);
	this.omschrijving.text(localData.daily.data[1].summary);
	this.min.text("MIN " + Math.round((localData.daily.data[1].temperatureMin - 32)/1.8) + " C°");
	this.max.text("MAX " + Math.round((localData.daily.data[1].temperatureMax - 32)/1.8) + " C°");
	var zonsopkomst = new Date((localData.daily.data[1].sunriseTime)*1000);
	var sr_hours = zonsopkomst.getHours();
	var sr_minutes = zonsopkomst.getMinutes();
	var sr_sec = zonsopkomst.getSeconds();
	this.zonsopkomst.text(sr_hours + ":" + sr_minutes + ":" + sr_sec);
	var zonsondergang = new Date((localData.daily.data[1].sunsetTime)*1000);
	var ss_hours = zonsondergang.getHours();
	var ss_minutes = zonsondergang.getMinutes();
	var ss_sec = zonsondergang.getSeconds();
	this.zonsondergang.text(ss_hours + ":" + ss_minutes + ":" + ss_sec);
	var his = this;
	var ico = localData.daily.data[1].icon;
	switch(ico)
	{
		case "clear-day":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/sun-xxl.png");
		break;

		case "clear-night":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/moon-xxl.png");
		break;

		case "partly-cloudy-day":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/partly-cloudy-day-xxl.png");
		break;

		case "partly-cloudy-night":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/partly-cloudy-night-xxl.png");
		break;

		case "cloudy":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/clouds-xxl.png");
		break;

		case "rain":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/rain-xxl.png");
		break;

		case "snow":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/snow-xxl.png");
		break;

		case "fog":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/fog-day-xxl.png");
		break;

		case "wind":
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/little-rain-xxl.png");
		break;

		default:
		return his.icoon.attr("src","http://www.iconsdb.com/icons/preview/black/clouds-xxl.png");
		break;
	}
	
}