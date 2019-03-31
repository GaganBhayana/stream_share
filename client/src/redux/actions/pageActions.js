import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const FETCH_PAGES_BEGIN = 'FETCH_PAGES_BEGIN';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';

export const fetchPagesBegin = () => ({
  type: FETCH_PAGES_BEGIN
});

export const fetchPagesSuccess = (pages) => ({
  type: FETCH_PAGES_SUCCESS,
  payload: { pages }
});

export const fetchPagesFailure = (error) => ({
  type: FETCH_PAGES_FAILURE,
  payload: { error }
});

export default (id) => {
  let url = '/user/groups';

  if (id) {
    url = `/user/pages/?id=${id}`;
  }

  return (dispatch) => {
    dispatch(fetchPagesBegin());
    axios({
      url,
      method: 'get',
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
      .then(res => dispatch(fetchPagesSuccess(res.data)))
      .catch(err => dispatch(fetchPagesFailure(err)));
  };
}
