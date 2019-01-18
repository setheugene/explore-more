var today = moment().format("YYYY-MM-DD");
var tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

$("#start-date").val(today);
$("#end-date").val(tomorrow);


$(document).ready(function() {
   
        
    var places = ["Denver", "New York", "Portland", "Washington DC", "Houston"]

    var random = places[Math.floor(Math.random() * places.length)];
    console.log(random);


    $("#spin").append(random);
    $("#spin").addClass("hidden");

var elements = document.querySelectorAll('#spin');

Array.prototype.forEach.call(elements, function (el) {
  const chaffle = new Chaffle(el, { /* options */ });
  spinb.addEventListener('click', function () {
    $("#spin").addClass("show");
    chaffle.init();
    
  });
});
})


// Array.prototype.forEach.call(elements, function (el) {
//   var chaffle = new Chaffle(el, { /* options */ });
//   chaffle.init();
// });