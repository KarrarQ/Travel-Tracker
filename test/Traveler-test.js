import { expect } from 'chai';
import Traveler from '../src/Traveler';
import travelersData from '../src/Data/Traveler-data';
import allTripsData from '../src/Data/Trip-data';
import allDestinations from '../src/Data/Destinations-data';
import travlersTrips from '../src/Data/Travelers-Trips';

describe('Traveler', () => {
  let traveler, travelerTrips

  beforeEach(() => {
    traveler = new Traveler(travelersData[2], allTripsData, allDestinations);
    travelerTrips = travlersTrips
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should store the traveler\'s data', () => {
    expect(traveler.id).to.equal(3);
    expect(traveler.name).to.equal('Sibby Dawidowitsch');
    expect(traveler.type).to.equal('shopper');
  });

  it('should store all traveler\'s trips', () => {
    expect(traveler.trips).to.deep.equal(travelerTrips);
  });

  it('should calculate the amount a traveler spent in a year', () => {
    const travelerAmountSpent = traveler.calculateTotalSpent();
    expect(travelerAmountSpent).to.equal(5989.5);
  })
});