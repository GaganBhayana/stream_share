import {
  FETCH_GROUPS_BEGIN,
  FETCH_GROUPS_FAILURE,
  FETCH_GROUPS_SUCCESS
} from '../actions/groupActions';

const initialState = {
  groups: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload.groups,
        loading: false
      };
    case FETCH_GROUPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
