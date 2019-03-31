import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const FETCH_OTHER_USER_BEGIN = 'FETCH_OTHER_USER_BEGIN';
export const FETCH_OTHER_USER_SUCCESS = 'FETCH_OTHER_USER_SUCCESS';
export const FETCH_OTHER_USER_FAILURE = 'FETCH_OTHER_USER_FAILURE';

export const fetchOtherUserBegin = () => {
  return {
    type: FETCH_OTHER_USER_BEGIN
  };
}

export const fetchOtherUserSuccess = (user) => {
  return {
    type: FETCH_OTHER_USER_SUCCESS,
    payload: {user}
  };
}

export const fetchOtherUserFailure = (error) => {
  return {
    type: FETCH_OTHER_USER_FAILURE,
    payload: {error}
  };
}

export default function(id) {
  return (dispatch) => {
    dispatch(fetchOtherUserBegin());
    axios({
      method: 'get',
      url: '/user',
      params: {
        id
      },
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
      .then(res => dispatch(fetchOtherUserSuccess(res.data)))
      .catch(err => dispatch(fetchOtherUserFailure(err)));
  };
}
