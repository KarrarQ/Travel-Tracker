import { getAllData } from './api-calls';
import Traveler from './Traveler';
import domUpdates from './dom-updates';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'



const searchButton = document.getElementById('searchButton');

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
    domUpdates.renderTravelerTrips(traveler);
    domUpdates.greetUser(traveler);
    domUpdates.displayAmountSpentYearly(traveler);
    domUpdates.addDestinationOptionsToDropdown(data[3])
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