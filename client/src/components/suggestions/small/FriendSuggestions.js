import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom'

import Avatar from '../../../assets/img/avatar.jpg';
import classes from './Master.css';

import fetchSuggestions from '../../../redux/actions/suggestionsActions';

class FriendSuggestions extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSuggestions('friend'));
  }

  renderSuggestion = (suggestion) => {
    if (this.props.error || !this.props.suggestions.length) {
      return (
        <div className={classes.Empty}>
          <span>No Friend Suggestions</span>
        </div>
      );
    } else {
      return (
      <div className={classes.SuggestionsContainer}>
        {this.props.suggestions.map(item => (
            <div className={classes.Suggestion} key={item._id}>
              <div className={classes.Img}>
                <img src={item.img ? item.img : Avatar} width='100%' height='100%' alt='img'/>
              </div>
              <div className={classes.Info}>
                <Link className={classes.Link} to={`/user/${item._id}/${item.name.split(' ').join('-')}`}>
                  {item.name}
                </Link>
              </div>
          </div>
        ))}
      </div>
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
          Friend Suggestions
        </div>
        {this.props.loading ?
          this.renderLoader() :
          this.renderSuggestion()}
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  suggestions: state.suggestions.friend.suggestions,
  loading: state.suggestions.friend.loading,
  error: state.suggestions.friend.error
});

export default connect(matchStateToProps)(FriendSuggestions);
