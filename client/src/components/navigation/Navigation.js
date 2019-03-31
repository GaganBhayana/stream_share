import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';

import fetchCurrentUser from '../../redux/actions/userActions';

//AVATAR IMAGE
import Avatar from '../../assets/img/avatar.jpg';

import AuthService from '../../utils/authService';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import Aux from '../../hoc/Aux';
import Overlay from '../ui/overlay/Overlay'

const Auth = new AuthService();

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();

    this.state = {
      drawerOpen: false,
      searchQuery: '',
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  handleSearch = (event) => {
    event.preventDefault();
   
    this.setState({
      searchQuery: event.target.value,
      groups: [],
      services: []
    });


    axios({
      method: 'get',
      url: `/group/search?shows=${event.target.value}`,
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
    .then(res => {
      this.setState({
        groups: res.data.sortedGroups,
        services: res.data.services
      });
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }

  handleDrawerToggle = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace('/');
  }

  closeOverlayList = () => {
    this.setState({
      searchQuery: ''
    })
  }

  render() {

    const servicesUI = (
      <div>{this.state.services? this.state.services.join(' | ') : null}</div>
    )

    const card = {
      minWidth: '180px',
      padding: '12px',
      background: 'white',
      margin: '12px',
      borderRadius: '2px',
    }

    let listItem = (
      this.state.groups ?
      this.state.groups.map((group, index) => {
        console.log(group)
        return(<div key={index} style={card}>
          <h4 style={{textAlign: 'center', fontSize: '28px'}}>{group.group.title}</h4>
          <div style={{minHeight:'200px'}}>
          {[...Array(Math.floor(group.rating))].map((rating, i) => {
            return (
              <h3 
              key = {i}
              style={{margin: '12px', color: 'yellow', fontSize: '28px', width: '100%'}} className='material-icons'>
                star_rate
              </h3>
            )
          })}
          </div>
          <h4 style={{fontSize: '24px', textAlign: 'center'}}>{'Rated: ' + group.rating}</h4>
          <Link to={`/group/${group.group._id}`} style={{paddingRight: "16px", paddingLeft: "16px", paddingBottom: "4px", paddingTop: "4px", width: '100%', marginLeft: '42px', borderRadius: '25px', color: 'white', fontSize: '18px', background: 'green'}}>
            Join
          </Link>
        </div>)
      }) 
        : null)

    return(
      <Aux>
        <Navbar
          drawerToggle = {this.handleDrawerToggle}
          changed={this.handleSearch}
          searchQuery={this.searchQuery}/>
        <Sidebar
          show={this.state.drawerOpen}
          drawerToggle={this.handleDrawerToggle}
          changed={this.handleSearch}
          logout={this.handleLogout}
          searchQuery={this.searchQuery}
          img={this.props.user.img || Avatar}/>
        <Overlay 
          show={this.state.searchQuery.length} 
          closeButton 
          clicked={this.closeOverlayList} 
          color='#333333' 
          opacity='0.89' 
          zIndex='500' 
          top='56px'>
          <div style={{height: '100%', zIndex: '600'}}>
            <div style={{color: 'white', fontSize: '28px', fontWeight: 'bold', padding: '16px', textAlign: 'center'}}>
              {servicesUI}
            </div>
            <div style={{display: 'flex', marginTop: '100px'}}>
              {listItem}
            </div>
          </div>
        </Overlay>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser.user,
  error: state.currentUser.error,
  loading: state.currentUser.loading
});

export default connect(mapStateToProps)(withRouter(Navigation));
