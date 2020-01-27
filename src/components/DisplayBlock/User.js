import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CLOSE_USER_BLOCK } from '../../Helper/Constants';
import '../../Styles/SearchResultDisplayBlock.css'

class User extends Component {
  render() {
    let {id, avatar_url, name, company, followers, following} = this.props.user;
    return(
      <div className="SearchResultDisplayBlock">
        <button className="CloseBtn" onClick={this.props.closeUserBlock.bind(null, id)}><i className="fa fa-close"></i></button> 
        <img className="image-width" src={avatar_url}></img>
        <p>Name: {name}</p>
        <p>Company Name: <a target="_blank" rel="noopener noreferrer" href={company}>{company}</a></p>
        <p>Followers: {followers}</p>
        <p>Following: {following}</p>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    closeUserBlock: (id) => dispatch({type: CLOSE_USER_BLOCK, id})
  }
}

export default connect(null, mapDispatchToProps)(User);