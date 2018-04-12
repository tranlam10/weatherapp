$(document).ready(function() {
    var lat, long, tempC, tempF, city, forecast, image;
    var tempChange = true;

    if (navigator.geolocation) {
        var location = navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }

  function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    
    var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
    $.getJSON(api, function(data) { 
      city = data.name;
      $("#city").html(city);
      
      tempC = data.main.temp.toFixed(1);
      tempF = ((tempC*9/5)+32).toFixed(1);
      $("#temp").html(tempF + "°F");
      $("#temp").click(function() {
        if (tempChange === true) {
          $("#temp").html(tempC + "°C");
          tempChange = false;
        } else {
          $("#temp").html(tempF + "°F");
          tempChange = true;
        }
      });
      
      forecast = data.weather[0].main;
      $("#forecast").html(forecast);
      if (forecast == "Rain") {
        $("#background").css("background-image", 'url("https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f1d999049bc6e88add481b024f02ad89&auto=format&fit=crop&w=1050&q=80")');
      } if (forecast == "Clouds") {
        $("#background").css("background-image", 'url("https://images.unsplash.com/photo-1498707406720-1094aef934da?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=59c23766d83485d6ac911b42d2928e3c&auto=format&fit=crop&w=1191&q=80")')
      } if (forecast == "Snow") {
        $("#background").css("background-image", 'url("https://images.unsplash.com/photo-1482489603187-f0ae98f407a3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eda2481e5b5bb7fb452e45c5e27240fd&auto=format&fit=crop&w=1000&q=80")');
      } if (forecast == "Thunderstorm") {
        $("#background").css("background-image", 'url("https://images.unsplash.com/photo-1516490981167-dc990a242afe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9de9c16971a6d2914d31d8236e7a46d2&auto=format&fit=crop&w=1050&q=80")');
      }
      
      image = data.weather[0].icon;
      $("#pic").attr("src",image);
      
      
    });
  }
});