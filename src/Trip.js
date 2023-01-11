class Trip {
    constructor(allTripsData, allDestinations) {
      this.id = allTripsData.id;
      this.userID = allTripsData.userID;
      this.destinationID = allTripsData.destinationID;
      this.travelers = allTripsData.travelers;
      this.date = allTripsData.date;
      this.duration = allTripsData.duration;
      this.status = allTripsData.status;
      this.suggestedActivities = [];
      this.destination = allDestinations.find(destination => destination.id === this.destinationId);
  }

  calculateTripCost() {
    const lodgingPrice = this.duration * this.destination.estimatedLodgingCostPerDay;
    const flightCost = this.travelers * this.destination.estimatedFlightCostPerPerson;
    const PriceBeforeAgentFee = lodgingPrice + flightCost;
    const agentFee = PriceBeforeAgentFee * .10;
    const finalCost = PriceBeforeAgentFee - agentFee;
    return finalCost;
    }
    
  }
  
  export default Trip;