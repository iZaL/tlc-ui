import {API_URL} from 'common/env';
import {fetchAPI} from 'common/api';

function storePushToken(urlParams, body) {
  const url = `${API_URL}/push_token/register${urlParams}`;
  return fetchAPI(url, 'POST', body);
}

export const API = {
  storePushToken,
};
