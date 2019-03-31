import React from 'react';

import {
  Aux
} from '../hoc/Hoc'

import {
  GroupSuggestions,
  CreatePost,
  Posts,
  MyGroups
} from '../components/Components';


const Group = (props) => {
  return ( 
    <Aux>
      <MyGroups/>
      <GroupSuggestions />
    </Aux>
  );
}

export default Group;