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

function fetchLoadRequests() {
  const url = `driver/loads/requests`;
  return fetchAPI(url);
}

function fetchRouteTransits(params) {
  const url = `driver/routes/${params.route_id}/transits`;
  return fetchAPI(url);
}

function fetchLoadDetails(params) {
  const url = `driver/loads/${params.load_id}/details`;
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
  fetchRouteTransits,
  fetchLoadRequests,
  fetchLoadDetails,
};
