var today = moment();
var tomorrow = moment().add(1, "days");

$(document).ready(function () {

  var places = ["Denver", "New York", "Portland", "Washington DC", "Houston"]

  var random = places[Math.floor(Math.random() * places.length)];
  console.log(random);

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + random + "&cnt=5&units=imperial&APPID=166a433c57516f51dfab1f7edaed8413";

  $("#start-date").val(today.format("YYYY-MM-DD"));
  $("#end-date").val(tomorrow.format("YYYY-MM-DD"));

  $("#spin").append(random);
  $("#spin").addClass("hidden");

  $("#spin-btn").on("click", function () {
 
    $("#spin").addClass("show");
    $("#weather-table").empty();

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

  });
})


// Array.prototype.forEach.call(elements, function (el) {
//   var chaffle = new Chaffle(el, { /* options */ });
//   chaffle.init();
// });
