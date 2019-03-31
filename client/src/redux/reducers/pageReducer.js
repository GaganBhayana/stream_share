import {
  FETCH_PAGES_BEGIN,
  FETCH_PAGES_FAILURE,
  FETCH_PAGES_SUCCESS
} from '../actions/pageActions';

const initialState = {
  pages: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGES_BEGIN:
      return {
        ...state,
        loading: true
      };
    case FETCH_PAGES_SUCCESS:
      return {
        ...state,
        pages: action.payload.pages,
        loading: false
      };
    case FETCH_PAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
