import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Instagram } from 'react-content-loader';

import fetchPosts, {
  deletePost
} from '../../../redux/actions/postActions';

import fetchOtherUser from '../../../redux/actions/otherUserActions';

import {
  Aux
} from '../../../hoc/Hoc';

import {
  Info
} from '../../Components';

import Post from './post/Post';
import DeleteModal from './modals/DeleteModal';
import classes from './Posts.css'


class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      postIndex: null,
      postId: null,
      otherUserId: null,
      showOtherUserInfo: false,
    }
  }

  componentDidMount() {
    this.handleFetchPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId !== prevProps.userId) {
      this.handleFetchPosts();
    }
    if (prevState.otherUserId !== this.state.otherUserId) {
      this.props.dispatch(fetchOtherUser(this.state.otherUserId));
    }
  }

  handleFetchPosts = () => {
    let match = this.props.match;
    let params = {};

    if (match.path === '/user/:id/:name') {
      params.id = match.params.id;
    } else if (match.path === '/group/:id/:name' || match.path === '/page/:id/:name') {
      params.parent = match.prams.id;
    } else if (match.path === '/me') {
      params.id = this.props.userId;
    }

    this.props.dispatch(fetchPosts(params));
  }

  toggleDeleteModal = (index, id) => {
    let state = !this.state.showDeleteModal;
    this.setState({
      showDeleteModal: state,
      postIndex: index,
      postId: id,
    });
  }

  handleDeletePost = (index, id) => {
    this.setState({
      showDeleteModal: false
    });
    this.props.dispatch(deletePost(index, id));
  }

  handleMouseEnter = (otherUserId) => {
    this.setState({
      otherUserId,
      showOtherUserInfo: true,
    });
  }

  handleMouseLeave = () => {
    this.setState({
      showOtherUserInfo: false,
    });
  }

  renderPosts = () => {
    const posts = this.props.posts.map((post, index) => (
      <Post
        key={index}
        showMenu={post.owner === this.props.userId}
        post={post}
        index={index}
        toggleDeleteModal={this.toggleDeleteModal.bind(this, index, post._id)}
        handleMouseEnter={this.handleMouseEnter.bind(this, post.owner)}
        handleMouseLeave={this.handleMouseLeave}
        userId={this.props.userId}
        Info={this.state.showOtherUserInfo ? <Info {...this.props.otherUser}/> : null}/>
    ));

    return (this.props.loading ?
            <div className={classes.PostsContainer}>
              <Instagram className={classes.Loader}/>
              <Instagram className={classes.Loader}/>
              <Instagram className={classes.Loader}/>
            </div> :
          this.props.posts.length ?
            <div className={classes.PostsContainer}>
              {posts}
            </div> :
          <div className={classes.NoPost}>No post to show</div>);
  }

  renderModals = () => {
    const deleteModal = (
      this.state.showDeleteModal ?
      <DeleteModal
        toggle={this.toggleDeleteModal}
        show={this.state.showDeleteModal}
        delete={this.handleDeletePost.bind(this, this.state.postIndex, this.state.postId)}/> :
      null
    );

    return deleteModal;
  }

  render() {
    return (
      <Aux>
        {this.renderModals()}
        {this.renderPosts()}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.currentUser.user._id,
  user: state.currentUser.user,
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
  otherUser: state.otherUser,
});

export default connect(mapStateToProps)(withRouter(Posts));
