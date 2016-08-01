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
    var objects = response.results
    var parkingSpots = objects.map((object) => {
      var name = object.name
      var vicinity = object.vicinity
      var lat = object.geometry.location.lat
      var lng = object.geometry.location.lng
      return new ParkingSpot(name, vicinity, lat, lng, destination)
    })
    var src = $('#parking-spots-template').html()
    var template = Handlebars.compile(src)
    var newHTML = template(parkingSpots)
    $("#parking-spots").empty().append(newHTML)
    createParkingSpotsMap(destination, parkingSpots)
  })
}
