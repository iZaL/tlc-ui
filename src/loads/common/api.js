import {fetchAPI} from 'common/api';

function fetchCategories(params = '') {
  const url = `categories${params}`;
  return fetchAPI(url);
}

export const API = {
  fetchCategories,
};
