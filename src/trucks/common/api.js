import {fetchAPI} from 'utils/network';

function fetchTruckMakesModels() {
  const path = `trucks/makes`;
  return fetchAPI({path});
}

function fetchTrailerMakes() {
  const path = `trailers/makes`;
  return fetchAPI({path});
}

function fetchTrailerTypes() {
  const path = `trailers/types`;
  return fetchAPI({path});
}

function fetchTrailers() {
  const path = `trailers`;
  return fetchAPI({path});
}

export const API = {
  fetchTruckMakesModels,
  fetchTrailerMakes,
  fetchTrailerTypes,
  fetchTrailers,
};
