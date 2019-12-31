import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CLOSE_USER_BLOCK } from '../../Helper/Constants';
import '../../Styles/SearchResultDisplayBlock.css'

class User extends Component {
  render() {
    return(
      <div className="SearchResultDisplayBlock">
        <button className="CloseBtn" onClick={() => this.props.closeUserBlock(this.props.user['id'])}><i className="fa fa-close"></i></button> 
        <img className="image-width" src={this.props.user["picURL"]}></img>
        <p>Name: {this.props.user["name"]}</p>
        <p>Company Name: <a target="_blank" href={this.props.user["company"]}>{this.props.user["company"]}</a></p>
        <p>Followers: {this.props.user["followers"]}</p>
        <p>Following: {this.props.user["following"]}</p>
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