import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {OPEN_ADD_NEW_MODAL} from '../../Helper/Constants'

class AddNewTweet extends Component {
  render() {
    return(
      <Fragment>
        <button onClick={this.props.openNewTweetModal}>New Tweet</button>
      </Fragment>
    )
  }
}
const mapDispatchToState = dispatch => {
  return {
    openNewTweetModal: () => dispatch({type: OPEN_ADD_NEW_MODAL})
  }
}

AddNewTweet = connect(null ,mapDispatchToState)(AddNewTweet);
export default AddNewTweet;