const directionsCreator = (() => {
  var counter = 0
  return Directions = class {
    constructor(steps, startAddress, endAddress, distance, duration) {
      this.steps = steps
      this.header = {
        startAddress: startAddress,
        endAddress: endAddress,
        distance: distance,
        duration: duration}
    }
  }
})()
