import {ACTION_TYPES} from 'customer/common/actions';
import moment from 'moment';

const initialState = {
  add:{
    index:1,
    attributes:{
      load_date: null,
      load_time: moment(),
      trailer_id: null,
      trailer_quantity: 1,
      packaging_id: null,
      packaging_dimension: {
        length: null,
        width: null,
        height: null,
        weight: null,
        quantity: null,
      },
      origin_location_id: null,
      destination_location_id: null,
      weight: null,
      request_documents: true,
      use_own_truck: false,
      receiver_name: 'ABCD',
      receiver_email: 'abcd@test.com',
      receiver_mobile: '00966989382332',
      receiver_phone: '00966989382332',
      security_passes: [],
    }
  },
  edit:{

  }
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SET_LOAD_ADD_DATA_REQUEST:
      return {
        ...state,
        add:{
          ...state.add,
          attributes:{
            ...state.add.attributes,
            [action.field] : action.value
          }
        }
      };
      break;
    default:
      return state;
  }
}
