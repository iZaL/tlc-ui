import {fetchAPI} from 'utils/api';

function saveProfile(body) {
  const url = `driver/profile/update`;
  return fetchAPI(url, 'POST', body);
}

function saveRoute(body) {
  const url = `driver/routes`;
  return fetchAPI(url, 'POST', body);
}

function fetchProfile() {
  const url = `driver/profile`;
  return fetchAPI(url);
}

function fetchRoutes() {
  const url = `driver/routes`;
  return fetchAPI(url);
}

function saveTruck(body) {
  const url = `driver/trucks`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  saveProfile,
  fetchProfile,
  fetchRoutes,
  saveRoute,
  saveTruck,
};
