import React, { Component, Fragment, createRef } from 'react';
import '../../Styles/SingleTweetBlock.css';
import { connect } from 'react-redux';
import * as ActionTypes from '../../Helper/Constants'

class SingleTweetBlock extends Component {
  render() {  
    let postedDateTime = new Date(this.props.postedTime);
    let presentDateTime = new Date();
    let minMinutesReq = 10;
    let validatedEdit = (presentDateTime - postedDateTime)/(1000 * 60) < minMinutesReq;
    let visibilty = "inline-block";
    if(((presentDateTime - postedDateTime)/(1000 * 60)) < minMinutesReq) {
      visibilty = "inline-none";
    }
    return(
      <Fragment>
        <div className="SingleTweetBlock">
          <p>{this.props.tweetsToBeDisplayed}</p>
          <div className="optionsContainer">
            {this.props.isEdited ? <p className="Edited">edited</p> : ''}
            <p>{this.props.postedTime}</p>
            <button className="btnEdit" style={{display:visibilty}} onClick={() => this.props.openEditModal(this.props.id)}><i className="fa fa-edit"></i></button>
            <button className="btn" onClick={() => this.props.onDeletingTweet(this.props.id)}><i  className="fa fa-close"></i></button>
            
          </div>
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