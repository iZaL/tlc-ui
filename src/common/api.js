import {API_URL} from 'common/env';
import I18n from './locale';

export function fetchAPI(url, method = 'GET', body = null, isBlob = false) {
  let delimiter = url.indexOf('?') === -1 ? '?' : '&';

  let localeAwareUrl = `${API_URL}/${url + delimiter}lang=${I18n.locale}`;

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

  if (method === 'POST') {

    let headers = {
      'Accept': 'application/json',
      'Content-Type': isBlob ? 'multipart/form-data' : 'application/json',
    };

    request = fetch(localeAwareUrl, {
      method,
      body: isBlob ? body : JSON.stringify(body),
      headers: headers,
    });
  } else {
    request = fetch(localeAwareUrl, {
      method,
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
