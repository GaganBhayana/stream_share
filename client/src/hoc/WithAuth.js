import React, {Component} from 'react';
import AuthService from '../utils/authService';

const WithAuth = (ChildComponent) => {
  return class ProtectedComponent extends Component {
    constructor() {
      super();
      this.Auth = new AuthService();
    }

    componentWillMount() {
      if (!this.Auth.loggedIn()) {
        this.props.history.replace('/login');
      }
    }

    render() {
      return <ChildComponent
        {...this.props}
        />;
    }
  };
}

export default WithAuth;
