import React, {Component} from 'react';

import AuthService from '../utils/authService';

import {
  CreatePost,
  Posts,
  FriendSuggestions
} from '../components/Components';

import {
  WithAuth,
  Aux
} from '../hoc/Hoc';

class Home extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  render() {
    return (
      <Aux>
        <CreatePost />
        <FriendSuggestions />
        <Posts />
      </Aux>
    );
  }
}

export default WithAuth(Home);
