import React from 'react';
import { RingLoader } from 'react-spinners';

import {
  Aux
} from '../../../hoc/Hoc';

import classes from './Info.css';

const Info = (props) => {
  const user = props.user;

  const items = (
    <Aux>
      <div className={classes.Item}>
        <i className='material-icons'>person</i>
        <span className={classes.Text}>{user.gender}</span>
      </div>
      <div className={classes.Item}>
        <i className='material-icons'>location_on</i>
        <span className={classes.Text}>{user.location}</span>
      </div>
      <div className={classes.Item}>
        <i className='material-icons'>school</i>
        <span className={classes.Text}>{user.school}</span>
      </div>
      <div className={classes.Item}>
        <i className='material-icons'>phone</i>
        <span className={classes.Text}>{user.phone}</span>
      </div>
      <div className={classes.Item}>
        <i className='material-icons'>email</i>
        <span className={classes.Text}>{user.email}</span>
      </div>
    </Aux>
  );


  return (
    props.loading ?
    <RingLoader loading={props.loading}/> :
    items
  );
}

export default Info;
