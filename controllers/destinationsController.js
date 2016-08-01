function createDestinations() {
  var query = $("#search-query").val()
  sortByRating = $('rate-sort').is(':checked')
  sortByPrice = $('price-sort').is(':checked')
  $('#details').empty();
  destinationsAdapter(query, sortByRating, sortByPrice)
}

function destinationsAdapter(query, sortByRating, sortByPrice) {
  var url = "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=" + query + "&key=AIzaSyD-ExUEzUVT9QOWcLBWJLbQ1ufnMC7g_PQ"
  $.ajax({
    method: "GET",
    url: url
  }).done((xml_results) => {
    var json_results = xmlToJson(xml_results)
    var results = json_results.PlaceSearchResponse.result
    if (typeof results === "object") {
      // If object has only one result, coerce into an
      // array so that it can be mapped in the next step.
      if (results.length === undefined) {
        results = [results]
      }
      // Convert the results into a list of destination objects
      var destinations = results.map((object) => {
        var name = object.name ? object.name["#text"] : ""
        var vicinity = object.formatted_address ? object.formatted_address["#text"] : ""
        var price = object.price_level ? object.price_level["#text"] : ""
        var rating = object.rating ? object.rating["#text"] : ""
        var placeID = object.place_id["#text"]
        var lat = object.geometry.location.lat["#text"]
        var lng = object.geometry.location.lng["#text"]
        return new Destination(name, vicinity, price, rating, placeID, lat, lng)
      })

      // Sorting by rating
      if (sortByRating) {
        destinations = Array.from(destinations).sort((a, b) => {
          if (a.rating > b.rating) {
            return -1
          } else if (a.rating < b.rating) {
            return 1
          } else {
            return 0
          }
        })
      }
      // Sorting by price
      if (sortByPrice) {
        destinations = Array.from(destinations).sort((a, b) => {
          if (a.price > b.price) {
            return 1
          } else if (a.price < b.price) {
            return -1
          } else {
            return 0
          }
        })
      }

      // Handlebars template code
      var src = $("#destinations-template").html()
      var template = Handlebars.compile(src)
      var newHTML = template(destinations)
      // Render the results
      $("#destinations").empty().append(newHTML)
      // Render the map
      createDestinationsMap(destinations)
    }  else {
      alert("Please enter a valid destination.")
    }
  })
}

function findDestination(element) {
  var destinationID = $(element).data("destination-id")
  var destination = store.destinations.find((destination) => destination.id === destinationID)
  showDetails(destination)
}

function showDetails(destination) {
  store.currentDestination = destination
  // this way is really unorthodox
  var url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${destination.placeID}&key=AIzaSyD-ExUEzUVT9QOWcLBWJLbQ1ufnMC7g_PQ`
  $.ajax({
    method: 'GET',
    url: url
  }).done((response) => {
    console.log(response);
    var result = response.result
    var destination = store.currentDestination
    destination.phoneNumber = result.formatted_phone_number
    destination.website = result.website
    var src = $("#details-template").html()
    var template = Handlebars.compile(src)
    var newHTML = template(destination)
    $("#details").empty().append(newHTML)
  })
}
