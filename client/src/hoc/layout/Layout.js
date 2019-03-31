import React from 'react';
import Particles from 'react-particles-js';

//BACKGROUND IMAGE FOR UNAUTHENTICATED ROUTES
import Background from '../../assets/img/unAuthenticated.jpg';

import classes from './Layout.css';

import Aux from '../Aux';
import AuthService from '../../utils/authService';

import {
  Navigation,
  SuggestionBar  
} from '../../components/Components';

const Auth = new AuthService();

const params = {
  particles: {
    number: {
      value: 50
    },
    line_linked: {
      shadow: {
        enable: false,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
};


export default function(props) {
  let layout = (
    <Aux>
      <Navigation/>
      <div className={classes.Container}>
        <div className={classes.Right}>
          <SuggestionBar />
        </div>
        <div className={classes.Main}>
          {props.children}
        </div>
      </div>
    </Aux>
  );

  if(!Auth.loggedIn()) {
    layout = (
      <Aux>
        <Particles
          className={classes.Particles}
          style={{backgroundImage: `url(${Background})`}}
          params={params}/>
        {props.children}
      </Aux>
    );
  }

  return layout;
};
