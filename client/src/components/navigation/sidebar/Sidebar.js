import React from 'react';
import {Link} from 'react-router-dom';

import classes from './Sidebar.css';
import WithAuth from '../../../hoc/WithAuth';
import Links from './MenuItems';
import Overlay from '../../ui/overlay/Overlay';
import Aux from '../../../hoc/Aux';

const Sidebar = (props) => {
  const menuItems = Links.map(item => {
    return (
      <Link
        key={item.label}
        to={item.link}>
        <div
          onClick={props.drawerToggle}
          className={classes.MenuItem}>
          {item.label}
        </div>
      </Link>
    );
  });

  let styles = [classes.Sidebar];

  if (props.show) {
    styles.push([classes.Open]);
  } else {
    styles.push([classes.Close]);
  }

  const sidebar = (
    <div className={styles.join(' ')}>
      <div className={classes.AvatarContainer}>
        <Link to='/me'>
          <div
            style={{backgroundImage: `url(${props.img})`}}
            className={classes.Avatar}
            onClick={props.drawerToggle}>
          </div>
        </Link>
      </div>
      <div className={classes.SearchBar}>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Search..."
          onChange={props.changed}
          value={props.searchQuery}/>
      </div>
      {menuItems}
      <div
        className={classes.MenuItem}
        onClick={props.logout}>
        Logout
      </div>
    </div>
  );

  return (
    <Aux>
      {sidebar}
      <Overlay
        color='black'
        opacity='0.6'
        show={props.show}
        clicked={props.drawerToggle}
        mobileOnly/>
    </Aux>
  );
}

export default WithAuth(Sidebar);
