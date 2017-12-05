import merge from 'lodash/merge';

const initialState = {
  users: {},
};

export function entities(state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }
  return state;
}
