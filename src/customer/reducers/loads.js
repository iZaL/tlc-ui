import {ACTION_TYPES} from 'customer/common/actions';
import moment from 'moment';

const initialState = {
  loadDrivers: {},
  add: {
    index: 1,
    attributes: {
      load_date: null,
      unload_date: null,
      load_time_from: moment(),
      load_time_to: moment(),
      unload_time_from:moment(),
      unload_time_to: moment(),
      trailer_type_id: null,
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
    },
  },
  edit: {},
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SET_LOAD_ADD_DATA_REQUEST:
      return {
        ...state,
        add: {
          ...state.add,
          attributes: {
            ...state.add.attributes,
            [action.field]: action.value,
            // typeof (action.value) === 'string' ? action.value : {
            //   ...state.add.attributes[action.field],
            //   ...action.value
            // },
          },
        },
      };
      break;
    case ACTION_TYPES.FETCH_LOAD_DRIVERS_SUCCESS:
      return {
        ...state,
        loadDrivers: {
          ...state.loadDrivers,
          [action.loadID]: action.result,
        },
      };
      break;
    default:
      return state;
  }
}
