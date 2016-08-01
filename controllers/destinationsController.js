function createDestinations() {
  var query = $("#search-query").val()
  destinationsAdapter(query)
}

function destinationsAdapter(query) {
  var url = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=" + query + "&key=AIzaSyDEsYgk8H0XMACDf4Wk4SxW4P05UQkZmXY"
  $.ajax({
    method: "GET",
    url: url
  }).done((turtle) => {
    var object = xmlToJson(turtle)
    var objects = object.PlaceSearchResponse.result
    var destinations = objects.map((object) => {
      var name = object.name["#text"]
      var vicinity = object.formatted_address["#text"]
      var price = object.price_level["#text"]
      var rating = object.rating["#text"]
      var placeID = object.place_id["#text"]
      var lat = object.geometry.location.lat["#text"]
      var lng = object.geometry.location.lng["#text"]
      return new Destination(name, vicinity, price, rating, placeID, lat, lng)
    })
    var sortedByPrice = destinations.sort((a, b) => a.price - b.price)
    var sortedByRating = destinations.sort((a, b) => a.rating - b.rating)
    var src = $("#destinations-template").html()
    var template = Handlebars.compile(src)
    var newHTML = template(destinations)
    addMap(destinations)
    $("#destinations").empty().append(newHTML)
  })
}

function showDetails(element) {
  var destinationID = $(element).data("destination-id")
  var destination = store.destinations.find((destination) => destination.id === destinationID)
  store.currentDestination = destination
  // this way is really unorthodox
  var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${destination.placeID}&key=AIzaSyCfIm9SvYS95hI47ulG5GEMmWKtl9JenlE`
  $.ajax({
    method: 'GET',
    url: url
  }).done((response) => {
    var apple = response.result
    var destination = store.currentDestination
    destination.phoneNumber = apple.formatted_phone_number
    destination.website = apple.website
    var src = $("#details-template").html()
    var template = Handlebars.compile(src)
    var newHTML = template(destination)
    $("#details").empty().append(newHTML)
  })
}
