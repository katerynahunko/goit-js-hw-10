import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_wQ559FTLzGDgBBCYV6EnESUx4U9vjoaKua9CwkEoH8mRlB753r1u2nGo27OVUGdm';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreeds() {
  return axios
    .get(BASE_URL)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      throw error;
    });
}
