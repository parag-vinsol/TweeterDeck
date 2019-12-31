import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';

import '../../Styles/SingleTweetBlock.css';
import HighlightMatchedText from '../../Helper/HighlightMatchedText';
import { OPEN_EDIT_MODAL, DELETE, URL_REGEX, TAGS_REGEX, MENTION_TAGS, REPOSITORY_TAGS } from '../../Helper/Constants';
import ValidateEditTime from '../../Helper/ValidateEditTime';


class SingleTweetBlock extends Component {
  URL_Tags_MentionsHandler = () => {
    let tweet = this.props.tweetsToBeDisplayed;
    let finalTweet = [];
    tweet.split(' ').forEach(element => {
      if(element.match(URL_REGEX)) {
        finalTweet.push(`<a target='_blank' href='//${element.match(URL_REGEX)[0]}'>${element.match(URL_REGEX)[0]}<a>`);
      }
      else if(element.match(TAGS_REGEX)) {
        finalTweet.push(`<a data-tags=tags class="hover">${element.match(TAGS_REGEX)[0]}</a>`);
      }
      else if(element.match(MENTION_TAGS)) {
        finalTweet.push(`<a data-mentions=mentions class="hover">${element.match(MENTION_TAGS)[0]}</a>`);
      }
      else if(element.match(REPOSITORY_TAGS)) {
        finalTweet.push(`<a data-repository=repository class="hover">${element.match(REPOSITORY_TAGS)[0]}</a>`);
      }
      else {
        finalTweet.push(element);
      }
    })
    let newTweet = finalTweet.join(' ');
    return newTweet;
  }
  render() {  
    let tweetToBeDisplayed = this.URL_Tags_MentionsHandler(),
      visibilty = ValidateEditTime(this.props.postedTime);
    if(this.props.searchText) {
      tweetToBeDisplayed = HighlightMatchedText(this.props.searchText, tweetToBeDisplayed)
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