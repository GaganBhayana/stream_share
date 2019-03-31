import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const FETCH_GROUPS_BEGIN = 'FETCH_GROUPS_BEGIN';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';

export const fetchFriendsBegin = () => ({
  type: FETCH_GROUPS_BEGIN
});

export const fetchFriendsSuccess = (groups) => ({
  type: FETCH_GROUPS_SUCCESS,
  payload: { groups }
});

export const fetchFriendsFailure = (error) => ({
  type: FETCH_GROUPS_FAILURE,
  payload: { error }
});

export default (id) => {
  let url = '/user/groups';

  if (id) {
    url = `/user/groups/?id=${id}`;
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
