const destinationCreator = (() => {
  var counter = 0
  return Destination = class {
    constructor(name, vicinity, price, rating, placeID, lat, lng) {
      this.id = ++counter
      this.name = name
      this.vicinity = vicinity
      this.price = price
      this.rating = rating
      this.placeID = placeID
      this.lat = lat
      this.lng = lng
      this.parkingSpots = []
      this.phoneNumber = undefined
      this.website = undefined
      this.allowParkingLink = true
      store.destinations.push(this)
    }
  }
})()
