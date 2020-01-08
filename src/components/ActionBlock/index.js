import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import '../../Styles/ActionBlock.css';
import AddNewTweetButton from '../AddNewTweet';
import AddNewTweetModal from '../Modal/AddNewTweetModal';
import DisplayBlock from '../DisplayBlock';
import EditModal from '../Modal/EditModal';
import SearchBlockButton from '../SearchBlock';
import SearchModal from '../Modal/SearchModal';   
import SearchResult from '../DisplayBlock/SearchResults'
import UserInfo from '../DisplayBlock/UserInfo';
import Repositories from '../DisplayBlock/Repositories';

class ActionBlock extends Component {
  
  render() {
    return(
      <Fragment>
        <header className="ActionBlock">
          <AddNewTweetButton />
          <SearchBlockButton />
        </header>
        <DisplayBlock />
        {this.props.isNewTweetModalOpen && <AddNewTweetModal />}
        {this.props.isEditModalOpen && <EditModal />  }
        {this.props.isSearchModalOpen && <SearchModal />}
        {this.props.searchResult && <SearchResult />}
        {this.props.users && <UserInfo />}
        {this.props.repositories && <Repositories /> }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isNewTweetModalOpen: state.isNewTweetModalOpen,
    isEditModalOpen: state.isEditModalOpen,
    isSearchModalOpen: state.isSearchModalOpen,
    searchResult: state.searchResult,
    changesDone: state.toggleChange,
    users: state.users,
    usersLength: state.users.length,
    repositories: state.repositories,
    repoLength: state.repositories.length
  }
}

ActionBlock = connect(mapStateToProps)(ActionBlock);

export default ActionBlock;