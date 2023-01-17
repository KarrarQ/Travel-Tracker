import Trip from './Trip';
import { postData } from './api-calls';

let newTrip;

const tripCardsContainer = document.getElementById('tripCardsContainer');
const userGreeting = document.getElementById('userGreeting');
const totalSpent = document.getElementById('totalSpent');
const destinationDropdown = document.getElementById('destinationDropdown');
const startDateInput = document.getElementById('startDate');
const tripDurationIput = document.getElementById('tripDuration');
const numOfTravelersInput = document.getElementById('numberOfTravelers');
const errorMessage = document.getElementById('errorMessage');
const estimatedCost = document.getElementById('estimatedCost');
const acceptButton = document.getElementById('acceptButton');
const cancelButton = document.getElementById('cancelButton');
const userInputForm = document.getElementById('userInputForm');
const noTripsMessage = document.getElementById('noTripsMessage')


const domUpdates = {
  renderTravelerTrips(trips) {
    tripCardsContainer.innerHTML = '';
    trips.forEach(trip => {
      tripCardsContainer.innerHTML += `
      <article class="trip-card">
      <section class="destination-image-container">
        <img class="destination-image"src="${trip.destination.image}" alt="${trip.destination.alt}">
      </section>
      <section class="trip-info">
        <div class="trip-destination">
          <h4>${trip.destination.destination}</h4>
        </div>
        <div class="trip-details">
          <p>Date: ${trip.date}</p>
          <p>Travelers: ${trip.travelers}</p>
          <p>Duration: ${trip.duration}</p>
          <p>Cost: $${this.formatNumber(trip.calculateTripCost())}</p>
          <p>Status: ${trip.status}</p>
        </div>
      </section>
    </article>`
    });
  },

  greetUser(traveler) {
    const names = traveler.name.split(' ');
    const firstName = names[0];
    userGreeting.innerText = `Welcome ${firstName}!`;
  },

  displayAmountSpentYearly(traveler) {
    totalSpent.innerText = `Total Amount Spent This Year: $${this.formatNumber(traveler.calculateTotalSpent())}`;
  },

  addDestinationOptionsToDropdown(destinations) {
    destinations.forEach(destination => {
      destinationDropdown.add(new Option(destination.destination, destination.destination));
    });
  },

  checkInputValidation() {
    if (!destinationDropdown.value || !tripDurationIput.value || !numOfTravelersInput.value || !startDateInput.value) {
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        this.hideResponse(errorMessage, userInputForm)
      }, 2000);
    } else if (!this.validateDate()) {
      errorMessage.innerText = 'Please Pick a Valid Date!'
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        this.hideResponse(errorMessage, userInputForm)
      }, 2000);
    } else if (!this.validateDestination()) {
      errorMessage.innerText = 'Please Pick a Destination'
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        this.hideResponse(errorMessage, userInputForm)
      }, 2000);
    } else {
      return true;
    }
  },

  validateDestination() {
    if (destinationDropdown.value !== '--Destination--') {
      return true;
    }
  },

  validateDate() {
    const todayDate = this.getTodaydate();
    const correctDate = this.fixInputDate();
    return correctDate >= todayDate;
  },

  getTodaydate() {
    const date = new Date().toISOString().slice(0, 10);
    const listOfDate = date.split('-');
    const correctionDate = (listOfDate[2] - 1).toString();
    listOfDate.splice(2, 1, correctionDate);
    const todayDate = listOfDate.join('/');
    return todayDate;
  },

  fixInputDate() {
    const initialDate = startDateInput.value.split('-');
    const correctDate = initialDate.join('/');
    return correctDate;
  },

  createNewTrip(data, traveler) {
    const destination = this.findDestination(data[3])
    let trip = {
      id: data[2].length + 1,
      userID: traveler.id,
      destinationID: destination.id,
      travelers: parseInt(numOfTravelersInput.value),
      date: domUpdates.fixInputDate(),
      duration: parseInt(tripDurationIput.value),
      status: 'pending',
      suggestedActivities: []
    }
    newTrip = new Trip(trip, data[3]);
    this.displayCost(newTrip);
  },

  findDestination(destinations) {
    if (destinationDropdown.value !== '--Destination--') {
      return destinations.find(destination => {
        return destination.destination === destinationDropdown.value;
      })
    }
  },

  displayCost(trip) {
    estimatedCost.innerText = `Trip Estimated Cost: $${trip.calculateTripCost()}`;
    this.hideResponse(userInputForm, userInputForm);
    this.display(estimatedCost);
    this.display(cancelButton);
    this.display(acceptButton);

  },

  sendTripRequest(traveler) {
    postData('http://localhost:3001/api/v1/trips', newTrip);
    traveler.trips.push(newTrip);
    estimatedCost.innerText = 'Your Trip Is Being Reviewed. Check Pending Trips.';
  },

  findDestination(destinations) {
    if (destinationDropdown.value !== '--Destination--') {
      return destinations.find(destination => {
        return destination.destination === destinationDropdown.value;
      })
    }
  },

  changeToPendingTrips(traveler) {
    const pendingTrips = traveler.trips.filter(trip => {
      return trip.status.includes('pending')
    });
    // console.log(pendingTrips)
    // if (pendingTrips.length) {
    this.renderTravelerTrips(pendingTrips);
    // } else {
    //   this.hide(tripCardsContainer)
    //   this.display(noTripsMessage);
    // }
  },  

  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  hideResponse(elem, form) {
    elem.classList.add('hidden');
    form.reset();
  },

  display(element) {
  element.classList.remove('hidden');
  },

  hide(element) {
  element.classList.add('hidden');
  },

  changeMainView() {
    tripCardsContainer.classList.add('on-login');
  }
}

export default domUpdates;