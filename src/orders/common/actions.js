export const ACTION_TYPES = {
  CATEGORY_REQUEST: 'CATEGORY_REQUEST',
  CATEGORY_SUCCESS: 'CATEGORY_SUCCESS',
  CATEGORY_FAILURE: 'CATEGORY_FAILURE',
};

function fetchCategories(params) {
  return {
    type: ACTION_TYPES.CATEGORY_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchCategories,
};
