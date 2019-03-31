import {
  FETCH_CURRENT_USER_BEGIN,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_CURRENT_USER_SUCCESS
} from '../actions/userActions';

const initialState = {
  user: {},
  loading: false,
  error: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user
      };

    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;

  }
}
