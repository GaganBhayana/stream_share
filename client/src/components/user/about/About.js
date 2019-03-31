import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Facebook } from 'react-content-loader';

import fetchOtherUser from '../../../redux/actions/otherUserActions';
import backgroundGenerator from '../../../utils/backgroundGenerator';

import classes from './About.css';

import Avatar from '../../../assets/img/avatar.jpg';

class About extends Component {
  componentDidMount() {
    if (this.props.match.path === '/me') {
      this.props.dispatch(fetchOtherUser(this.props.userId));
    } else if (this.props.match.path === '/user/:id/:name') {
      this.props.dispatch(fetchOtherUser(this.props.match.params.id));
    }
  }

  renderAbout = () => {
    const user = this.props.otherUser;
    const about = (
      <div className={classes.Container}>
        <div className={classes.ImgContainer} style={backgroundGenerator()}>
          <div className={classes.Img}>
            <img
              alt='img'
              width='100%'
              height='auto'
              src={user.img ? user.img : Avatar} />
          </div>
          <div className={classes.Name}>{user.name}</div>
        </div>
        <span className={classes.Tagline}>{user.tagLine}</span>
        <div className={classes.InfoContainer}>
        {user.location ?
          <div className={classes.Info}>
            <span className={classes.Icon}><i className='material-icons'>location_on</i></span>
            <span className={classes.Attr}>{user.location}</span>
          </div> :
        null}
        {user.school ?
          <div className={classes.Info}>
            <span className={classes.Icon}><i className='material-icons'>school</i></span>
            <span className={classes.Attr}>{user.school}</span>
          </div> :
        null}
        {user.gender ?
          <div className={classes.Info}>
            <span className={classes.Icon}><i className='material-icons'>person</i></span>
            <span className={classes.Attr}>{user.gender}</span>
          </div> :
        null}
        {user.phone ?
          <div className={classes.Info}>
            <span className={classes.Icon}><i className='material-icons'>phone</i></span>
            <span className={classes.Attr}>{user.phone}</span>
          </div> :
        null}
        {user.email ?
          <div className={classes.Info}>
            <span className={classes.Icon}><i className='material-icons'>email</i></span>
            <span className={classes.Attr}>{user.email}</span>
          </div> :
        null}



        </div>
      </div>
    );
    return about;
  }

  render() {
    return (
      this.props.loading ?
      <Facebook className={classes.Container}/> :
      this.renderAbout()
    );
  }
}

const mapStateToProps = (state) => ({
  otherUser: state.otherUser.user,
  loading: state.otherUser.loading,
  error: state.otherUser.error,
  userId: state.currentUser.user._id,
})

export default connect(mapStateToProps)(withRouter(About));
