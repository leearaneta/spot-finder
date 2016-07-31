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
    var destinations = object.PlaceSearchResponse.result
    var hi = destinations.map((destination) => {
      var name = destination.name["#text"]
      var vicinity = destination.formatted_address["#text"]
      var price = destination.price_level["#text"]
      var rating = destination.rating["#text"]
      var lat = destination.geometry.location.lat["#text"]
      var lng = destination.geometry.location.lng["#text"]
      return new Destination(name, vicinity, price, rating, lat, lng)
    })
    var src = $("#destinations-template").html()
    var template = Handlebars.compile(src)
    var newHTML = template(hi)
    $("#destinations").append(newHTML)
  })
}
