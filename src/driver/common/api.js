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

function fetchUpcomingTrips() {
  const url = `driver/trips/upcoming`;
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

function fetchTripDetails(id,params = {}) {
  const url = `driver/trips/${id}/details`;
  return fetchAPI(url);
}

function saveTruck(body) {
  const url = `driver/trucks`;
  return fetchAPI(url, 'POST', body);
}

function fetchLoadsByStatus(status) {
  const url = `driver/loads/status/${status}`;
  return fetchAPI(url);
}

export const API = {
  saveProfile,
  fetchProfile,
  fetchRoutes,
  saveRoute,
  saveTruck,
  fetchRouteTransits,
  fetchUpcomingTrips,
  fetchTripDetails,
  fetchLoadDetails,
  fetchLoadsByStatus,

};
