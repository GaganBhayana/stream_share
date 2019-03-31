import {
  FETCH_OTHER_USER_BEGIN,
  FETCH_OTHER_USER_FAILURE,
  FETCH_OTHER_USER_SUCCESS
} from '../actions/otherUserActions';

const initialState = {
  user: {},
  loading: false,
  error: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_OTHER_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_OTHER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user
      };

    case FETCH_OTHER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;

  }
}
