import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import classes from './Post.css';
import Menu from './menu/Menu';

//IMG FOR USERS WHO DONT HAVE A PIC
import Avatar from '../../../../assets/img/avatar.jpg';

import backgroundGenerator from '../../../../utils/backgroundGenerator';




const Post = (props) => {
  const post = props.post;

  let backgroundStyle = {};

  if (!post.img) {
    backgroundStyle = {...backgroundGenerator()};
    backgroundStyle.minHeight = '200px';
  }

  return (
    <div className={classes.Post}>
      <div className={classes.Owner}>
        <img
          className={classes.OwnerImg}
          alt='img'
          src={post.ownerImg ? post.ownerImg : Avatar}/>
        <Link to={props.userId === post.owner ? '/me' : `/user/${post.owner}/${post.ownerName.split(' ').join('-')}`}>
          <h1
            data-tip
            onMouseEnter={props.handleMouseEnter}
            onMouseLeave={props.handleMouseLeave}
            className={classes.OwnerName}>{post.ownerName}</h1>
        </Link>
        <ReactTooltip
          place="right"
          type='light'
          className={classes.Info}>
          {props.Info}
        </ReactTooltip>
        {props.showMenu ?
          <Menu
            edit={props.toggleEditModal}
            delete={props.toggleDeleteModal}/> :
          null}
      </div>
      <div className={classes.ImgContainer}>
        {post.img ?
          <img
              alt='img'
              src={post.img}
              className={classes.Img}/> :
          null}
      </div>
      <div
        style={backgroundStyle}
        className={classes.Content}>
        {post.content}
      </div>
    </div>
  );
}

export default Post;
