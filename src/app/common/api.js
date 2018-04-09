import {fetchAPI} from 'utils/api';

function storePushToken(urlParams, body) {
  const url = `push_token/register${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

function fetchCountries(params = '') {
  const url = `countries${params}`;
  return fetchAPI(url);
}

function fetchSecurityPasses(params) {
  const url = `security_passes`;
  return fetchAPI(url);
}

export const API = {
  storePushToken,
  fetchCountries,
  fetchSecurityPasses
};
