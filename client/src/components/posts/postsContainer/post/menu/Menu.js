import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'mdbreact';

import classes from './Menu.css';

const Menu = (props) => {
  return (
    <Dropdown className={classes.Menu}>
      <DropdownToggle
        color='ins'
        className={classes.Button}>
        <i className='material-icons'>more_vert</i>
      </DropdownToggle>
      <DropdownMenu right className={classes.DropdownMenu}>
        <DropdownItem
          className={classes.DropdownItem}
          onClick={props.delete}>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Menu;
