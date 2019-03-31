import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const FETCH_CURRENT_USER_BEGIN = 'FETCH_CURRENT_USER_BEGIN';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';

export const fetchCurrentUserBegin = () => {
  return {
    type: 'FETCH_CURRENT_USER_BEGIN',
  };
}

export const fetchCurrentUserSuccess = (user) => {
  return {
    type: 'FETCH_CURRENT_USER_SUCCESS',
    payload: {user}
  }
}

export const fetchCurrentUserFailure = (error) => {
  return {
    type: 'FETCH_CURRENT_USER_FAILURE',
    payload: {error}
  };
}

export default function fetchCurrentUser() {
  return (dispatch) => {
    dispatch(fetchCurrentUserBegin());
    return axios.get('/user', {
      headers: {'x-access-token': Auth.getToken()}
    })
      .then(res => dispatch(fetchCurrentUserSuccess(res.data)))
      .catch(err => dispatch(fetchCurrentUserFailure(err)))
  }
}
