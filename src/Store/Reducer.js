import * as ActionTypes from '../Helper/Constants';

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
  searchCounter: -1  
}



const reducer  = (state = initialState, action) => {
  if(action.type === ActionTypes.POST) {
    let tweet  = action.tweet;
    if(tweet.trim()) {
      let tweets = addNewTweet(tweet);
      return{
        ...state,
        'tweets': tweets,
        isEditModalOpen: false,
        isNewTweetModalOpen: !state.isNewTweetModalOpen
      }
    }
  }
  if(action.type === ActionTypes.DELETE) {
    let searchResult = state.searchResult;
    let tweets = deleteFromDisplay(action.id, state.tweets);
    let searchResultReturned = deleteFromSearchResult(searchResult, action.id);
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
    let tweet = getTweetTextById(action.id, state.tweets);
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
    let editedTweets = EditTweet(action.id, state.tweets, action.editText);
    let searchResultList = state.searchResult;
    localStorage.setItem("tweets", JSON.stringify(editedTweets));
    let change = null;
    if(searchResultList.length) {
      searchResultList = EditTweet(action.id, state.searchResult, action.editText);
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
    let counter = state.searchCounter + 1;
    let searchResultForParticularText = [];
    let searchResult = state.searchResult;
    let searchText = action.searchText;
    if(searchText) {
      const SEARCH_PATTERN = new RegExp('(\\w*' + searchText + '\\w*)','gi');
      state.tweets.forEach(element => {
        if((element['tweet-text'].match(SEARCH_PATTERN))) {
          searchResultForParticularText.push(element);
        }
      });
      searchResult.push(searchResultForParticularText)
    }  
    return {
      ...state,
      searchResult: searchResult,
      isSearchModalOpen: !state.isSearchModalOpen,
      searchText: searchText,
      searchCounter: counter
    }
  }
  if(action.type === ActionTypes.CLOSE_SEARCH_BLOCK) {
    let searchResultList = state.searchResult;    
    searchResultList[action.searchCounter] = [];
    return {
      ...state,
      searchResult: searchResultList,
      toggleChange: !state.toggleChange

    }
  }
  return state;
}

const IndexBasedOnTweetList = (id, tweetList) => {
  let resultIndex = null;
  tweetList.map((tweet, index) => {
    if(tweet['id'] === id) {
      resultIndex = index;
      return resultIndex;
    }
  });
  return resultIndex;
}

const addNewTweet = (tweet) => {
  let tweets = JSON.parse(localStorage.getItem('tweets'));
  let id = getIdForTheTweet(tweets); 
  let date = new Date();
  tweets.unshift({'tweet-text': tweet, isEdited: false, id: id, postedTime: date.toLocaleString()});
  localStorage.setItem('tweets', JSON.stringify(tweets));
  return tweets;
}
const getIdForTheTweet = (tweets) => {
  if(tweets.length === 0) {
    return 1;
  } 
  else {
    let id = null;
    tweets.forEach(element => {
      if(id <= element["id"]) {
        id = element["id"]
      }
    });
    return id + 1;
  }
}

const deleteFromDisplay = (id, allTweets) => {
  let indexToBeDeleted = IndexBasedOnTweetList(id, allTweets);
  let tweets = JSON.parse(localStorage.getItem('tweets'));
  tweets.splice(indexToBeDeleted, 1);
  return tweets;
}
const deleteFromSearchResult = (searchResult, id) => {
  if(searchResult.length) {
    let indexOfSearchResult = IndexBasedOnTweetList(id, searchResult);
    searchResult.splice(indexOfSearchResult, 1);
  }
  return searchResult;
}
const getTweetTextById = (id, allTweets) => {
  let tweetText = null;
  allTweets.forEach(element => {
    if(element["id"] == id) {
      tweetText = (element["tweet-text"])
    }
  });
  return tweetText
}
const EditTweet = (id, tweetList, editText) => {
  let tweets = [];
  tweetList.forEach(element => {
    if(element['id'] == id) {
      element['tweet-text'] = editText;
      element['isEdited'] = true;
    }
  });
  return tweetList;
}

export default reducer;
