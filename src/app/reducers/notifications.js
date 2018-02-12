//@flow
import {ACTION_TYPES} from 'app/common/actions';

type MESSAGE_TYPE = 'error|success|warning';

type State = {
  message: string,
  type: MESSAGE_TYPE,
};

const initialState: State = {
  message: '',
  type: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.messageType,
      };
    case ACTION_TYPES.DISMISS_NOTIFICATION:
      return {
        ...state,
        message: null,
        type: null,
      };
    default:
      return state;
  }
}

