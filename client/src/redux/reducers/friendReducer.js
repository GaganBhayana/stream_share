import {
  FETCH_FRIENDS_BEGIN,
  FETCH_FRIENDS_FAILURE,
  FETCH_FRIENDS_SUCCESS
} from '../actions/friendActions';

const initialState = {
  friends: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FRIENDS_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.payload.friends,
        loading: false
      };
    case FETCH_FRIENDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
