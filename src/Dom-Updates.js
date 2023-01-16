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


const domUpdates = {
  renderTravelerTrips(traveler) {
    tripCardsContainer.innerHTML = '';
    traveler.trips.forEach(trip => {
      tripCardsContainer.innerHTML += `
      <article class="trip-card">
      <section class="destination-image-container">
        <img class="destination-image"src="${trip.destination.image}" alt="${trip.destination.alt}">
      </section>
      <section class="trip-info">
        <h4>${trip.destination.destination}</h4>
        <p>Date: ${trip.date}</p>
        <p>Travelers: ${trip.travelers}</p>
        <p>Duration: ${trip.duration}</p>
        <p>Cost: $${trip.calculateTripCost()}</p>
        <p>Status: ${trip.status}</p>
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
    totalSpent.innerText = `Total Amount Spent This Year: $${traveler.calculateTotalSpent()}`;
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

  displayCost(trip) {
    estimatedCost.innerText = `Trip Estimated Cost: $${trip.calculateTripCost()}`;
    this.hideResponse(userInputForm, userInputForm);
    this.display(estimatedCost);
    this.display(cancelButton);
    this.display(acceptButton);

  },

  sendTripRequest(traveler) {
    console.log(newTrip)
    postData('http://localhost:3001/api/v1/trips', newTrip);
    // traveler.trips.push(newTrip);
  },

  findDestination(destinations) {
    if (destinationDropdown.value !== '--Destination--') {
      return destinations.find(destination => {
        return destination.destination === destinationDropdown.value;
      })
    }
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
  }
}

export default domUpdates;