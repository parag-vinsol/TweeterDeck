import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import AddNewTweetModal from '../Modal/AddNewTweetModal';

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
    openNewTweetModal: () => dispatch({type: "OPENADDNEWMODAL"})
  }
}

export default connect(null ,mapDispatchToState)(AddNewTweet);