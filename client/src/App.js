import React, { Component } from 'react';
import {Switch, Route} from 'react-router';

import {
  Home,
  Login,
  Register,
  NotFound,
  UserProfile,
  Page,
  Group,
} from './containers/Containers';

import Layout from './hoc/layout/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/me' key='me' component={UserProfile} />
          <Route exact path='/user/:id/:name' key='other_user' component={(props) => <UserProfile {...props}/>} />
          <Route exact path='/group/:id/:name' component={Group} />
          <Route exact path='/page/:id/:name' component={Page} />
          <Route exact path='/group/:id' component={Group} />
          <Route exact path='/' component={Home} />
          <Route path='' component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
