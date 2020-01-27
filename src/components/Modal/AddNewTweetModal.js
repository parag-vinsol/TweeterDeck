import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import '../../Styles/AddNewTweetModal.css';
import FetchLengthOfTweet from '../../Helper/FetchLengthOfTweet'
import { POST, MAX_LENGTH_OF_TWEET } from '../../Helper/Constants'

class AddNewTweetModal extends Component {
  constructor() {
    super();     
    this.state = {
        tweet:'',
        counter: MAX_LENGTH_OF_TWEET
    }
  }
    
    

  onWritingTweetHandler = (event) => {
    let val = event.target.value,
      length = FetchLengthOfTweet(val);    
    this.setState({tweet: val, counter: length});    
  }
    
  render() {
    return(
      <Fragment>
      <div className="AddNewTweetModal">
        <h2>Tweet</h2>
        <textarea onChange={this.onWritingTweetHandler} placeholder="What's happening?" value={this.state.tweet}></textarea>
        <button disabled={this.state.counter < 0 } onClick={this.props.onPostingTweet.bind(null, this.state.tweet)}>Post Tweet</button>
        <p>{this.state.counter}</p>
      </div>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return{
    tweets: state.tweets,
    isAddNewTweetModalOpen: state.isAddNewTweetModalOpen
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPostingTweet: (tweet) => dispatch({type: POST, tweet})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewTweetModal);