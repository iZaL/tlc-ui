import {fetchAPI} from 'utils/api';

function fetchTruckMakesModels() {
  const url = `trucks/makes`;
  return fetchAPI(url);
}

function fetchTrailerMakes() {
  const url = `trailers/makes`;
  return fetchAPI(url);
}

function fetchTrailers() {
  const url = `trailers`;
  return fetchAPI(url);
}

function saveTruck(body) {
  const url = `trucks`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  fetchTruckMakesModels,
  fetchTrailerMakes,
  fetchTrailers,
  saveTruck,
};
