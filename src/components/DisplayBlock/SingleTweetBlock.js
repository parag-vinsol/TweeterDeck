import React, { Component, Fragment, createRef } from 'react';
import '../../Styles/SingleTweetBlock.css';
import { connect } from 'react-redux';
import * as ActionTypes from '../../Helper/Constants'

class SingleTweetBlock extends Component {
  render() {  
    let tweetToBeDisplayed = "";
    let postedDateTime = new Date(this.props.postedTime);
    let presentDateTime = new Date();
    let minMinutesReq = 10;
    let visibilty = "";
    if(((presentDateTime - postedDateTime)/(1000 * 60)) < minMinutesReq) {
      visibilty = "none";
    }
    if(this.props.searchText) {
      tweetToBeDisplayed = this.props.tweetsToBeDisplayed.replace(this.props.searchText, "<mark>$&</mark>")
    }
    else {
      tweetToBeDisplayed = this.props.tweetsToBeDisplayed;
    }
    return(
      <Fragment>
        <div className="SingleTweetBlock">
          <p dangerouslySetInnerHTML={{__html: tweetToBeDisplayed}}></p>
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