import {ACTION_TYPES} from 'customer/common/actions';
import moment from 'moment';

const initialState = {
  loadDrivers: {},
  add: {
    index: 1,
    attributes: {
      load_date: moment(),
      unload_date: moment(),
      load_time_from: moment(),
      load_time_to: moment(),
      unload_time_from: moment(),
      unload_time_to: moment(),
      trailer_type_id: 1,
      trailer_quantity: "2",
      packaging_id: 1,
      packaging_dimension: {
        length: "10",
        width: "20",
        height: "30",
        weight: "40",
        quantity: "2",
      },
      origin_location_id: 35,
      destination_location_id: 36,
      weight: "400",
      request_documents: true,
      use_own_truck: false,
      receiver_name: 'ABCD',
      receiver_email: 'abcd@test.com',
      receiver_mobile: '00966989382332',
      receiver_phone: '00966989382332',
      security_passes: [1,4],
      packaging_images:[]
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
