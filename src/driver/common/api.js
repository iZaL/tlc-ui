import {fetchAPI} from 'utils/network';

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
  const url = `driver/routes/${params.routeID}/transits`;
  return fetchAPI(url);
}

function fetchLoadDetails(params) {
  const url = `driver/loads/${params.loadID}/details`;
  return fetchAPI(url);
}

function fetchTripDetails(params = {}) {
  const url = `driver/trips/${params.tripID}/details`;
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

function fetchSecurityPasses(params) {
  const url = `driver/security_passes`;
  return fetchAPI(url);
}

export const API = {
  saveProfile,
  fetchProfile,
  fetchRoutes,
  saveRoute,
  saveTruck,
  fetchRouteTransits,
  fetchSecurityPasses,
  fetchUpcomingTrips,
  fetchTripDetails,
  fetchLoadDetails,
  fetchLoadsByStatus,
};
