import React, { Component, Fragment } from 'react';
import './ActionBlock.css';
import AddNewTweet from '../AddNewTweet/AddNewTweet';
import SearchBlock from '../SearchBlock/SearchBlock';
import DisplayBlock from '../DisplayBlock/DisplayBlock';
import EditModal from '../Modal/EditModal';
import { connect } from 'react-redux';
import AddNewTweetModal from '../Modal/AddNewTweetModal';
import SearchModal from '../Modal/SearchModal';
import SearchResultDisplayblock from '../DisplayBlock/SearchResultDisplayBlock';

class ActionBlock extends Component {
  render() {
    return(
      <Fragment>
        <header className="ActionBlock">
          <AddNewTweet />
          <SearchBlock />
        </header>
        <DisplayBlock />
        {this.props.isNewTweetModalOpen ? <AddNewTweetModal />: ''}
        {this.props.isEditModalOpen ? <EditModal /> : '' }
        {this.props.isSearchModalOpen ? <SearchModal />: ''}
        {this.props.searchResult ? <SearchResultDisplayblock />: ''}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isNewTweetModalOpen: state.isNewTweetModalOpen,
    isEditModalOpen: state.isEditModalOpen,
    isSearchModalOpen: state.isSearchModalOpen,
    searchResult: state.searchResult.length
  }
}

export default connect(mapStateToProps)(ActionBlock);