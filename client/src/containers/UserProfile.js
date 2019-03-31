import React from 'react';

import {
  WithAuth,
  Aux
} from '../hoc/Hoc';

import {
  Posts,
  About,
  Friends,
  Groups,
  Pages
} from '../components/Components';

const UserProfile = () => {
  return (
    <Aux>
      <About />
      <Friends />
      <Groups />
      <Pages />
      <Posts />
    </Aux>
  );
}

export default WithAuth(UserProfile);
