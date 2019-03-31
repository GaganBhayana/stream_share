import React from 'react';

//BACKGROUND IMAGE FOR 404 ERROR
import Background from '../assets/img/404.png';

const NotFound = (props) => {
  const imgContainer = {
    display: 'flex',
    margin: 'auto',
    height: '90vh',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div
      className='col-lg-8'
      style={imgContainer}>
      <img
        src={Background}
        width='100%'
        alt='404 Not Found'/>
    </div>
  );
};

export default NotFound;
