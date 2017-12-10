import {API_URL} from 'utils/env';
import {fetchAPI} from 'utils/api';

function storePushToken(urlParams, body) {
  const url = `${API_URL}/push_token/register${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  storePushToken,
};
