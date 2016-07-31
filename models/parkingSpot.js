const parkingSpotCreator = (() => {
  var counter = 0
  return ParkingSpot = class {
    constructor(name, vicinity, lat, lng, destination) {
      this.id = ++counter
      this.name = name
      this.vicinity = vicinity
      this.lat = lat
      this.lng = lng
      this.destination = destination
      store.parkingSpots.push(this)
      destination.parkingSpots.push(this)
    }
  }
})()
