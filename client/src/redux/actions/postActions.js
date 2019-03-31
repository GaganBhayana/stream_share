import axios from '../../utils/axios';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const DELETE_POST = 'DELETE_POST';

export const fetchPostBegin = () => {
  return {
    type: FETCH_POSTS_BEGIN
  };
}

export const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: {posts}
  };
}

export const fetchPostFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: {error}
  };
}

export const deletePost = (index, id) => {
  axios({
    method: 'delete',
    url: '/post/'+id,
    headers: {
      'x-access-token': Auth.getToken()
    }
  })
    .then(res => null)
    .catch(err => console.log(err))
  return {
    type: DELETE_POST,
    payload: {index}
  };
}

export default function({id, parent, me, count}) {

  let url = me ? '/post/my-posts' : '/post';

  return (dispatch) => {
    dispatch(fetchPostBegin());
    return axios({
      method: 'get',
      url,
      params: {
        id,
        parent,
        count,
      },
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
      .then(res => dispatch(fetchPostSuccess(res.data)))
      .catch(err => dispatch(fetchPostFailure(err)));
  };
}
