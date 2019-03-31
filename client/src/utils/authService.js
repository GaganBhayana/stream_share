import axios from './axios';

export default class AuthService {
  getToken = () => {
    return localStorage.getItem('auth_token');
  }

  setToken = (token) => {
    localStorage.setItem('auth_token', token);
  }

  register = (name, email, password) => {
    return axios.post('/sign-up', {
      name,
      email,
      password
    });
  }

  login = (email, password) => {
    return axios.post('/login', {
      email,
      password
    });
  }

  logout = () => {
    localStorage.removeItem('auth_token');
  }

  loggedIn = () => {
    if (this.getToken()) {
      return true;
    }
    return false;
  }


}
