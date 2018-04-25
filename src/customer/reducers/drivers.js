import {ACTION_TYPES} from 'customer/common/actions';
import moment from 'moment';

const initialState = {};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_LOAD_DRIVERS_SUCCESS:
      return {
        ...state,
        [action.loadID] : action.result
      };
      break;
    default:
      return state;
  }
}
