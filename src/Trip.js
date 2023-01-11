class Trip {
    constructor(allTripsData) {
      // console.log(allTripsData)
      this.id = allTripsData.id;
      this.userId = allTripsData.userID;
      this.destinationId = allTripsData.destinationID;
      this.travelers = allTripsData.travelers;
      this.date = allTripsData.date;
      this.duration = allTripsData.duration;
      this.status = allTripsData.status;
      this.suggestedActivities = [];
    }
  }
  
  export default Trip;