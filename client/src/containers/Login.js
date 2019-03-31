import React, { Component } from 'react';

import AuthService from '../utils/authService';

import {
  Notifications,
  AuthenticationForm as LoginForm
} from '../components/Components';

import {
  Aux
} from '../hoc/Hoc';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.collapseNotification  = this.collapseNotification.bind(this);
        this.Auth = new AuthService();
        this.state = {
          email: '',
          password: '',
          fields: {
            email: {
              type: 'email',
              name: 'email',
              placeholder: 'Your email'
            },
            password: {
              type: 'password',
              name: 'password',
              placeholder: 'Your password',
              validation: {
                minLength: 8
              }
            }
          },
          errors: []
        };
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    componentWillMount() {
      if (this.Auth.loggedIn()) {
        this.props.history.replace('/');
      }
    }

    validCredentials = () => {
      let errors = [];
      if (!this.state.email.trim()) {
        errors.push({
          message: 'Email is required',
          type: 'error'
        });
      }
      if (!this.state.password.trim()) {
        errors.push({
          message: 'Password is required',
          type: 'error'
        });
      }
      this.setState({errors: errors})
      return errors.length === 0;
    }

    handleFormSubmit = (event) => {
      event.preventDefault();
      if (this.validCredentials()) {
        this.Auth.login(this.state.email, this.state.password)
          .then((res) => {
            if (res.data.token) {
              this.Auth.setToken(res.data.token);
              this.props.history.replace('/');
            } else {
              let errors = [{
                message: res.data.message,
                type: 'error'
              }];
              this.setState({errors: errors});
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    collapseNotification = (index) => {
      let errors = [...this.state.errors];
      errors = errors.splice(0, index).concat(errors.splice(index+1));
      this.setState({errors: errors});
    }

    render() {
      const notifications = (
        this.state.errors.length !== 0 ? <Notifications
          items={this.state.errors}
          collapse={this.collapseNotification}/> : null
      );

      return (
        <Aux>
          <LoginForm
            title='Log in'
            fields={this.state.fields}
            buttonText='Log in'
            footerText1='Not registered yet?'
            footerText2='Sign Up'
            footerLink='/register'
            changed={this.handleChange}
            submit={this.handleFormSubmit}
            values={{
              email: this.state.email,
              password: this.state.password
            }}/>
          {notifications}
        </Aux>
      );
    }
}

export default Login;
