import axios from 'axios';
axios.defaults.headers.common["x-api-key"] = "live_wQ559FTLzGDgBBCYV6EnESUx4U9vjoaKua9CwkEoH8mRlB753r1u2nGo27OVUGdm";
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

function fetchBreeds() {
    const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  
    return axios.get(BASE_URL)
      .then(response => response.data)
      .catch(error => {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        error.style.display = 'none';
      });
  }
  
  function fetchCatByBreed(breedId) {
    const BASE_URL = 'https://api.thecatapi.com/v1/images';
  
    return axios.get(`${BASE_URL}/search?breed_ids=${breedId}`)
      .then(response => response.data)
      .catch(error => {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        error.style.display = 'none';
      });
  }
  
function populateBreedsSelect(breeds) {
  breeds.forEach(breed => {
    breedSelect.insertAdjacentHTML('beforeend', `
      <option value="${breed.id}">${breed.name}</option>
    `);
  });
}

function updateCatInfo(catData) {
  catInfoDiv.innerHTML = `
   
  <img src="${catData[0].url}" alt="Cat Image" width=350>
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
  error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      updateCatInfo(catData);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

fetchBreeds()
  .then(breeds => {
    populateBreedsSelect(breeds);
  });


