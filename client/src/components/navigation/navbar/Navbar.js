import React from 'react';
import {Link} from 'react-router-dom';

import WithAuth from '../../../hoc/WithAuth';
import classes from './Navbar.css';

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Left}>
        <span
          onClick={props.drawerToggle}
          className={classes.DrawerIcon}>
          <i className='material-icons'>menu</i>
        </span>
        <div className={classes.Logo}>
          STREAM &nbsp;&nbsp; SHARE
        </div>
        <div className={classes.SearchBar}>
          <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Search..."
          onChange={props.changed}
          value={props.searchQuery}/>
        </div>
      </div>
      <div className={classes.Right}>
        <Link to='/me'><span className={classes.Icon}><i className='material-icons'>home</i></span></Link>
        <Link to='/'><span className={classes.Icon}><i className='material-icons'>view_agenda</i></span></Link>
        <Link to='/firend-requests'><span className={classes.Icon}><i className='material-icons'>people</i></span></Link>
      </div>
    </div>
  );
}

export default WithAuth(Navbar);
