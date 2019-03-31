import React from 'react';
import {
  Card,
  CardText
} from 'mdbreact';
import classes from './Notifications.css';

const Notification = (props) => {
  let styles = [classes.Notification];

  switch (props.type) {
    case 'error':
      styles.push(classes.Danger);
      break;
    case 'success':
      styles.push(classes.Success);
      break;
    default:
  }

  return (
    <Card className={styles.join(' ')} >
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={props.collapse}>
        <span aria-hidden="true">&times;</span>
      </button>
      <CardText>{props.message}</CardText>
    </Card>
  );
}

const NotificationContainer = (props) => {

  const notifications = props.items.map((item, index) => {
    return (
      <Notification
        key={index}
        message={item.message}
        type={item.type}
        collapse={() => props.collapse(index)}/>
    );
  });

  return (
    <div className={classes.NotificationContainer}>
      {notifications}
    </div>
  );
}

export default NotificationContainer;
