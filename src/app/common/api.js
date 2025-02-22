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

function uploadImages(params) {
  const path = `uploads/images`;
  return fetchAPI({path, method: 'POST', params});
}

function saveUploads(params) {
  const path = `uploads/sync`;
  return fetchAPI({path, method: 'POST', params});
}

export const API = {
  storePushToken,
  uploadImages,
  saveUploads,
  fetchCountries,
  fetchSecurityPasses,
};
