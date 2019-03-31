import {
  FETCH_SUGGESTIONS_BEGIN,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_SUCCESS
} from '../actions/suggestionsActions';

const initialState = {
  friend: {
    suggestions: {},
    loading: false,
    error: null
  },
  group: {
    suggestions: {},
    loading:false,
    error: null
  },
  page: {
    suggestions: {},
    loading: false,
    error: null
  }
};

export default function(state = initialState, action) {
  let newState = {...state};
  let suggestionType = action.suggestionType;
  switch (action.type) {

    case FETCH_SUGGESTIONS_BEGIN:
      newState[suggestionType].loading = true;
      return newState;

    case FETCH_SUGGESTIONS_SUCCESS:
      newState[suggestionType].loading = false;
      newState[suggestionType].suggestions = action.payload.suggestions;
      return newState;

    case FETCH_SUGGESTIONS_FAILURE:
      newState[suggestionType].loading = false;
      newState[suggestionType].error = action.payload.error;
      return newState;

    default:
      return state;
  }
}
