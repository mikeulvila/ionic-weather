angular.module('weather.controllers', [])

.controller('homeCtrl', function($http) {
  var home = this;
  var apiKey = 'e267054668bb5a89';
  var url = 'http://api.wunderground.com/api/' + apiKey + '/';
  
  // model to DOM
  home.temp = "--";
  home.summary = "Loading...";
  home.icon;
  home.city;
  home.state;
  home.search;

  // localStorage search history
  home.stationIds = [];

  // update variables to model to DOM
  function updateTemp(response) {
    console.log("updateTemp", response);
    home.temp = response.data.current_observation.temp_f;
    home.summary = response.data.current_observation.weather;
    home.icon = response.data.current_observation.icon_url;
    home.city = response.data.current_observation.display_location.city;
    home.state = response.data.current_observation.display_location.state;
    return response;
  };


  // api call using lat long coords
  home.apiCallLatLong = function (lat, long) {
    $http.get(url + 'conditions/forecast/q/' + lat + ',' + long + '.json')
    .then(updateTemp)
    .then(function (response) {
      console.log("save to LocalStorage", response);
      // get searchHistory key from localStorage
      var retrieveHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
      console.log("retrieveHistory", retrieveHistory);
      // setting city and state variables
      var city = response.data.current_observation.display_location.city;
      var state = response.data.current_observation.display_location.state;
      // set new key value to retrieveHistory object
      retrieveHistory[city+','+state] = response.data.current_observation.station_id;
      // set new array to localStorage
      localStorage.setItem("searchHistory", JSON.stringify(retrieveHistory));
    });
  }

  // api call using ip address
  $http.get(url+'conditions/forecast/q/autoip.json').then(updateTemp);

  // navigator.geolocation.getCurrentPosition(function (geopos) {
  //   var lat = geopos.coords.latitude;
  //   var long = geopos.coords.longitude;
  // 	home.apiCallLatLong(lat, long);
  // });

  // search function using google api to search zip or city and return lat long coords
  home.doSearch = function () {
    console.log("Search Dat Weather");
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.search)
    .then(function (response) {
      console.log("searchData", response);
      var lat = response.data.results[0].geometry.location.lat;
      var long = response.data.results[0].geometry.location.lng;
      home.apiCallLatLong(lat, long);
    });
  }

});