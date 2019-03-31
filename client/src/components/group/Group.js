import React, { Component } from 'react'
import axios from '../../utils/axios';
import AuthService from '../../utils/authService';
import {withRouter} from 'react-router-dom';
import classes from  './Group.css';

const Auth = new AuthService();

class Group extends Component {

  constructor(props) {
    super(props);

    this.state = {
      group: null
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/group/${this.props.match.params.id}`,
      headers: {
        'x-access-token': Auth.getToken()
      }
    })
    .then(res => this.setState({group: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    const {group} = this.state;
    console.log(group)
    console.log('rendering')


    return (
      <div style={{height: '100%',
        fontSize: '68px',
          fontFamily: 'Germania One',
        padding: '16px', 
     paddingTop: '100px',
    textAlign: 'center'}}
    className={classes.Group}>
        {group !== null ? group.title : 'Loading...'}

        {group !== null ? <h3 style={{marginTop: '190px',color: 'white', textAlign: 'center'}}>Your request has been submitted. You will be notified when it will be accepted.</h3>: null}
      </div>
    )
  }
}

export default withRouter(Group);
