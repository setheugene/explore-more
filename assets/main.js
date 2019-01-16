var today = moment().format("YYYY-MM-DD");
var tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

$("#start-date").val(today);
$("#end-date").val(tomorrow);

