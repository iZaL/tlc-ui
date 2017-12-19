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

export const API = {
  fetchTruckMakesModels,
  fetchTrailerMakes,
  fetchTrailers,
};
