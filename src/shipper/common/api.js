import {fetchAPI} from 'utils/api';

function saveProfile(body) {
  const url = `shipper/profile/update`;
  return fetchAPI(url, 'POST', body);
}

function fetchProfile() {
  const url = `shipper/profile`;
  return fetchAPI(url);
}
function fetchLocations() {
  const url = `shipper/locations`;
  return fetchAPI(url);
}

function fetchEmployees() {
  const url = `shipper/employees`;
  return fetchAPI(url);
}

function fetchLoadAdd() {
  const url = `shipper/loads/add/data`;
  return fetchAPI(url);
}

function saveEmployee(body) {
  const url = `shipper/employees`;
  return fetchAPI(url, 'POST', body);
}

function saveLocation(body) {
  const url = `shipper/locations`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  saveProfile,
  saveEmployee,
  saveLocation,
  fetchProfile,
  fetchEmployees,
  fetchLocations,
  fetchLoadAdd,
};
