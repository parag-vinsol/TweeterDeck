import React, { Component, Fragment, createRef } from 'react';
import './SingleTweetBlock.css';
import { connect } from 'react-redux';

class SingleTweetBlock extends Component {
  render() {   
    return(
      <Fragment>
        <div className="SingleTweetBlock">
          {this.props.tweetsToBeDisplayed} 
          <button className="btnEdit" onClick={() => this.props.openEditModal(this.props.tweetsToBeDisplayed)}><i className="fa fa-edit"></i></button>
          <button className="btn" onClick={() => this.props.onDeletingTweet(this.props.tweetsToBeDisplayed)}><i  className="fa fa-close"></i></button>
          
        </div>
      </Fragment>
        
    )
  }
}
const mapStateToProps = state => {
  return {
    tweets: state.tweets,
    isEditModalOpen: state.isEditModalOpen,
    index: state.index,
    tweetText: state.tweetText
  }
}
const mapDispatchToProps = dispatch => {
  return {
    openEditModal: (tweetText) => dispatch({type: "OPENEDITMODAL", tweetText}),
    onDeletingTweet: (tweetText) => dispatch({type: "DELETE", tweetText})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTweetBlock)