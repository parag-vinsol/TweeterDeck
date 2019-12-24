import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleTweetBlock from './SingleTweetBlock';
import '../../Styles/DisplayBlock.css';


class DisplayBlock extends Component{
  mapToSingleTweet() {
    return (
      this.props.tweets.map((tweet, index) => (
        <SingleTweetBlock key={index} tweetsToBeDisplayed={tweet['tweet-text']} searchText={null} tweetIndex={index} isEdited={tweet['isEdited']} postedTime={tweet['postedTime']} id={tweet['id']}/>
     ))
    )
  }
  render() {
    return(
      <div className="DisplayBlock">
        {this.mapToSingleTweet()} 
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    tweets: state.tweets,
    toggle: state.toggleChange
  };
};


DisplayBlock = connect(mapStateToProps)(DisplayBlock);
export default DisplayBlock