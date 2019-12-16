import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import AddNewTweetModal from '../Modal/AddNewTweetModal';

class AddNewTweet extends Component {
    render() {
        return(
            <Fragment>
                <button onClick={this.props.openNewTweetModal}>New Tweet</button>
                
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isNewTweetModalOpen : state.isNewTweetModalOpen
    }
    
}
const mapDispatchToState = dispatch => {
    return {
        openNewTweetModal: () => dispatch({type: "OPENADDNEWMODAL"})
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AddNewTweet);