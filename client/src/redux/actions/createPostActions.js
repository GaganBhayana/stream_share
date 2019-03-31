import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const CREATE_POST_BEGIN = 'CREATE_POST_BEGIN';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const createPostBegin = () => ({
  type: CREATE_POST_BEGIN
});

export const createPostSuccess = () => ({
  type: CREATE_POST_SUCCESS
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: {error}
});

export default (id, data) => {
  let method = 'post';
  if (id) {
    method = 'put';
  }

  return (dispatch) => {
    dispatch(createPostBegin());
    axios({
      method,
      url: '/post',
      data,
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
      .then(res => dispatch(createPostSuccess()))
      .catch(err => dispatch(createPostFailure(err)));
  };
}
