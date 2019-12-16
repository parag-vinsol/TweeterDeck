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
        console.log(event.target.value)
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
                
                <button onClick={() => this.props.onEditing(this.state.tweet, this.props.index)}>Edit</button>
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
        onEditing: (tweetText, index) => dispatch({type: "EDIT", editText: tweetText, index}),
        onCancelEdit: () => dispatch({type:"CANCELEDIT"})
    }
}
    export default connect(mapStageToProp, mapDispatchToProps)(EditModal);