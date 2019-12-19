import React, { Component, Fragment, createRef } from 'react';
import '../../Styles/SingleTweetBlock.css';
import { connect } from 'react-redux';
import * as ActionTypes from '../../Helper/Constants'

class SingleTweetBlock extends Component {
  render() {   
    return(
      <Fragment>
        <div className="SingleTweetBlock">
          {this.props.tweetsToBeDisplayed} 
          <br></br>
          <button className="btn" onClick={() => this.props.onDeletingTweet(this.props.id)}><i  className="fa fa-close"></i></button>
          <button className="btnEdit" onClick={() => this.props.openEditModal(this.props.id)}><i className="fa fa-edit"></i></button>
          {this.props.isEdited ? <p className="Edited">edited</p> : ''}
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
    openEditModal: (id) => dispatch({type: ActionTypes.OPEN_EDIT_MODAL, id}),
    onDeletingTweet: (id) => dispatch({type: ActionTypes.DELETE, id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTweetBlock)