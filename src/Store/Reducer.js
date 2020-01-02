import * as ActionTypes from '../Helper/Constants';
import * as Methods from '../Helper/Methods';
import _ from 'underscore'

const initialState = {
  'tweets': localStorage.getItem('tweets') ? JSON.parse(localStorage.getItem('tweets')) : [],
  isEditModalOpen: false,
  index: -1,
  tweetText: '',
  isTweetEdited: false,
  isNewTweetModalOpen: false,
  isSearchModalOpen: false,
  searchResult: [],
  searchText: '',
  toggleChange: false,
  id: null,
  users: [],
  repositories: []
}

const reducer  = (state = initialState, action) => {
  if(action.type === ActionTypes.POST) {
    let tweet  = action.tweet;
    if(tweet.trim()) {
      let tweets = Methods.addNewTweet(tweet),
      searchResult = Methods.checkSearchForNewTweet(state.searchResult);
      return{
        ...state,
        'tweets': tweets,
        isEditModalOpen: false,
        isNewTweetModalOpen: !state.isNewTweetModalOpen,
        searchResult: searchResult
      }
    }
  }
  if(action.type === ActionTypes.DELETE) {
    let searchResult = state.searchResult;
    let  tweets = Methods.deleteFromDisplay(action.id, state.tweets),
      searchResultReturned = Methods.deleteFromSearchResult(searchResult, action.id);
    localStorage.setItem("tweets", JSON.stringify(tweets));
    return{
      ...state,
      'tweets': tweets,
      isEditModalOpen: false,
      isNewTweetModalOpen: false,
      searchResult: searchResultReturned
    }
  }
  if(action.type === ActionTypes.OPEN_EDIT_MODAL) {
    let tweet = Methods.getTweetTextById(action.id, state.tweets);
    return {
        ...state,
        isEditModalOpen:true,
        index: action.index,
        tweetText: tweet,
        isNewTweetModalOpen: false,
        id: action.id
    }
  }
  if(action.type === ActionTypes.CANCEL_EDIT) {
    return {
      ...state,
      isEditModalOpen:false,
      index: -1,
      tweetText: '',
      isNewTweetModalOpen: false,
      id: null  
    }
  }
  if(action.type === ActionTypes.EDIT) {
    let editedTweets = Methods.editTweet(action.id, state.tweets, action.editText),
      searchResultList = state.searchResult;
    localStorage.setItem("tweets", JSON.stringify(editedTweets));
    let change = null;
    if(searchResultList.length) {
      searchResultList = Methods.editTweetForSearchResult(action.id, state.searchResult, action.editText);
      change = !state.toggleChange
     }
    return {
      ...state,
      'tweets': editedTweets,
      isEditModalOpen: false,
      isNewTweetModalOpen: false,
      searchResult: searchResultList,
      toggleChange: change
    }
  }
  if(action.type === ActionTypes.OPEN_ADD_NEW_MODAL) {
    return{
      ...state,
      isNewTweetModalOpen: !state.isNewTweetModalOpen,
      isSearchModalOpen: false
    }
  }
  if(action.type === ActionTypes.OPEN_SEARCH) {
    return{
      ...state,
      isSearchModalOpen: !state.isSearchModalOpen,
      isNewTweetModalOpen: false
    }
  }
  if(action.type === ActionTypes.SEARCH_TWEET) {
      let searchResultForParticularText = [],
      searchResult = state.searchResult,
      searchText = action.searchText;
    if(searchText) {
      searchResultForParticularText = Methods.searchTweetFromText(searchText, state.tweets);
      let searchResultObj = Methods.saveSearchResultToObj(searchResultForParticularText, searchText, searchResult);
      searchResult.push(searchResultObj)
    } 
    return {
      ...state,
      searchResult: searchResult,
      isSearchModalOpen: false,
      toggleChange: !state.toggleChange
    }
  }
  if(action.type === ActionTypes.CLOSE_SEARCH_BLOCK) {
    let searchResultList = state.searchResult;
    searchResultList = Methods.removeItemFromList(action.id, searchResultList);
    return {
      ...state,
      searchResult: searchResultList,
      toggleChange: !state.toggleChange
    }
  }
  if(action.type === ActionTypes.SEARCH_TAGS) {
    return {
      ...state,
      users: [...state.users, action.user],
      toggleChange: !state.toggleChange
    }
  }

  if(action.type === ActionTypes.CLOSE_USER_BLOCK) {
    let users = _(state.users).filter(function(item) {
      return item.id !== action.id
    })
    return{
      ...state,
      users: users
    }
  }
  if(action.type === ActionTypes.SEARCH_REPOSITORIES) {
    let repo = state.repositories;
    let newId = Methods.getIdForRepo(repo);
    let repositoryObj = {
      id: newId,
      repositoryList: action.repositoryList
    }
    repo.push(repositoryObj);
    return {
      ...state,
      repositories: repo,
      toggleChange: !state.toggleChange
    }
  }
  if(action.type === ActionTypes.CLOSE_REPOSITORY_SEARCHBLOCK) {
    let repositories = _(state.repositories).filter(function(item) {
      return item.id !== action.id
    })
    return {
      ...state,
      repositories: repositories
    }
  }
  return state;  
}

export default reducer;
