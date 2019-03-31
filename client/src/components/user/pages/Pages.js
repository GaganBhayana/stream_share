import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { Aux } from '../../../hoc/Hoc';
import fetchPages from '../../../redux/actions/groupActions';
import classes from './Pages.css';

import Avatar from '../../../assets/img/avatar.jpg';

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      query: '',
      filteredPages: [],
    }
  }

  componentDidMount() {
    this.handlePages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.pages !== prevProps.pages) {
      this.setState({
        filteredPages: this.props.pages
      });
    }
    if (this.props.match.path !== prevProps.match.path) {
      this.handlePages();
    }
  }

  handlePages = () => {
    const match = this.props.match;
    if (match.path === '/me') {
      this.props.dispatch(fetchPages());
    } else if (match.path === '/user/:id/:name') {
      this.props.dispatch(fetchPages(this.props.match.params.id));
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    });

    let filteredPages = [...this.props.groups].filter(item => item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);

    console.log(filteredPages);
    this.setState({
      filteredPages
    });
  }

  toggleExpanded = () => {
    let expanded = !this.state.expanded;
    this.setState({
      expanded,
      filteredPages: this.props.groups
    });
  }

  renderLoader = () => {

  }

  renderPagesLess = () => {
    const items = this.state.filteredPages.map((item, index) => {
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
          <span>Pages</span>
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

  renderPagesMore = () => {
    const items = this.state.filteredPages.map((item, index) => {
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
          <span>Pages</span>
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
        this.renderPagesMore() :
        this.renderPagesLess()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.pages.pages,
  loading: state.pages.loading,
  error: state.pages.error,
  userId: state.currentUser.user._id
});

export default connect(mapStateToProps)(withRouter(Pages));
