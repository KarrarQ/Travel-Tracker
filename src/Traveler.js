import Trip from "./Trip";

class Traveler {
  constructor(travelersData, allTripsData, allDestinations) {
    this.id = travelersData.id;
    this.name = travelersData.name;
    this.type = travelersData.travelerType;
    this.trips = this.getAllTravelerTrips(allTripsData, allDestinations);
  }

  getAllTravelerTrips(allTripsData, allDestinations) {
    let trips = [];
    allTripsData.forEach(trip => {
      if (trip.userID === this.id) {
        const newTrip = new Trip(trip, allDestinations);
        trips.push(newTrip);
      }
    });
    return trips;
  }

  calculateTotalSpent()  {
    const thisYearTrips = this.trips.filter(trip => {
      if (new Date(trip.date).getFullYear() === 2021) {
        console.log(trip)
        return trip;
      }
    });
    const totalSpentInYear = thisYearTrips.reduce((total, trip) => {
      return total += trip.calculateTripCost();
    }, 0);
    return totalSpentInYear;
  }
}

export default Traveler;