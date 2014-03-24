function Weather(currently, daily)
{
    this.currently = currently
    this.daily = daily;

    this.temperature = this.currently.find('.curr-temp');
    this.icon = this.currently.find('.curr-icon');
    this.hour = this.currently.find('.curr-hour');
    this.city = this.currently.find('.curr-city');

    this.init();
}

Weather.prototype.init = function() 
{
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var forecastData = localStorage.getItem("forecastData");

    if(latitude === null || longitude === null)
    {
        this.getLocation();
    }
    else if(forecastData === null)
    {
        this.getForecast();
    }
    else
    {
        var localData = JSON.parse(forecastData);
        var localDataTime = localData.currently.time;
        var currentTime = Math.round((new Date()).getTime() / 1000);

        if(currentTime-localDataTime >= 3600) // local data older than 1 hour, get new data
        {
            this.getLocation();
        }
        else // use current data
        {
            this.setForecast();
        }
    }
}

Weather.prototype.getLocation = function() 
{
    var _this = this;

    function successHandler(position) 
    {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        var city = _this.reverseGeocoding(latitude, longitude);

        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);

        _this.getForecast();
    }

    function errorHandler(error) 
    {
        console.log('ERROR('+error.code+'): ' + error.message);
    }

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
}

Weather.prototype.reverseGeocoding = function(lat, lng) 
{
    var latitude  = lat;
    var longitude = lng;
    var apiLatLng = "?latlng="+latitude+","+longitude+""; // Required: latitude/longitude value
    var apiSensor = "&sensor=true"; // Required: device with location sensor
    var apiKey = "&key=AIzaSyDYbKJWhkBQ5Ykt6RJKC8e6DnQR0Pn2EPM"
    var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json"+apiLatLng+apiSensor+apiKey+"";

    $.ajax(apiUrl, {dataType: "json"})
        .done(function(data) 
        {
            var city = data.results[1].address_components[0].long_name;
            localStorage.setItem("city", city);
        })
        .fail(function() 
        {
            console.log("fail");
        });
}

Weather.prototype.getForecast = function() 
{
    var _this = this;
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var apiKey = "f3d97dc91a8745e48f568b059ce4e819";
    var apiOptions = "?units=si";
    var apiUrl = "https://api.forecast.io/forecast/"+apiKey+"/"+latitude+","+longitude+""+apiOptions+"";

    $.ajax(apiUrl, {dataType: "jsonp"})
        .done(function(data) 
        {
            localStorage.setItem("forecastData", JSON.stringify(data));
            _this.setForecast();
        })
        .fail(function() 
        {
            console.log("fail");
        });
}

Weather.prototype.setForecast = function() 
{
    var forecastData = localStorage.getItem("forecastData");
    var localData = JSON.parse(forecastData);

    /* Currently */
    var formattedTime = this.formatTime(localData.hourly.data[0].time);
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var city = localStorage.getItem("city");

    this.temperature.text(Math.round(localData.currently.temperature)+"°");
    this.icon.text(localData.currently.icon);
    this.hour.text(formattedTime);
    this.city.text(city);

    /* Daily */
    var daily = localData.daily.data;

    for(var i = 0; i < daily.length-4; i++) 
    {
        $('.days:eq(0)')
            .clone()
            .find('.daily-day').text(this.formatTime(localData.daily.data[i].time, true)).end()
            .find('.daily-icon').text(localData.daily.data[i].icon).end()
            .find('.daily-temp').text( Math.round(localData.daily.data[i].temperatureMax)+"°" ).end()
            .appendTo('.daily');
    }

    $('.days:eq(0)').hide();
}

Weather.prototype.formatTime = function(unixTimestamp, dayTxt) 
{
    var dt = new Date(unixTimestamp * 1000);
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var day = dt.toDateString().substr(0,3);

    if(hours < 10) 
    {
        hours = '0' + hours;
    }

    if(minutes < 10)
    {
        minutes = '0' + minutes;
    }

    if(dayTxt == true)
    {
        return day;
    }
    else
    {
        return hours + ":" + minutes; 
    }
}