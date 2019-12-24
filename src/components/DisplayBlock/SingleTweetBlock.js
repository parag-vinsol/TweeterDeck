import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';

import '../../Styles/SingleTweetBlock.css';
import HighlightMatchedText from '../../Helper/HighlightMatchedText';
import {OPEN_EDIT_MODAL, DELETE} from '../../Helper/Constants';
import ValidateEditTime from '../../Helper/ValidateEditTime';


class SingleTweetBlock extends Component {
  render() {  
    let tweetToBeDisplayed = this.props.tweetsToBeDisplayed,
      visibilty = ValidateEditTime(this.props.postedTime);
    if(this.props.searchText) {
      tweetToBeDisplayed = HighlightMatchedText(this.props.searchText, this.props.tweetsToBeDisplayed)
    }
    return(
      <Fragment>
        <div className="SingleTweetBlock">
          <p dangerouslySetInnerHTML={{__html: tweetToBeDisplayed}}></p>
          <div className="optionsContainer">
            {this.props.isEdited ? <p className="Edited">edited</p> : ''}
            <p>{this.props.postedTime}</p>
            <button className={visibilty} style={{display:visibilty}} onClick={() => this.props.openEditModal(this.props.id)}><i className="fa fa-edit"></i></button>
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
    openEditModal: (id) => dispatch({type: OPEN_EDIT_MODAL, id}),
    onDeletingTweet: (id) => dispatch({type: DELETE, id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTweetBlock)