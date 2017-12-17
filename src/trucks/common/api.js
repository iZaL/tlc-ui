import {fetchAPI} from 'utils/api';

function fetchTruckMakesModels() {
  const url = `trucks/makes`;
  return fetchAPI(url);
}

function fetchMyTruck() {
  const url = `trucks/get/self`;
  return fetchAPI(url);
}

function saveTruck(body) {
  const url = `trucks`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  fetchTruckMakesModels,
  fetchMyTruck,
  saveTruck,
};
