var startLatitude;
var startLongitude;
var endLatitude;
var endLongitude;

var startAddress;
var endAddress;

var destination;
var searchResults;
var queryURLone;
var queryURLtwo;
var queryURLthree;
var queryURLfive;
var startAddressArray;
var endAddressArray;

var results;

var originGDM;
var destinationGDM;

var startFormatAddress;
var placeName;

var queryURLsix;

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
// };

// function showPosition(position) {
//     startLatitude = position.coords.latitude;
//     startLongitude = position.coords.longitude;
//     console.log(startLatitude,startLongitude);
// }

// getLocation();

$("#search-button").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  if ($("#address-input").val() !== "") {
    // This line will grab the text from the input box
    startAddress = $("#address-input")
      .val()
      .trim();
    $("#address-input").val("");

    startAddressArray = startAddress.split("+");
    console.log(startAddressArray);
  }

  if ($("#destination-input").val() !== "") {
    // This line will grab the text from the input box
    destination = $("#destination-input")
      .val()
      .trim();
    $("#destination-input").val("");

    destinationArray = destination.split("+");
    console.log(destinationArray);
  }

  console.log(startAddress);
  getStartAddress();
  searchStuff();
});

function searchStuff() {
  queryURLtwo =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
    destinationArray +
    "&key=AIzaSyBf7PWp5QlvGwec0U64-7QpxiedRnAGvhc";
  console.log();

  $.ajax({
    url: queryURLtwo,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    searchResults = response.results;
    console.log(searchResults);
    for (var i = 0; i < searchResults.length; i++) {
      endLatitude = searchResults[i].geometry.location.lat;
      console.log(endLatitude);
      endLongitude = searchResults[i].geometry.location.lng;
      console.log(endLongitude);
      rating = searchResults[i].rating;
      console.log(rating);
    }

    for (var i = 0; i < searchResults.length; i++) {
      var resultDiv = $("<div class='result'></div>");
      resultDiv.addClass("col-md-12 text-center py-1");
      resultDiv.attr("id", searchResults[i].id);
      resultDiv.attr("latitude", searchResults[i].geometry.location.lat);
      resultDiv.attr("longitude", searchResults[i].geometry.location.lng);
      resultDiv.attr("destination", searchResults[i].formatted_address);
      resultDiv.attr("name", searchResults[i].name);
      var searchItem = $("<h4>");
      searchItem.text(searchResults[i].name);
      resultDiv.append(searchItem);
      $("#results").append(resultDiv);
    }
  });
}

function getStartAddress() {
  queryURLtwo =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
    startAddressArray +
    "&key=AIzaSyBf7PWp5QlvGwec0U64-7QpxiedRnAGvhc";

  $.ajax({
    url: queryURLtwo,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var results = response.results;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      startLatitude = results[i].geometry.location.lat;
      console.log(startLatitude);
      startLongitude = results[i].geometry.location.lng;
      console.log(startLongitude);
      startFormatAddress = results[i].formatted_address;
      console.log(startFormatAddress);
    }
  });
}



$(document).on("click", ".result", getUberPrice);
$(document).on("click", ".result", getUberTime);
$(document).on("click", ".result", doStuff);
$(document).on("click", ".result", googleDistance);
$(document).on("click", ".result", printName);
$(document).on("click", ".result", googlePhoto);

function doStuff() {
  console.log(startLatitude);
  console.log(startLongitude);
  console.log(endLatitude);
  console.log(endLongitude);
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

  // console.log(queryURLone);
  // if (!startLatitude || !startLongitude) {
  //   return false;
  // }
  $.ajax({
      url: queryURLone,
      headers: {
        Authorization: "Token 7hStE0iarmRfSQDj_-N6JqKy0X0PhCus3jEh20e0"
      }
    })
    .then(function (res) {
      console.log(res);
      var timeResultsX = res.times[1].estimate;
      var timeResultsXL = res.times[2].estimate;
      console.log(timeResultsX);
      console.log(timeResultsXL);
      var uberXTime = timeResultsX / 60;
      var uberXLTime = timeResultsXL / 60;
      var uberTimeTextX = "uberX: " + uberXTime + " minutes";
      var uberTimeTextXL = "uberXL: " + uberXLTime + " minutes";
      $("#uberX-time").text(uberTimeTextX);
      $("#uberXL-time").text(uberTimeTextXL);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getUberPrice() {
  var thisObject = this;
  endLatitude = $(this).attr("latitude");
  endLongitude = $(this).attr("longitude");

  queryURLone =
    "https://api.uber.com/v1.2/estimates/price?start_latitude=" +
    startLatitude +
    "&start_longitude=" +
    startLongitude +
    "&end_latitude=" +
    endLatitude +
    "&end_longitude=" +
    endLongitude;

  // if (!startLatitude || !startLongitude) {
  //   return false;
  // }
  $.ajax({
      url: queryURLone,
      headers: {
        Authorization: "Token 7hStE0iarmRfSQDj_-N6JqKy0X0PhCus3jEh20e0"
      }
    })
    .then(function (res) {
      console.log(res);
      var priceResultsX = res.prices[1].estimate;
      var priceResultsXL = res.prices[2].estimate;
      console.log(priceResultsX);
      console.log(priceResultsXL);
      var uberXPrice = priceResultsX;
      var uberXLPrice = priceResultsXL;
      var uberPriceTextX = "uberX price: " + uberXPrice;
      var uberPriceTextXL = "uberXL price: " + uberXLPrice;
      $("#uberX-price").text(uberPriceTextX);
      $("#uberXL-price").text(uberPriceTextXL);
    })
    .catch(function (err) {
      console.log(err);
    });
};

$("button").click(function () {
  $("#show-this").removeClass("hidden");
});

function googleDistance() {
  var thisObject = this;
  originGDM = startFormatAddress
  destinationGDM = $(this).attr("destination");
  console.log(originGDM);
  console.log(destinationGDM);

  var queryURLfive = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + originGDM + "&destinations=" + destinationGDM + "&key=AIzaSyD-Sv_bVy4ZZmL8FceAqFnBQL8ZbpWMFFo"
  console.log();

  $.ajax({
    url: queryURLfive,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var distance = response.rows[0].elements[0].distance;
    var distance_value = distance.value;
    var distance_text = distance.text;
    var duration = response.rows[0].elements[0].duration.text;
    var miles = distance_text.substring(0, distance_text.length - 3);
    $("#google-distance").text(distance_text);
    $("#google-time").text(duration);
  });
};

function printName() {
  var thisObject = this;
  placeName = $(this).attr("name");
  $("#bar-info").removeClass("hidden");
  $("#bar-name").text(placeName);
};


function googlePhoto() {
  var thisObject = this;
  endLatitude = $(this).attr("latitude");
  endLongitude = $(this).attr("longitude");

  $("#bar-photo").attr('src', "https://maps.googleapis.com/maps/api/streetview?&location=" + endLatitude + "," + endLongitude + "&size=500x500&key=AIzaSyAhLZTKkeTNine_zc-t6Mqj_rVwCQnHrKQ");

};

// "https://maps.googleapis.com/maps/api/streetview?&location=" + endLatitude + ", " + endLongitude + "&key=AIzaSyAhLZTKkeTNine_zc-t6Mqj_rVwCQnHrKQ"



// queryURLtwo = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + startAddress + "&key=AIzaSyAmH6-actqHuSHWt5Kdvp6TzpMbdjcCirY"

// queryURLthree = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + endAddress + "&key=AIzaSyAmH6-actqHuSHWt5Kdvp6TzpMbdjcCirY"

// geocoding api key AIzaSyBtLe1BVWQqCpw0Wv4bW393RH5WZCqmuLI

// google places api key for fosty29@gmail.com   AIzaSyBf7PWp5QlvGwec0U64-7QpxiedRnAGvhc
// google places api key for danieljfoster87@gmail.com AIzaSyCk-KNk6jGlajiWKSm2CwMv5QUq8e7a01Q
// AIzaSyD4VXFiAwwWf5h8cp27q1wlOhOEu6eOHPI
// google street view api key AIzaSyAhLZTKkeTNine_zc-t6Mqj_rVwCQnHrKQ