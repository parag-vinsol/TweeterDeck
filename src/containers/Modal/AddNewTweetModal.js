import React, { Component, Fragment } from 'react' 
import './AddNewTweetModal.css';
import DisplayBlock from '../DisplayBlock/DisplayBlock';
import { connect } from 'react-redux';

class AddNewTweetModal extends Component {
  constructor() {
    super();     
    this.state = {
        tweet:''
    }
    if(!localStorage.getItem('tweets')) {
      localStorage.setItem('tweets', JSON.stringify([]));
    }
  }
    
    

  onWritingTweetHandler = (event) => {
    this.setState({tweet: event.target.value});
  }
    
  render() {
    return(
      <Fragment>
      {this.props.isAddNewTweetModalOpen ? null : (<div className="AddNewTweetModal">
        <h2>Tweet</h2>
        <textarea onChange={this.onWritingTweetHandler} placeholder="What's happening?" value={this.state.tweet}></textarea>
        <button onClick={() => this.props.onPostingTweet(this.state.tweet)}>Post Tweet</button>
      </div>)}
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
    onPostingTweet: (tweet) => dispatch({type: 'POST', tweet})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewTweetModal);