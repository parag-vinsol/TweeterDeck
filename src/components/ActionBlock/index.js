import React, { Component, Fragment } from 'react';
import '../../Styles/ActionBlock.css';
import AddNewTweet from '../AddNewTweet';
import SearchBlock from '../SearchBlock';
import DisplayBlock from '../DisplayBlock';
import EditModal from '../Modal/EditModal';
import { connect } from 'react-redux';
import AddNewTweetModal from '../Modal/AddNewTweetModal';
import SearchModal from '../Modal/SearchModal';
import SearchResult from '../DisplayBlock/SearchResults'

class ActionBlock extends Component {
  render() {
    return(
      <Fragment>
        <header className="ActionBlock">
          <AddNewTweet />
          <SearchBlock />
        </header>
        <DisplayBlock />
        {this.props.isNewTweetModalOpen && <AddNewTweetModal />}
        {this.props.isEditModalOpen && <EditModal />  }
        {this.props.isSearchModalOpen && <SearchModal />}
        {this.props.searchResult ? <SearchResult /> : ''}
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

ActionBlock = connect(mapStateToProps)(ActionBlock);

export default ActionBlock;