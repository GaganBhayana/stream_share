import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const FETCH_SUGGESTIONS_BEGIN = 'FETCH_SUGGESTIONS_BEGIN';
export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
export const FETCH_SUGGESTIONS_FAILURE = 'FETCH_SUGGESTIONS_FAILURE';

export const fetchSuggestionsBegin = (suggestionType) => {
  return {
    type: FETCH_SUGGESTIONS_BEGIN,
    suggestionType
  };
}

export const fetchSuggestionsSuccess = (suggestionType, suggestions) => {
  return {
    type: FETCH_SUGGESTIONS_SUCCESS,
    suggestionType,
    payload: {suggestions}
  };
}

export const fetchSuggestionsFailure = (suggestionType, error) => {
  return {
    type: FETCH_SUGGESTIONS_FAILURE,
    suggestionType,
    payload: {error}
  };
}

export default function(suggestionType) {
  let url = '';
  if (suggestionType === 'friend') {
    url = '/user/friends/suggestions'
  } else if (suggestionType === 'group') {
    url = '/group/suggestions'
  } else if (suggestionType === 'page') {
    url = '/page/suggestions'
  }

  return (dispatch) => {
    dispatch(fetchSuggestionsBegin(suggestionType));
    axios({
      method: 'get',
      url,
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
      .then(res => dispatch(fetchSuggestionsSuccess(suggestionType, res.data)))
      .catch(err => dispatch(fetchSuggestionsFailure(suggestionType, err)));
  };
}
