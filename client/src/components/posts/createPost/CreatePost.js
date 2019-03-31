import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'mdbreact';
import { PulseLoader } from 'react-spinners';

import createPost from '../../../redux/actions/createPostActions';
import { Aux } from '../../../hoc/Hoc';
import { Notifications } from '../../Components';

import fetchPosts from '../../../redux/actions/postActions';

import classes from './CreatePost.css';

class CreatePost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
      img: '',
      alerts: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.success !== nextProps.success && nextProps.success) {
      this.setState({
        alerts: [{message: 'Post Submitted', type:'success'}]
      });
      let me = 'true';
      this.props.dispatch(fetchPosts({me}));
    } else if (this.props.error !== nextProps.error && nextProps.error) {
      this.setState({
        alerts: [{message: 'Something went wrong', type: 'error'}]
      });
    }
  }

  handleValidation = () => {
    if (!this.state.content.trim().length && !this.state.img.trim().length) {
      this.setState({
        alerts: [{
          message: "Post can't be empty",
          type: 'error'
        }]
      });
      return  false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.handleValidation()) {
      return;
    }

    this.props.dispatch(createPost(null, {
      owner: this.props.userId,
      content: this.state.content,
      img: this.state.img
    }));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleNotifications = (index) => {
    this.setState({
      alerts: []
    });
  }

  render() {

    let ImgStyle = {};
    if (this.state.img.trim().length) {
      ImgStyle.display = 'flex';
    } else {
      ImgStyle.display = 'none';
    }

    const disabledButton = (
      <Button
        className={classes.PostButton}
        onClick={this.handleSubmit}
        disabled>
          <PulseLoader loading />
      </Button>
    );

    return (
      <Aux>
        <Notifications
          items={this.state.alerts}
          collapse={this.handleNotifications}/>
        <div className={classes.CreatePost}>
          <input
            className={classes.Post}
            autoComplete='off'
            placeholder="What's on your mind"
            type='text'
            name='content'
            onChange={this.handleChange}
            value={this.state.content} />
          <div className={classes.ImgFieldDiv}>
            <input
              className={classes.ImgFieldInput}
              autoComplete='off'
              placeholder='Image...'
              type='text'
              name='img'
              onChange={this.handleChange}
              value={this.state.img}/>
            <i className={`material-icons ${classes.ImgFieldIcon}`}>image</i>
          </div>
          <div
            style={ImgStyle}
            className={classes.ImgContainer}>
            <img
              src={this.state.img}
              height='80px'
              width='auto'
              alt='img'/>
          </div>
          {this.props.loading?
            disabledButton :
            <Button
              className={classes.PostButton}
              onClick={this.handleSubmit}>
              Post
            </Button>}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.currentUser.user._id,
  loading: state.createPost.loading,
  error: state.createPost.error,
  success: state.createPost.success,
});

export default connect(mapStateToProps)(withRouter(CreatePost));
