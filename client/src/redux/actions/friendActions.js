import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const FETCH_FRIENDS_BEGIN = 'FETCH_FRIENDS_BEGIN';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE';

export const fetchFriendsBegin = () => ({
  type: FETCH_FRIENDS_BEGIN
});

export const fetchFriendsSuccess = (friends) => ({
  type: FETCH_FRIENDS_SUCCESS,
  payload: { friends }
});

export const fetchFriendsFailure = (error) => ({
  type: FETCH_FRIENDS_FAILURE,
  payload: { error }
});

export default (id) => {
  let url = '/user/friends';

  if (id) {
    url = `/user/friends/?id=${id}`;
  }

  return (dispatch) => {
    dispatch(fetchFriendsBegin());
    axios({
      url,
      method: 'get',
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
      .then(res => dispatch(fetchFriendsSuccess(res.data)))
      .catch(err => dispatch(fetchFriendsFailure(err)));
  };
}
