function addParkingSpots(element) {
  var destinationID = $(element).data("destination-id-apples")
  var destination = store.destinations.find((destination) => destination.id === destinationID)
  parkingSpotsAdapter(destination)
}

function parkingSpotsAdapter(destination) {
  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${destination.lat},${destination.lng}&radius=500&type=parking&key=AIzaSyD-ExUEzUVT9QOWcLBWJLbQ1ufnMC7g_PQ`
  $.ajax({
    method: 'GET',
    url: url
  }).done((response) => {
    var objects = response.results
    var parkingSpots = objects.map((object) => {
      var name = object.name
      var vicinity = object.vicinity
      var lat = object.geometry.location.lat
      var lng = object.geometry.location.lng
      var placeID = object.place_id
      return new ParkingSpot(name, vicinity, lat, lng, placeID, destination)
    })
    createParkingSpotsMap(destination, parkingSpots)
  })
}

function getDirections(element) {
  var parkingSpotID = $(element).data("parking-spot")
  var destinationID = $(element).data("destination")
  var url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${parkingSpotID}&destination=place_id:${destinationID}&mode=walking&key=AIzaSyD-ExUEzUVT9QOWcLBWJLbQ1ufnMC7g_PQ`
  $.ajax({
    method: 'GET',
    url: url
  }).done((response) => {
    var results = response.routes[0].legs[0]
    var steps = results.steps
    var src = $("#directions-template").html()
    var template = Handlebars.compile(src)
    var newHTML = template(steps)
    $("#directions").empty().append(newHTML)
    var headerSRC = $("#directions-header-template").html()
    var headerTemplate = Handlebars.compile(headerSRC)
    var headerNewHTML = headerTemplate({
      startAddress: results.start_address,
      endAddress: results.end_address,
      distance: results.distance.text,
      duration: results.duration.text
    })
    $("#directions-header").empty().append(headerNewHTML)
  })
}
