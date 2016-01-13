angular.module('weather.controllers', [])

.controller('homeCtrl', function($http) {
  var home = this;
  var apiKey = 'e267054668bb5a89';
  var url = 'http://api.wunderground.com/api/' + apiKey + '/';
  

  home.temp = "--";
  home.summary = "Loading...";
  home.icon;
  home.city;
  home.state;


  $http.get(url+'conditions/forecast/q/autoip.json').then(function (response) {
    console.log("autoip", response);
    home.temp = response.data.current_observation.temp_f;
    home.summary = response.data.current_observation.weather;
    home.icon = response.data.current_observation.icon_url;
    home.city = response.data.current_observation.display_location.city;
    home.state = response.data.current_observation.display_location.state;
  });

  navigator.geolocation.getCurrentPosition(function (geopos) {
    var lat = geopos.coords.latitude;
    var long = geopos.coords.longitude;

  	$http.get(url+'conditions/forecast/q/'+lat+','+long+'.json').then(function (response) {
  		console.log("lat+long", response);
      home.temp = response.data.current_observation.temp_f;
      home.summary = response.data.current_observation.weather;
      home.icon = response.data.current_observation.icon_url;
      home.city = response.data.current_observation.display_location.city;
      home.state = response.data.current_observation.display_location.state;
  	})
  });

});