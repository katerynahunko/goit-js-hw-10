import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_wQ559FTLzGDgBBCYV6EnESUx4U9vjoaKua9CwkEoH8mRlB753r1u2nGo27OVUGdm';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api.js';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_wQ559FTLzGDgBBCYV6EnESUx4U9vjoaKua9CwkEoH8mRlB753r1u2nGo27OVUGdm';
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images';
  return axios
    .get(`${BASE_URL}/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function currentBreed(breeds) {
  breeds.forEach(breed => {
    breedSelect.insertAdjacentHTML(
      'beforeend',
      `
      <option value="${breed.id}">${breed.name}</option>
    `
    );
  });
}

function updateCatInfo(catData) {
  catInfoDiv.innerHTML = `
   
  <img src="${catData[0].url}" alt="Cat Image">
  <div>  
  <h2>${catData[0].breeds[0].name}</h2>
    <p>${catData[0].breeds[0].description}</p>
    <p>Temperament: ${catData[0].breeds[0].temperament}</p>
  </div>
        `;
}

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  catInfoDiv.innerHTML = '';
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      updateCatInfo(catData);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

fetchBreeds().then(breeds => {
  currentBreed(breeds);
});
