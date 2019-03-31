import React, { Component } from 'react';
import * as emailValidator from 'email-validator';

import AuthService from '../utils/authService';

import {
  Notifications,
  AuthenticationForm as SignupForm
} from '../components/Components';

import {
  Aux
} from '../hoc/Hoc';


class Login extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.collapseNotification = this.collapseNotification.bind(this);
    this.Auth = new AuthService();

    this.state = {
      name: '',
      email: '',
      password: '',
      fields: {
        name: {
          type: 'text',
          name: 'name',
          placeholder: 'Your name',
        },
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
      alerts: []
    };
  }

    componentWillMount() {
      if (this.Auth.loggedIn()) {
        this.props.history.replace('/');
      }
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    validCredentials = () => {
      let alerts = [];
      if (!this.state.name.trim()) {
        alerts.push({
          message: 'Name is required',
          type: 'error'
        });
      }
      if (!this.state.email.trim()) {
        alerts.push({
          message: 'Email is required',
          type: 'error'
        });
      } else if (!emailValidator.validate(this.state.email)) {
        alerts.push({
          message: 'Invalid email',
          type: 'error'
        });
      }
      if (!this.state.password.trim()) {
        alerts.push({
          message: 'Password is required',
          type: 'error'
        });
      } else if (this.state.password.length < 9) {
        alerts.push({
          message: 'Password too short. Must have minimum 8 characters.',
          type: 'error'
        });
      }

      this.setState({alerts: alerts})
      return alerts.length === 0;
    }

    handleFormSubmit = (event) => {
      event.preventDefault();
      if (this.validCredentials()) {
        this.Auth.register(this.state.name, this.state.email, this.state.password)
          .then((res) => {
            let alerts = [{
              message: res.data.message,
              type: 'success'
            }];
            this.setState({alerts: alerts});
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    collapseNotification = (index) => {
      let alerts = [...this.state.alerts];
      alerts = alerts.splice(0, index).concat(alerts.splice(index+1));
      this.setState({alerts: alerts});
    }

    render() {
      const notifications = (
        this.state.alerts.length !== 0 ?
        <Notifications
          items={this.state.alerts}
          collapse={this.collapseNotification}/> : null
      );

      return (
        <Aux>
          <SignupForm
            title='Sign up'
            fields={this.state.fields}
            buttonText='Register'
            footerText1='Already Registered?'
            footerText2='Log In'
            footerLink='/login'
            changed={this.handleChange}
            submit={this.handleFormSubmit}
            values={{
              name: this.state.name,
              email: this.state.email,
              password: this.state.password
            }} />
          {notifications}
        </Aux>
      );
    }

}

export default Login;
