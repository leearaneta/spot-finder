function addDirections(element) {
  var parkingSpotID = $(element).data("parking-spot")
  var destinationID = $(element).data("destination")
  var url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${parkingSpotID}&destination=place_id:${destinationID}&mode=walking&key=AIzaSyD-ExUEzUVT9QOWcLBWJLbQ1ufnMC7g_PQ`
  $.ajax({
    method: 'GET',
    url: url
  }).done((response) => {
    var results = response.routes[0].legs[0]
    var steps = results.steps
    var startAddress = results.start_address
    var endAddress = results.end_address
    var distance = results.distance.text
    var duration = results.duration.text
    var directions = new Directions(steps, startAddress, endAddress, distance, duration)
    render('directions', directions.steps)
    render('directions-header', directions.header)
  })
}
