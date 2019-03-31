import {
  CREATE_POST_BEGIN,
  CREATE_POST_FAILURE,
  CREATE_POST_SUCCESS
} from '../actions/createPostActions.js';

const initialState = {
  loading: false,
  error: null,
  success: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 'success',
      };
    case CREATE_POST_FAILURE:
      return {
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
