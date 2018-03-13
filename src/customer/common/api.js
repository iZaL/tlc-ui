import {fetchAPI} from 'utils/api';

function saveProfile(body) {
  const url = `customer/profile/update`;
  return fetchAPI(url, 'POST', body);
}

function fetchProfile() {
  const url = `customer/profile`;
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

export const API = {
  saveProfile,
  saveEmployee,
  saveLocation,
  saveLoad,
  fetchProfile,
  fetchEmployees,
  fetchLocations,
  fetchLoadAdd,
  fetchLoadsByStatus,
};
