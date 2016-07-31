const destinationCreator = (() => {
  var counter = 0
  return Destination = class {
    constructor(name, vicinity, price, rating, lat, lng) {
      this.id = ++counter
      this.name = name
      this.vicinity = vicinity
      this.price = price
      this.rating = rating
      this.lat = lat
      this.lng = lng
      this.parkingSpots = []
      store.destinations.push(this)
    }
    static find(id) {
      store.destinations.find((destination) => destination.id === id)
    }
  }
})()
