function getUber() {
  $.ajax({
    url:
      "https://api.uber.com/v1.2/estimates/time?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075",
    headers: { Authorization: "Token 7hStE0iarmRfSQDj_-N6JqKy0X0PhCus3jEh20e0" }
  })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    });
}

getUber();
