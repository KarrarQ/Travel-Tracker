import { getAllData } from './api-calls';
import Traveler from './Traveler';
import domUpdates from './dom-updates';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


const searchButton = document.getElementById('searchButton');
const acceptButton = document.getElementById('acceptButton');
const cancelButton = document.getElementById('cancelButton');
const estimatedCost = document.getElementById('estimatedCost');
const userInputForm = document.getElementById('userInputForm');
const backButton = document.getElementById('backButton');
const pendingTripsButton = document.getElementById('pendingTripsButton');
const allTripsButton = document.getElementById('allTripsButton');

let currentTraveler;
let allData;


window.addEventListener('load', displayData);
searchButton.addEventListener('click', checkForm);
acceptButton.addEventListener('click', acceptTripRequest);
cancelButton.addEventListener('click', renderForm);
backButton.addEventListener('click', renderForm);
pendingTripsButton.addEventListener('click', displayPendingTrips);
allTripsButton.addEventListener('click', displayAllTrips);


function displayData () {
    const randomUserNum = Math.floor(Math.random() * 50);
    console.log(randomUserNum)
    getAllData()
      .then(data => {
        allData = data;
        console.log('alldata', allData)
        intializeData(data, randomUserNum);
      });
  }

  const intializeData = (data, randomId) => {
    const traveler = new Traveler(data[0][randomId], data[2], data[3]);
    currentTraveler = traveler
    console.log('currentT',currentTraveler)
    domUpdates.renderTravelerTrips(traveler.trips);
    domUpdates.greetUser(traveler);
    domUpdates.displayAmountSpentYearly(traveler);
    domUpdates.addDestinationOptionsToDropdown(data[3])
  }

  function checkForm(event) {
    event.preventDefault();
    if (domUpdates.checkInputValidation()) {
        domUpdates.createNewTrip(allData, currentTraveler);
    }
  }

  function acceptTripRequest() {
    domUpdates.sendTripRequest(currentTraveler)
    domUpdates.renderTravelerTrips(currentTraveler.trips);
    domUpdates.hide(cancelButton);
    domUpdates.hide(acceptButton);
    domUpdates.display(backButton);
  }
  
  function renderForm() {
    domUpdates.hideResponse(estimatedCost, userInputForm)
    domUpdates.hide(acceptButton);
    domUpdates.hide(backButton);
    domUpdates.hide(cancelButton);
    domUpdates.display(userInputForm);
  }

  function displayPendingTrips() {
    domUpdates.changeToPendingTrips(currentTraveler);
  }
  
  function displayAllTrips() {
    domUpdates.renderTravelerTrips(currentTraveler.trips);
  }