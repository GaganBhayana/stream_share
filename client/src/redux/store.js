import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import thunkMiddleware from 'redux-thunk';

import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import otherUserReducer from './reducers/otherUserReducer'
import suggestionsReducer from './reducers/suggestionsReducer';
import createPostReducer from './reducers/createPostReducer';
import friendReducer from './reducers/friendReducer';
import pageReducer from './reducers/pageReducer';
import groupReducer from './reducers/groupReducer';
import myGroupReducer from './reducers/myGroupReducer';

const rootReducer = combineReducers ({
  otherUser: otherUserReducer,
  currentUser: userReducer,
  posts: postReducer,
  suggestions: suggestionsReducer,
  createPost: createPostReducer,
  friends: friendReducer,
  groups: groupReducer,
  pages: pageReducer,
  myGroups: myGroupReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware (
    thunkMiddleware
  )
);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
