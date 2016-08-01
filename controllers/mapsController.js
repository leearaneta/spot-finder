function addMap(destinations) {
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
    center: {lat: 40, lng: -74},
    zoom: 10
  })
  map.fitBounds(bounds)
  markers.forEach((marker) => marker.setMap(map))
}
