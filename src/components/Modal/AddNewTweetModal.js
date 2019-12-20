import React, { Component, Fragment } from 'react' 
import '../../Styles/AddNewTweetModal.css';
import { connect } from 'react-redux';
import * as ActionTypes from '../../Helper/Constants'

class AddNewTweetModal extends Component {
  constructor() {
    super();     
    this.state = {
        tweet:'',
        counter: 160
    }
  }
    
    

  onWritingTweetHandler = (event) => {
    
    let val = event.target.value;
    let urlLength = 0;
    let length = val.length;
    let urlLengthToBeCounted = 0;
    const URL_REGEX = /^(ftp|https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*$/
    const TAGS_REGEX = /^(#.+)$/
    let words = val.split(' ');
    let latestWord = words[words.length-1];
    words.reverse().forEach(element => {
      if(element.match(URL_REGEX)) {
        urlLength = element.match(URL_REGEX).input.length;
        urlLengthToBeCounted = urlLengthToBeCounted + 8;
        length = length - urlLength;
      }
      else if(element.match(TAGS_REGEX)) {
        urlLength = element.match(TAGS_REGEX).input.length;
        length = length - urlLength
      }
      
    });
    
    this.setState({tweet: val, counter: 160 - length - urlLengthToBeCounted});    
  }
    
  render() {
    return(
      <Fragment>
      {this.props.isAddNewTweetModalOpen ? null : (<div className="AddNewTweetModal">
        <h2>Tweet</h2>
        <textarea onChange={this.onWritingTweetHandler} placeholder="What's happening?" value={this.state.tweet}></textarea>
        <button disabled={this.state.counter < 0 } onClick={() => this.props.onPostingTweet(this.state.tweet)}>Post Tweet</button>
        <p>{this.state.counter}</p>
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