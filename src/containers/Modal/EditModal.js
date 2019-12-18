import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './EditModal.css';

class EditModal extends Component {
  state = {
    tweet: this.props.tweetText,
    EditingStarted: false
  }
  onChangeEditHandler = (event) => {
    this.setState({EditingStarted: true})
    this.setState({tweet: event.target.value})
  }

  static getDerivedStateFromProps(props, state) {
    if(!state.EditingStarted){
      return {tweet: props.tweetText};
    }
    return null
      
  }
  render() {
    return(
      <div className="EditModal">
        <button className="CloseBtn" onClick={this.props.onCancelEdit}><i  className="fa fa-close"></i></button>
        <h2>Edit Tweet</h2>
        <textarea value={this.state.tweet} onChange={this.onChangeEditHandler}></textarea>
        <button onClick={() => this.props.onEditing(this.state.tweet, this.props.tweetText)}>Edit</button>
      </div>        
    )
  }
}
const mapStageToProp = state => {
  return{
    isEditModalOpen: state.isEditModalOpen,
    tweetText: state.tweetText,
    index: state.index
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onEditing: (editedTweetText, oldTweet) => dispatch({type: "EDIT", editText: editedTweetText, oldTweet}),
    onCancelEdit: () => dispatch({type:"CANCELEDIT"})
  }
}
export default connect(mapStageToProp, mapDispatchToProps)(EditModal);