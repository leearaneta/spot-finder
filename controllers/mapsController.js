function createDestinationsMap(destinations) {
  var markers = destinations.map(createMarker)
  createMapWithBounds(markers)
}

function createParkingSpotsMap(destination, parkingSpots) {
  var markers = parkingSpots.map(createMarker)
  var destinationMarker = new google.maps.Marker({
    position: {lat: parseFloat(destination.lat), lng: parseFloat(destination.lng)},
    title: destination.name,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  })
  markers.push(destinationMarker)
  createMapWithBounds(markers)
}

function createMarker(destination) {
  var lat = parseFloat(destination.lat)
  var lng = parseFloat(destination.lng)
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    title: destination.name,
    animation: google.maps.Animation.DROP
  })
  marker.addListener('click', () => {
    showDetails(destination)
  })
  return marker
}

function createMapWithBounds(markers) {
  var bounds = createBounds(markers)
  var map = createMap()
  map.fitBounds(bounds)
  markers.forEach((marker) => marker.setMap(map))
}

function createBounds(oranges) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < oranges.length; i++) {
    bounds.extend(oranges[i].getPosition());
  }
  return bounds
}

function createMap() {
  $("#map").empty
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 10
  })
  return map
}
