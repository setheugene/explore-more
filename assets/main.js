var today = moment();
var tomorrow = moment().add(1, "days");

$(document).ready(function () {

<<<<<<< HEAD
  // hiding the div at first
  $("#spin").addClass("hidden");

  // click handler so that nothing runs without it being clicked first
  $("#spin-btn").on("click", function () {

=======
>>>>>>> master
  var places = ["Denver", "Jacksonville", "Portland", "Kansas City", "Las Vegas"]

  var random = places[Math.floor(Math.random() * places.length)];
  console.log(random);

<<<<<<< HEAD
  // function to get the zomato city id code assigned to the randomly chosen city
=======
>>>>>>> master
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

<<<<<<< HEAD
=======
  // function to get the zomato city id code assigned to the randomly chosen city


>>>>>>> master
  var zomatoQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoPlace + "&entity_type=city&count=5&sort=rating";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + random + "&cnt=5&units=imperial&APPID=166a433c57516f51dfab1f7edaed8413";

  $("#start-date").val(today.format("YYYY-MM-DD"));
  $("#end-date").val(tomorrow.format("YYYY-MM-DD"));
  $("#spin").text(random);
  
    $("#spin").addClass("show");
    $("#weather-table").empty();
    $("#food-table").empty();

    // Weather api call and displaying results to table
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

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
<<<<<<< HEAD
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
=======
          console.log(information);
>>>>>>> master
        }
    });
  });
})











// Array.prototype.forEach.call(elements, function (el) {
//   var chaffle = new Chaffle(el, { /* options */ });
//   chaffle.init();
// });
