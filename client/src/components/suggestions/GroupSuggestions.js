import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom'


import Avatar from '../../assets/img/groupAvatar.jpg';
import classes from './Master.css';

import fetchSuggestions from '../../redux/actions/suggestionsActions';

class GroupSuggestions extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSuggestions('group'));
  }

  renderSuggestion = (suggestion) => {
    if (this.props.error || !this.props.suggestions.length) {
      return (
        <div className={classes.Empty}>
          <span>No Group Suggestions</span>
        </div>
      );
    } else {
      return (
        this.props.suggestions.map(item => (
          <div className={classes.FriendSuggestion} key={item._id}>
            <div className={classes.Img}>
              <img src={item.img ? item.img : Avatar} width='100%' height='100%' alt='img'/>
            </div>
            <div className={classes.Info}>
              <Link className={classes.Link} to={`/group/${item._id}/${item.title.split(' ').join('-')}`}>
                {item.title}
              </Link>
            </div>
          </div>
        ))
      );
    }
  }

  renderLoader = () => {
    return (
        <div className={classes.Empty}>
        <PulseLoader loading />
      </div>
    );
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          Group Suggestions
        </div>
        {this.props.loading ?
          this.renderLoader() :
          this.renderSuggestion()}
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  suggestions: state.suggestions.group.suggestions,
  loading: state.suggestions.group.loading,
  error: state.suggestions.group.error
});

export default connect(matchStateToProps)(GroupSuggestions);
