import {ACTION_TYPES} from 'shipper/common/actions';
import union from 'lodash/union';
const initialState = {};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOCATION_RECEIVED: {
      return {
        ...state,
        [action.payload.tripID]: action.payload.location,
      };
    }

    default:
      return state;
  }
}
