import {fetchAPI} from 'utils/api';

function saveProfile(body) {
  const url = `driver/profile/update`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  saveProfile
};
