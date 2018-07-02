import {fetchAPI} from 'utils/network';

function fetchProfile() {
  const path = `customer/profile`;
  return fetchAPI({path});
}

function fetchCurrentLoad() {
  const path = `customer/loads/current`;
  return fetchAPI({path});
}

function fetchBlockedDrivers() {
  const path = `customer/drivers/blocked`;
  return fetchAPI({path});
}

function fetchDrivers() {
  const path = `customer/drivers`;
  return fetchAPI({path});
}

function fetchLocations() {
  const path = `customer/locations`;
  return fetchAPI({path});
}

function fetchEmployees() {
  const path = `customer/employees`;
  return fetchAPI({path});
}

function fetchLoadAdd() {
  const path = `customer/loads/add/data`;
  return fetchAPI({path});
}

function fetchLoadsByStatus(status) {
  const path = `customer/loads/status/${status}`;
  return fetchAPI({path});
}

function fetchLoadDetails(params) {
  const path = `customer/loads/${params.loadID}/details`;
  return fetchAPI({path});
}

function fetchTripDetails(params) {
  const path = `customer/trips/${params.tripID}/details`;
  return fetchAPI({path});
}

function fetchLoadDrivers(params) {
  const path = `customer/loads/${params.loadID}/drivers/search`;
  return fetchAPI({path});
}

function fetchLoadBookableDrivers(params) {
  const path = `customer/loads/${params.loadID}/drivers/bookable`;
  return fetchAPI({path});
}

function saveProfile(params) {
  const path = `customer/profile/update`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

function saveLoad(params) {
  const path = `customer/loads`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

function saveEmployee(params) {
  const path = `customer/employees`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

function saveAddress(params) {
  const path = `customer/addresses`;

  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return fetchAPI(requestParams);
}

export const API = {
  fetchProfile,
  fetchBlockedDrivers,
  fetchDrivers,
  fetchEmployees,
  fetchLocations,
  fetchLoadAdd,
  fetchLoadsByStatus,
  fetchLoadDrivers,
  fetchLoadBookableDrivers,
  fetchLoadDetails,
  fetchTripDetails,
  fetchCurrentLoad,
  saveProfile,
  saveEmployee,
  saveAddress,
  saveLoad,
};
