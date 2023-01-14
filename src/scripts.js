import { getAllData } from './api-calls';
import Traveler from './Traveler';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


const tripCardsContainer = document.getElementById('tripCardsContainer');
const userGreeting = document.getElementById('userGreeting');
const totalSpent = document.getElementById('totalSpent')
const destinationDropdown = document.getElementById('destinationDropdown');
const startDateInput = document.getElementById('startDate');
const tripDurationIput = document.getElementById('tripDuration');
const numOfTravelersInput = document.getElementById('numberOfTravelers');
const errorMessage = document.getElementById('errorMessage');
const searchButton = document.getElementById('searchButton');
const userInputForm = document.getElementById('userInputForm');


window.addEventListener('load', displayData);
searchButton.addEventListener('click', checkForm);


function displayData () {
    const randomUserNum = Math.floor(Math.random() * 50);
    console.log(randomUserNum)
    getAllData()
      .then(data => {
        intializeData(data, randomUserNum);
      });
  }

  const intializeData = (data, randomId) => {
    const traveler = new Traveler(data[0][randomId], data[2], data[3]);
    renderTravelerTrips(traveler);
    greetUser(traveler);
    displayAmountSpentYearly(traveler);
    addDestinationOptionsToDropdown(data[3]);
  }

  const renderTravelerTrips = (traveler) => {
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
  }

  const greetUser = (traveler) => {
    const names = traveler.name.split(' ');
    const firstName = names[0];
    userGreeting.innerText = `Welcome ${firstName}!`;
  }

  const displayAmountSpentYearly = (traveler) => {
    totalSpent.innerText = `Total Amount Spent This Year: $${traveler.calculateTotalSpent()}`;
  }

  const addDestinationOptionsToDropdown = (destinations) => {
    destinations.forEach(destination => {
      destinationDropdown.add(new Option(destination.destination, destination.destination));
    })
  }

  function checkForm(event) {
    event.preventDefault();
    console.log(destinationDropdown.value);
    console.log(tripDurationIput.value);
    console.log(numOfTravelersInput.value);
    console.log(startDateInput.value);
    if (checkInputValidation()) {
      console.log('Wassup yo!')
    }
  }

  function checkInputValidation() {
    if (!destinationDropdown.value || !tripDurationIput.value || !numOfTravelersInput.value || !startDateInput.value) {
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        hideResponse(errorMessage, userInputForm)
      }, 2000);
    } else if (!validateDate()) {
      errorMessage.innerText = 'Please Pick a Valid Date!'
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        hideResponse(errorMessage, userInputForm)
      }, 2000);
    } else {
      return true;
    }
  }
  
  const getTodaydate = () => {
    const date = new Date().toISOString().slice(0, 10);
    const listOfDate = date.split('-');
    const correctionDate = (listOfDate[2] - 1).toString();
    listOfDate.splice(2, 1, correctionDate);
    const todayDate = listOfDate.join('/');
    return todayDate;
  }
  
  const fixInputDate = () => {
    const initialDate = startDateInput.value.split('-');
    const correctDate = initialDate.join('/');
    return correctDate;
  }
  
  const validateDate = () => {
    const todayDate = getTodaydate();
    const correctDate = fixInputDate();
    return correctDate >= todayDate;
  }
  
  const hideResponse = (elem, form) => {
    elem.classList.add('hidden');
    form.reset();
  }