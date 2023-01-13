import { getAllData } from './api-calls';
import Traveler from './Traveler';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


const tripCardsContainer = document.getElementById('tripCardsContainer');
const userGreeting = document.getElementById('userGreeting');
const totalSpent = document.getElementById('totalSpent')


window.addEventListener('load', displayData);


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
    totalSpent.innerText = `Total Amount Spent This Year: $${traveler.calculateTotalSpent()}`;
  }