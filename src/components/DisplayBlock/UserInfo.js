import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import User from './User';
import '../../Styles/UserSearchResult.css'

class UserInfo extends Component {
  renderUserInfo = () =>{
    return(
      this.props.users.map((user, index) => {
        return (<User key={index} user={user}/>)
      })
    )
    
  }
  render() {
    return(
      <div className="UserSearchResult">
        {this.renderUserInfo()}
      </div>
      
    )
  }
}
const mapStateToProps = state => {
  return {
    users: state.users,
    changes: state.users.length,
    toggleChange: state.toggleChange
  }
}

export default connect(mapStateToProps)(UserInfo);