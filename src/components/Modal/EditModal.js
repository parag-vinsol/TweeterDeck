import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../../Styles/EditModal.css';
import * as ActionTypes from '../../Helper/Constants'

class EditModal extends Component {
  state = {
    tweet: this.props.tweetText,
    editingStarted: false
  }
  onChangeEditHandler = (event) => {
    this.setState({editingStarted: true, tweet: event.target.value});
  }

  static getDerivedStateFromProps(props, state) {
    if(!state.editingStarted){
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
        <button onClick={() => this.props.onEditing(this.state.tweet, this.props.id)}>Edit</button>
      </div>        
    )
  }
}
const mapStateToProp = state => {
  return{
    isEditModalOpen: state.isEditModalOpen,
    tweetText: state.tweetText,
    index: state.index,
    id: state.id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onEditing: (editedTweetText, id) => dispatch({type: ActionTypes.EDIT, editText: editedTweetText, id}),
    onCancelEdit: () => dispatch({type: ActionTypes.CANCEL_EDIT})
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(EditModal);