const fetchErrorMessage = document.querySelector('#fetchErrorMessage');
const errorButton = document.querySelector('#errorButton');

const hideErrorMessage = () => {
  fetchErrorMessage.classList.add('hidden');
  errorButton.classList.add('hidden');
}

const connectionErr = (error, customMessage) => {
  fetchErrorMessage.innerText = customMessage || error.message;
  fetchErrorMessage.classList.remove('hidden');
  errorButton.classList.remove('hidden');
}

const checkStatus = (response, customMessage) => {
  if (!response.ok) {
    throw new Error(customMessage);
  }
}

errorButton.addEventListener('click', hideErrorMessage);

export {connectionErr, checkStatus};