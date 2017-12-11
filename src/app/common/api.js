import {API_URL} from 'utils/env';
import {fetchAPI} from 'utils/api';

function storePushToken(urlParams, body) {
  const url = `${API_URL}/push_token/register${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

function fetchCountries(params = '') {
  const url = `countries${params}`;
  return fetchAPI(url);
}

export const API = {
  storePushToken,
  fetchCountries
};
