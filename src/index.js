import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

function currentBreed(breeds) {
  breedSelect.style.display = 'none';
  loader.style.display = 'block';
  breeds.forEach(breed => {
    breedSelect.insertAdjacentHTML(
      'beforeend',
      `
      <option value="${breed.id}">${breed.name}</option>
    `
    );
  });
}

function createMarkup(catData) {
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
  createMarkup.innerHTML = '';
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      createMarkup(catData);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

fetchBreeds().then(breeds => {
  currentBreed(breeds);
  breedSelect.style.display = 'block';
  loader.style.display = 'none';
});
