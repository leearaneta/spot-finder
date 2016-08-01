function addParkingSpots(element) {
  var destinationID = $(element).data("destination-id-apples")
  var destination = store.destinations.find((destination) => destination.id === destinationID)
  parkingSpotsAdapter(destination)
}

function parkingSpotsAdapter(destination) {
  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${destination.lat},${destination.lng}&radius=500&type=parking&key=AIzaSyA4X16Aq4qYw7WrqcvZGzdKgeeL26E5irc`
  $.ajax({
    method: 'GET',
    url: url
  }).done((response) => {
    var parkingSpots = response.results
    var hi = parkingSpots.map((parkingSpot) => {
      var name = parkingSpot.name
      var vicinity = parkingSpot.vicinity
      var lat = parkingSpot.geometry.location.lat
      var lng = parkingSpot.geometry.location.lng
      return new ParkingSpot(name, vicinity, lat, lng, destination)
    })
    var src = $('#parking-spots-template').html()
    var template = Handlebars.compile(src)
    var newHTML = template(hi)
    $("#parking-spots").empty().append(newHTML)
  })
}
