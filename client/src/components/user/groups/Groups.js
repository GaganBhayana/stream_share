import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Aux } from '../../../hoc/Hoc';
import fetchGroups from '../../../redux/actions/groupActions';
import classes from './Groups.css';

import Avatar from '../../../assets/img/avatar.jpg';

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      query: '',
      filteredGroups: [],
    }
  }

  componentDidMount() {
    this.handleGroups();
  }

  componentDidUpdate(prevProps) {
    if (this.props.friends !== prevProps.friends) {
      this.setState({
        filteredGroups: this.props.friends
      });
    }
    if (this.props.match.path !== prevProps.match.path) {
      this.handleGroups();
    }
  }

  handleGroups = () => {
    const match = this.props.match;
    if (match.path === '/me') {
      this.props.dispatch(fetchGroups());
    } else if (match.path === '/user/:id/:name') {
      this.props.dispatch(fetchGroups(this.props.match.params.id));
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    });

    let filteredGroups = [...this.props.groups].filter(item => item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);

    console.log(filteredGroups);
    this.setState({
      filteredGroups
    });
  }

  toggleExpanded = () => {
    let expanded = !this.state.expanded;
    this.setState({
      expanded,
      filteredGroups: this.props.groups
    });
  }

  renderLoader = () => {

  }

  renderGroupsLess = () => {
    const items = this.state.filteredGroups.map((item, index) => {
      if (index < 6) {
        return (
          <div
            className={classes.ItemLess}
            key={index}>
            <Link to={`/group/${item._id}/${item.title.split(' ').join('-')}`}>
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
          <span>Groups</span>
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

  renderGroupsMore = () => {
    const items = this.state.filteredGroups.map((item, index) => {
      return (
        <Link
          className={classes.ItemMore}
          to={`/group/${item._id}/${item.title.split(' ').join('-')}`}
          key={index}>
          <div className={classes.Img}>
            <img
              alt='img'
              src={item.img ? item.img : Avatar}
              width='60px'
              height='auto'/>
          </div>
          <div>
            {item.title}
          </div>
        </Link>
      );
    });

    return (
      <Aux>
        <div className={classes.Header}>
          <span>Groups</span>
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
        this.renderGroupsMore() :
        this.renderGroupsLess()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.friends.friends,
  loading: state.friends.loading,
  error: state.friends.error
});

export default connect(mapStateToProps)(withRouter(Groups));
