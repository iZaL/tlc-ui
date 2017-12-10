import {API_URL} from 'utils/env';
import I18n from 'utils/locale';
import {getStorageItem} from "utils/functions";
import {AUTH_STORAGE_KEY} from "utils/env";

export function fetchAPI(url, method = 'GET', body = null, isBlob = false) {
  let delimiter = url.indexOf('?') === -1 ? '?' : '&';

  let localeAwareUrl = `${API_URL}/${url + delimiter}lang=${I18n.locale}`;

  // const store = Store && Store.getState();
  const apiToken = getStorageItem(AUTH_STORAGE_KEY);

  let request;

  if (__DEV__) {
    if (console.group) {
      console.groupCollapsed('action', 'NETWORK_REQUEST');
      console.log({
        method: method,
        body: body,
        url: localeAwareUrl,
      });
      console.groupEnd();
    }
  }

  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer ' + apiToken);
  headers.append(
    'Content-Type',
    isBlob ? 'multipart/form-data' : 'application/json',
  );

  if (method === 'POST') {
    request = fetch(localeAwareUrl, {
      method,
      body: isBlob ? body : JSON.stringify(body),
      headers,
    });
  } else {
    request = fetch(localeAwareUrl, {
      method,
      body: null,
      headers,
    });
  }

  return request
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        statusType: response.statusType,
        json,
      })),
    )
    .then(({status, statusType, json}) => {
      if (__DEV__) {
        if (console.group) {
          console.groupCollapsed('action', 'NETWORK_RESPONSE');
          console.log('payload', json);
          console.groupEnd();
        }
      }

      if (status !== 200 || !json.success) {
        const unknownError = json.errors
          ? json.errors
          : `Unknown Error. ${statusType}`;
        const errorMsg = json.message ? json.message : unknownError;
        return Promise.reject(errorMsg);
      }
      return json;
    })
    .catch(e => {
      return Promise.reject(`${e}`);
    });
}
