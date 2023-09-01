import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_wQ559FTLzGDgBBCYV6EnESUx4U9vjoaKua9CwkEoH8mRlB753r1u2nGo27OVUGdm';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw error;
    });
}
