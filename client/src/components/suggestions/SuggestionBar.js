import React from 'react';

import { Aux } from '../../hoc/Hoc';
import FriendSuggestions from './FriendSuggestions';
import GroupSuggestions from './GroupSuggestions';
import PageSuggestions from './PageSuggestions';

export default function(props) {
  return (
    <Aux>
      <FriendSuggestions />
      <GroupSuggestions />
      <PageSuggestions />
    </Aux>
  );
};
