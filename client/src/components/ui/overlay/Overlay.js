import React from 'react';

import classes from './Overlay.css';

const Overlay = (props) => {
  let style = {
    backgroundColor: props.color,
    opacity: props.opacity,
    marginTop: props.top
  };

  if (props.zIndex) {
    style.zIndex = props.zIndex;
  }

  if (!props.show) {
    style.display = 'none';
  } else {
    style.display = 'block'
  }

  let styles = [classes.Overlay];

  if (props.mobileOnly) {
    styles.push(classes.MobileOnly);
  }

  const closeButton = (props.closeButton ? (
    <button
      type="button"
      className={`close ${classes.CloseButton}`}
      aria-label="Close"
      onClick={props.clicked}>
      <span aria-hidden="true">&times;</span>
    </button>
  ) : null);

  const overlay = (props.show ? (
    <div
      onClick={(props.closeButton) ? null : props.clicked}
      className={styles.join(' ')}
      style={style}>
      {closeButton}
      {props.children}
    </div>
  ) : null);

  return (
    overlay
  );
}

export default Overlay;
