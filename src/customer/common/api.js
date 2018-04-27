import {fetchAPI} from 'utils/api';

function saveProfile(body) {
  const url = `customer/profile/update`;
  return fetchAPI(url, 'POST', body);
}

function fetchProfile() {
  const url = `customer/profile`;
  return fetchAPI(url);
}

function fetchBlockedDrivers() {
  const url = `customer/drivers/blocked`;
  return fetchAPI(url);
}

function fetchDrivers() {
  const url = `customer/drivers`;
  return fetchAPI(url);
}

function fetchLocations() {
  const url = `customer/locations`;
  return fetchAPI(url);
}

function fetchEmployees() {
  const url = `customer/employees`;
  return fetchAPI(url);
}

function fetchLoadAdd() {
  const url = `customer/loads/add/data`;
  return fetchAPI(url);
}

function fetchLoadsByStatus(status) {
  const url = `customer/loads/status/${status}`;
  return fetchAPI(url);
}

function saveLoad(body) {
  const url = `customer/loads`;
  return fetchAPI(url, 'POST', body);
}

function saveEmployee(body) {
  const url = `customer/employees`;
  return fetchAPI(url, 'POST', body);
}

function saveLocation(body) {
  const url = `customer/locations`;
  return fetchAPI(url, 'POST', body);
}

function fetchLoadDrivers(params) {
  const url = `customer/loads/${params.loadID}/drivers/search`;
  return fetchAPI(url);
}

function fetchLoadDetails(params) {
  const url = `customer/loads/${params.loadID}/details`;
  return fetchAPI(url);
}

function fetchTripDetails(params = {}) {
  const url = `customer/trips/${params.tripID}/details`;
  return fetchAPI(url);
}

export const API = {
  saveProfile,
  saveEmployee,
  saveLocation,
  saveLoad,
  fetchProfile,
  fetchBlockedDrivers,
  fetchDrivers,
  fetchEmployees,
  fetchLocations,
  fetchLoadAdd,
  fetchLoadsByStatus,
  fetchLoadDrivers,
  fetchLoadDetails,
  fetchTripDetails
};
