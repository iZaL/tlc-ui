import {ACTION_TYPES} from 'loads/common/actions';

const initialState = {
  isFetching: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CATEGORY_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ACTION_TYPES.CATEGORY_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    case ACTION_TYPES.CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
