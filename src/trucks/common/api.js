import {fetchAPI} from 'utils/api';

function fetchTruckMakesModels() {
  const url = `trucks/makes`;
  return fetchAPI(url);
}

function fetchMyTruck() {
  const url = `trucks/get/self`;
  return fetchAPI(url);
}

export const API = {
  fetchTruckMakesModels,
  fetchMyTruck,
};
