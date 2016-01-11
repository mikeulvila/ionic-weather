angular.module('weather.controllers', [])

.controller('homeCtrl', function($http) {
  var home = this;

  home.temp;
  home.summary;
  home.icon;

  navigator.geolocation.getCurrentPosition(function (geopos) {
  	var lat = geopos.coords.latitude;
  	var long = geopos.coords.longitude;
  	var apiKey = '0a240dea0feab43866d24f9adb42399a';
  	var url = '/api/forecast/' + apiKey + '/' + lat + ',' + long;

  	$http.get(url).then(function (res) {
  		console.log(res);
      home.temp = parseInt(res.data.currently.temperature);
      home.summary = res.data.currently.summary;
      home.icon = res.data.currently.icon;
  	})
  });

});