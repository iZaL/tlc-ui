import {fetchAPI} from 'utils/network';

function storePushToken(params) {
  const path = `push_token/register`;
  return fetchAPI({path, method: 'POST', params});
}

function fetchCountries() {
  const path = `countries`;
  return fetchAPI({path});
}

function fetchSecurityPasses() {
  const path = `security_passes`;
  return fetchAPI({path});
}

export const API = {
  storePushToken,
  fetchCountries,
  fetchSecurityPasses,
};
