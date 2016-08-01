function createDestinationsMap(destinations) {
  $("#map").empty
  var markers = destinations.map(function(destination) {
    var lat = parseFloat(destination.lat)
    var lng = parseFloat(destination.lng)
    return new google.maps.Marker({position: {lat: lat, lng: lng}, title: destination.name})
  })
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 10
  })
  map.fitBounds(bounds)
  markers.forEach((marker) => marker.setMap(map))
}

function createParkingSpotsMap(destination, parkingSpots) {
  $("#map").empty
  var markers = parkingSpots.map(function(parkingSpot) {
    var lat = parkingSpot.lat
    var lng = parkingSpot.lng
    return new google.maps.Marker({position: {lat: lat, lng: lng}, title: parkingSpot.name, icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'})
  })
  var destinationMarker = new google.maps.Marker({position: {lat: parseFloat(destination.lat), lng: parseFloat(destination.lng)}, title: destination.name})
  markers.push(destinationMarker)
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 10
  })
  map.fitBounds(bounds)
  markers.forEach((marker) => marker.setMap(map))
}
