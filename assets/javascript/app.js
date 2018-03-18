var startLatitude;
var startLongitude;
var endLatitude;
var endLongitude;
var startAddress;
var endAddress;

var queryURLone =
  "https://api.uber.com/v1.2/estimates/time?start_latitude=" +
  startLatitude +
  "&start_longitude=" +
  startLongitude +
  "&end_latitude=" +
  endLatitude +
  "&end_longitude=" +
  endLongitude;

var queryURLtwo;
var queryURLthree;

var startAddressArray;
var endAddressArray;

var results;

$("#search-button").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  if ($("#address-input").val() !== "") {
    // This line will grab the text from the input box
    startAddress = $("#address-input")
      .val()
      .trim();
    $("#address-input").val("");

    $("#start-address-text").text("start address: " + startAddress);

    startAddressArray = startAddress.split("+");
    console.log(startAddressArray);
  }
  console.log(startAddress);
  getStartAddress();
});

$("#search-buttontwo").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  if ($("#address-inputtwo").val() !== "") {
    // This line will grab the text from the input box
    endAddress = $("#address-inputtwo")
      .val()
      .trim();
    $("#address-inputtwo").val("");

    $("#end-address-text").text("end address: " + endAddress);

    endAddressArray = endAddress.split("+");
    console.log(endAddressArray);
  }
  console.log(endAddress);
  getEndAddress();
});

function getStartAddress() {
  queryURLtwo =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
    startAddressArray +
    "&key=AIzaSyAmH6-actqHuSHWt5Kdvp6TzpMbdjcCirY";
  console.log();

  $.ajax({
    url: queryURLtwo,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.results;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      startLatitude = results[i].geometry.location.lat;
      console.log(startLatitude);
      startLongitude = results[i].geometry.location.lng;
      console.log(startLongitude);
    }
  });
}

function getEndAddress() {
  queryURLthree =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
    endAddressArray +
    "&key=AIzaSyAmH6-actqHuSHWt5Kdvp6TzpMbdjcCirY";

  $.ajax({
    url: queryURLthree,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.results;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      endLatitude = results[i].geometry.location.lat;
      console.log(endLatitude);
      endLongitude = results[i].geometry.location.lng;
      console.log(endLongitude);
    }
  });
}

function getUberTime() {
  queryURLone =
    "https://api.uber.com/v1.2/estimates/time?start_latitude=" +
    startLatitude +
    "&start_longitude=" +
    startLongitude +
    "&end_latitude=" +
    endLatitude +
    "&end_longitude=" +
    endLongitude;

  $.ajax({
    url: queryURLone,
    headers: {
      Authorization: "Token 7hStE0iarmRfSQDj_-N6JqKy0X0PhCus3jEh20e0"
    }
  })
    .then(function(res) {
      console.log(res);
      var results = res.times[1].estimate;
      console.log(results);
      var uberTime = (results / 60);
      $("#uber-time-text").text("uber wait time: " + uberTime + " minutes")
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getUberPrice() {
  queryURLone =
    "https://api.uber.com/v1.2/estimates/price?start_latitude=" +
    startLatitude +
    "&start_longitude=" +
    startLongitude +
    "&end_latitude=" +
    endLatitude +
    "&end_longitude=" +
    endLongitude;

  $.ajax({
    url: queryURLone,
    headers: {
      Authorization: "Token 7hStE0iarmRfSQDj_-N6JqKy0X0PhCus3jEh20e0"
    }
  })
    .then(function(res) {
      console.log(res);
      var results = res.prices[1].estimate;
      console.log(results);
      var uberPrice = (results);
      $("#uber-price-text").text("uber price: " + uberPrice)
    })
    .catch(function(err) {
      console.log(err);
    });
}

$("#uber-button").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  getUberTime();
  getUberPrice();
});

// queryURLtwo = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + startAddress + "&key=AIzaSyAmH6-actqHuSHWt5Kdvp6TzpMbdjcCirY"

// queryURLthree = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + endAddress + "&key=AIzaSyAmH6-actqHuSHWt5Kdvp6TzpMbdjcCirY"

// geocoding api key AIzaSyBtLe1BVWQqCpw0Wv4bW393RH5WZCqmuLI
