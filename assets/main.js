var today = moment();
var tomorrow = moment().add(1, "days");

var map;

function initializeMap(city) {
  $("#map").empty();

  // Initialize the Platform object for maps
  var platform = new H.service.Platform({
    'app_id': 'Ck0H4ECXsoZw2kJ1JNpK',
    'app_code': 'V7OoN7FBZLHPyoQ-8Uh9uQ',
    useHTTPS: true
  });

  var pixelRatio = window.devicePixelRatio || 1;
  var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
  });

  // Initialize map
  map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map, { pixelRatio: pixelRatio });

  // Make the map interactive
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Create the parameters for the geocoding request:
  var geocodingParams = {
    searchText: city
  };

  // Define a callback function to process the geocoding response:
  var onResult = function (result) {
    var locations = result.Response.View[0].Result,
      position,
      marker;

    position = {
      lat: locations[0].Location.DisplayPosition.Latitude,
      lng: locations[0].Location.DisplayPosition.Longitude
    };

    moveMap(map, position.lat, position.lng);
  };

  // Get an instance of the geocoding service:
  var geocoder = platform.getGeocodingService();

  geocoder.geocode(geocodingParams, onResult, function (e) {
    alert(e);
  });
}

function moveMap(map, lat, lng) {
  map.setCenter({ lat: lat, lng: lng });
  map.setZoom(12);
}

$(document).ready(function () {

  // hiding the div at first
  $("#spin").addClass("hidden");

  
 
  // click handler so that nothing runs without it being clicked first
  $("#spinbtn").on("click", function () {

    AOS.init();
    $("#spin").empty();
    var places = ["Denver", "Jacksonville", "Portland", "Kansas City", "Las Vegas"]

    var random = places[Math.floor(Math.random() * places.length)];
    console.log(random);

    // function to get the zomato city id code assigned to the randomly chosen city
    function placeChosen() {
      if (random === "Denver") {
        return "305";
      } else if (random === "Jacksonville") {
        return "574";
      } else if (random === "Portland") {
        return "286";
      } else if (random === "Kansas City") {
        return "856";
      } else if (random === "Las Vegas") {
        return "282";
      }
    };

    // zomato ajax elements
    var zomatoKey = "af0b75e10ec2c9e797c35598e8fc0207";
    var zomatoPlace = placeChosen();
    console.log(zomatoPlace);

    var zomatoQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoPlace + "&entity_type=city&count=5&sort=rating";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + random + "&cnt=5&units=imperial&APPID=166a433c57516f51dfab1f7edaed8413";

    initializeMap(random);

    $("#start-date").val(today.format("YYYY-MM-DD"));
    $("#end-date").val(tomorrow.format("YYYY-MM-DD"));

    $("#spin").append(random);
    $("#spin").addClass("show");

    console.log($("#weather-table").html());

    $("#weather-table").empty();
    $("#food-table").empty();
    

//     var elements = document.querySelectorAll('#spin');

// Array.prototype.forEach.call(elements, function (el) {
//   const chaffle = new Chaffle(el, { /* options */ });

  
//     $("#spin").addClass("show");
//     chaffle.init();
    
  
// });

    // Weather api call and displaying results to table
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
console.log("response list", response.list);
      response.list.forEach(function (day) {
        var newRow = $("<tr>");
        newRow.append([
          $("<td>").append(moment.unix(day.dt.toString()).format("M/D")),
          $("<td>").append(parseInt(day.temp.day) + "°F"),
          $("<td>").append(day.weather[0].main),
        ]);
        $("#weather-table").append(newRow);
      })
    });

    // zomato api call and dispalying results to table
    console.log(zomatoQueryURL);
    $.ajax({
      url: zomatoQueryURL,
      method: "GET",
      headers: {
        'user-key': zomatoKey
      },
    }).then(function(response) {
      console.log(response);
      // function to pull the proper info from the array
        for (i = 0; i < response.restaurants.length; i++) {
          var information = {
              name: response.restaurants[i].restaurant.name, 
              rating: response.restaurants[i].restaurant.user_rating.aggregate_rating, 
              type: response.restaurants[i].restaurant.cuisines,
              link: response.restaurants[i].restaurant.events_url,
            };
          console.log(information.name);
          console.log(information.rating);
          console.log(information.type);
          console.log(information.link);

          var foodRow = $("<tr>");
          foodRow.append([
            $("<td>").append(information.name),
            $("<td>").append(information.rating),
            $("<td>").append(information.type),
            $("<td>").append("<a href=" + information.link + " target=_blank>Zomato Page</a>"),
          ]);
          $("#food-table").append(foodRow);
        }
    });
  });
})


