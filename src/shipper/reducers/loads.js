import {ACTION_TYPES} from 'shipper/common/actions';

const initialState = {

};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case ACTION_TYPES.FETCH_LOAD_ADD_DATA_SUCCESS : {
      return {
        ...
      }
    }

    default:
      return state;
  }
}
