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
      receiver_name: null,
      receiver_email: null,
      receiver_mobile: null,
      receiver_phone: null,
      security_passes: [],
      packaging_images: [],
    },
  },
  edit: {
    index: 1,
    attributes: {
      load_date: moment(),
      unload_date: moment(),
      load_time_from: moment(),
      load_time_to: moment(),
      unload_time_from: moment(),
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
      receiver_name: null,
      receiver_email: null,
      receiver_mobile: null,
      receiver_phone: null,
      security_passes: [],
      packaging_images: [],
    },
  },
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
          },
        },
      };
      break;

    case ACTION_TYPES.SET_EDIT_ATTRIBUTE_REQUEST:
      return {
        ...state,
        edit: {
          ...state.edit,
          attributes: {
            ...state.edit.attributes,
            [action.field]: action.value,
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
    case ACTION_TYPES.SET_EDIT_DATA:
      return {
        ...state,
        edit: {
          ...state.edit,
          attributes:{
            ...state.edit.attributes,
            ...action.payload,
            load_date: moment(action.payload.load_date),
            unload_date: moment(action.payload.unload_date),
            load_time_from: moment(action.payload.load_time_from),
            load_time_to: moment(action.payload.load_time_to),
            unload_time_from: moment(action.payload.unload_time_from),
            unload_time_to: moment(action.payload.unload_time_to),
          }
        },
      };
      break;
    default:
      return state;
  }
}
