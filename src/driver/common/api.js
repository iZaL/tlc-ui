import {fetchAPI} from 'utils/network';

function fetchProfile() {
  const path = `driver/profile`;
  return fetchAPI({path});
}

function fetchRoutes() {
  const path = `driver/routes`;
  return fetchAPI({path});
}

function fetchUpcomingTrips() {
  const path = `driver/trips/upcoming`;
  return fetchAPI({path});
}

function fetchRouteTransits(params) {
  const path = `driver/routes/${params.routeID}/transits`;
  return fetchAPI({path});
}

function fetchLoadDetails(params) {
  const path = `driver/loads/${params.loadID}/details`;
  return fetchAPI({path});
}

function fetchTripDetails(params = {}) {
  const path = `driver/trips/${params.tripID}/details`;
  return fetchAPI({path});
}

function fetchDocumentTypes(params = {}) {
  const path = `driver/documents/types`;
  return fetchAPI({path});
}

function fetchLoadsByStatus(status) {
  const path = `driver/loads/status/${status}`;
  return fetchAPI({path});
}

function fetchCurrentLoad() {
  const path = `driver/loads/current`;
  return fetchAPI({path});
}

function fetchSecurityPasses() {
  const path = `driver/security_passes`;
  return fetchAPI({path});
}

function setTripStatus(params) {
  const path = `driver/trips/${params.body.trip_id}/status/update`;

  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

function saveTruck(params) {
  const path = `driver/trucks`;

  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

function saveProfile(params) {
  const path = `driver/profile/update`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

function saveRoute(params) {
  const path = `driver/routes`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

export const API = {
  fetchProfile,
  fetchRoutes,
  fetchRouteTransits,
  fetchSecurityPasses,
  fetchUpcomingTrips,
  fetchTripDetails,
  fetchDocumentTypes,
  fetchLoadDetails,
  fetchLoadsByStatus,
  fetchCurrentLoad,
  saveProfile,
  saveRoute,
  saveTruck,
  setTripStatus,
};
