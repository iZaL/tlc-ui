import {fetchAPI} from 'utils/api';

function saveProfile(body) {
  const url = `driver/profile/update`;
  return fetchAPI(url, 'POST', body);
}

function fetchProfile() {
  const url = `driver/profile`;
  return fetchAPI(url);
}

export const API = {
  saveProfile,
  fetchProfile,
};
