import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Aux } from '../../../hoc/Hoc';
import fetchFriends from '../../../redux/actions/friendActions';
import classes from './Friends.css';

import Avatar from '../../../assets/img/avatar.jpg';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      query: '',
      filteredFriends: [],
    }
  }

  componentDidMount() {
    this.handleFriends();
  }

  componentDidUpdate(prevProps) {
    if (this.props.friends !== prevProps.friends) {
      this.setState({
        filteredFriends: this.props.friends
      });
    }
    if (this.props.match.path !== prevProps.match.path) {
      this.handleFriends();
    }
  }

  handleFriends = () => {
    const match = this.props.match;
    if (match.path === '/me') {
      this.props.dispatch(fetchFriends());
    } else if (match.path === '/user/:id/:name') {
      this.props.dispatch(fetchFriends(this.props.match.params.id));
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    });

    let filteredFriends = [...this.props.friends].filter(item => item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);

    console.log(filteredFriends);
    this.setState({
      filteredFriends
    });
  }

  toggleExpanded = () => {
    let expanded = !this.state.expanded;
    this.setState({
      expanded,
      filteredFriends: this.props.friends
    });
  }

  renderLoader = () => {

  }

  renderFriendsLess = () => {
    const items = this.state.filteredFriends.map((item, index) => {
      if (index < 6) {
        return (
          <div
            className={classes.ItemLess}
            key={index}>
            <Link to={`/user/${item._id}/${item.name.split(' ').join('-')}`}>
              <img
                alt='img'
                src={item.img ? item.img : Avatar}
                width='40px'
                height='auto'/>
            </Link>
          </div>
        );
      }
      return null;
    });

    return (
      <Aux>
        <div className={classes.Header}>
          <span>Friends</span>
          <span
            className={classes.Link}
            onClick={this.toggleExpanded}>
            More
          </span>
        </div>
        <div className={classes.Less}>
          {items.length ?
          items:
          <span className={classes.Empty}>Nothing to show.</span>}
        </div>
      </Aux>
    );
  }

  renderFriendsMore = () => {
    const items = this.state.filteredFriends.map((item, index) => {
      return (
        <Link
          className={classes.ItemMore}
          to={`/user/${item._id}/${item.name.split(' ').join('-')}`}
          key={index}>
          <div className={classes.Img}>
            <img
              alt='img'
              src={item.img ? item.img : Avatar}
              width='60px'
              height='auto'/>
          </div>
          <div>
            {item.name}
          </div>
        </Link>
      );
    });

    return (
      <Aux>
        <div className={classes.Header}>
          <span>Friends</span>
          <input
            className={["form-control form-control-sm", classes.Search].join(' ')}
            type="text"
            placeholder='Search...'
            value={this.props.query}
            onChange={this.handleChange} />
          <span
            className={classes.Link}
            onClick={this.toggleExpanded}>
            Less
          </span>
        </div>
        <div className={['row', classes.More].join(' ')}>
          {items.length ?
          items:
          <span className={classes.Empty}>Nothing to show.</span>}
        </div>
      </Aux>
    );
  }

  render() {
    return (
      <div className={classes.Container}>
        {this.state.expanded ?
        this.renderFriendsMore() :
        this.renderFriendsLess()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  friends: state.friends.friends,
  loading: state.friends.loading,
  error: state.friends.error
});

export default connect(mapStateToProps)(withRouter(Friends));
