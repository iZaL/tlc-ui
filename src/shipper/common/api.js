import {fetchAPI} from 'utils/api';

function saveProfile(body) {
  const url = `shipper/profile/update`;
  return fetchAPI(url, 'POST', body);
}

function fetchProfile() {
  const url = `shipper/profile`;
  return fetchAPI(url);
}

export const API = {
  saveProfile,
  fetchProfile,
};
