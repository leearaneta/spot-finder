const parkingSpotCreator = (() => {
  var counter = 0
  return ParkingSpot = class {
    constructor(name, vicinity, lat, lng, placeID, destination) {
      this.id = ++counter
      this.name = name
      this.vicinity = vicinity
      this.lat = lat
      this.lng = lng
      this.placeID = placeID
      this.destination = destination
      this.phoneNumber = undefined
      this.website = undefined
      store.parkingSpots.push(this)
      destination.parkingSpots.push(this)
    }
  }
})()
