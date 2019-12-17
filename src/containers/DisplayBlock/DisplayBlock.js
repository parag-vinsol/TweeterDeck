import React, { Component, Fragment } from 'react';
import SingleTweetBlock from './SingleTweetBlock';
import './DisplayBlock.css';
import { connect } from 'react-redux';

class DisplayBlock extends Component{
    render() {
        return(
            <div className="DisplayBlock">
                {this.props.tweets.reverse().map((tweet, index) => {
                    return <SingleTweetBlock key={index} tweetsToBeDisplayed={tweet['tweet-text']} tweetIndex={index} />
                })} 
            </div>
        )
    }
}

const mapStatesToProps = state =>{
    return{
        tweets: state.tweets
    };
};



export default connect(mapStatesToProps)(DisplayBlock);