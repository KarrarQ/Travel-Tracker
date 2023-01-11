import { expect } from 'chai';
import Trip from '../src/Trip';
import allTripsData from '../src/Data/Trip-data';
import allDestinations from '../src/Data/Destinations-data';

describe('Trip', () => {
  let trip;

  beforeEach(() => {
    trip = new Trip(allTripsData[0], allDestinations);
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should store trip data', () => {
    expect(trip.id).to.equal(1);
    expect(trip.userID).to.equal(44);
    expect(trip.destinationID).to.equal(49);
    expect(trip.travelers).to.equal(1);
    expect(trip.date).to.equal('2022/09/16');
    expect(trip.duration).to.equal(8);
    expect(trip.status).to.equal('approved');
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it('should calculate the lodging price for the trip', () => {
    let lodgingPrice = trip.calculateLodgingPrice();
    expect(lodgingPrice).to.equal(5200);
  });

  it('should calculate the flight cost for the trip', () => {
    let flightCost = trip.calculateFlightCost();
    expect(flightCost).to.equal(90);
  });

  it('should have a destination', () => {
    expect(trip.destination).to.deep.equal(allDestinations[2]);
  });
  
  it('should calculate the cost of the trip', () => {
    const cost = trip.calculateTripCost();
    expect(cost).to.equal(4761);
  });
});