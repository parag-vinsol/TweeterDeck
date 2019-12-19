import React, { Component, Fragment } from 'react' 
import '../../Styles/AddNewTweetModal.css';
import { connect } from 'react-redux';
import * as ActionTypes from '../../Helper/Constants'

class AddNewTweetModal extends Component {
  constructor() {
    super();     
    this.state = {
        tweet:''
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
    onPostingTweet: (tweet) => dispatch({type: ActionTypes.POST, tweet})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewTweetModal);