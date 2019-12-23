import React, { Component, Fragment } from 'react';
import SingleTweetBlock from './SingleTweetBlock';
import '../../Styles/DisplayBlock.css';
import { connect } from 'react-redux';

class DisplayBlock extends Component{
  mapToSingleTweet = () =>(
    this.props.tweets.map((tweet, index) => (
       <SingleTweetBlock key={index} tweetsToBeDisplayed={tweet['tweet-text']} searchText={null} tweetIndex={index} isEdited={tweet['isEdited']} postedTime={tweet['postedTime']} id={tweet['id']}/>
  ))
  )
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