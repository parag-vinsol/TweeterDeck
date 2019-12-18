const initialState = {
  'tweets': localStorage.getItem('tweets') ? JSON.parse(localStorage.getItem('tweets')) : [],
  isEditModalOpen: false,
  index: -1,
  tweetText: '',
  isNewTweetModalOpen: false,
  isSearchModalOpen: false,
  searchResult: localStorage.getItem('tweets-search') ? JSON.parse(localStorage.getItem('tweets')) : [],
  searchText: '',
  toggleChange: false  
}

const reducer  = (state = initialState, action) => {
  if(action.type === "POST") {
    let tweet  = action.tweet;
    if(tweet.trim()) {
      let tweets = JSON.parse(localStorage.getItem('tweets'));
      tweets.push({'tweet-text': tweet});
      localStorage.setItem('tweets', JSON.stringify(tweets));
      return{
        ...state,
        'tweets': tweets,
        isEditModalOpen: false,
        isNewTweetModalOpen: !state.isNewTweetModalOpen
      }
    }
  }
  if(action.type === "DELETE") {
    let searchResult = state.searchResult;
    let indexToBeDeleted = IndexBasedOnTweetList(action.tweetText, state.tweets)
    let tweets = JSON.parse(localStorage.getItem('tweets'));
    tweets.reverse().splice(indexToBeDeleted, 1);
    tweets.reverse();
    if(searchResult.length) {
      let indexOfSearchResult = IndexBasedOnTweetList(action.tweetText, state.searchResult);
      searchResult.splice(indexOfSearchResult, 1);
    }
    localStorage.setItem("tweets", JSON.stringify(tweets));
    return{
      ...state,
      'tweets': tweets,
      isEditModalOpen: false,
      isNewTweetModalOpen: false,
      searchResult: searchResult
    }
  }
  if(action.type === "OPENEDITMODAL") {
    return {
        ...state,
        isEditModalOpen:true,
        index: action.index,
        tweetText: action.tweetText,
        isNewTweetModalOpen: false
    }
  }
  if(action.type === "CANCELEDIT") {
    return {
      ...state,
      isEditModalOpen:false,
      index: -1,
      tweetText: '',
      isNewTweetModalOpen: false  
    }
  }
  if(action.type === "EDIT") {
    let searchResultList = state.searchResult;
    let indexToBeEdited = IndexBasedOnTweetList(action.oldTweet, state.tweets)
    let tweets = JSON.parse(localStorage.getItem('tweets'));
    tweets.reverse();
    tweets[indexToBeEdited]['tweet-text'] = action.editText;
    tweets.reverse();
    localStorage.setItem("tweets", JSON.stringify(tweets));
    let change = null;
    if(searchResultList.length) {
      let indexOfSearchResult = IndexBasedOnTweetList(action.oldTweet, searchResultList);
      searchResultList[indexOfSearchResult]['tweet-text'] = action.editText;
      change = !state.toggleChange
    }
    return {
      ...state,
      'tweets': tweets,
      isEditModalOpen: false,
      isNewTweetModalOpen: false,
      searchResult: searchResultList,
      toggleChange: change
    }
  }
  if(action.type === "OPENADDNEWMODAL") {
    return{
      ...state,
      isNewTweetModalOpen: !state.isNewTweetModalOpen,
      isSearchModalOpen: false
    }
  }
  if(action.type === "OPENSEARCH") {
    return{
      ...state,
      isSearchModalOpen: !state.isSearchModalOpen,
      isNewTweetModalOpen: false
    }
  }
  if(action.type === "SEARCHTWEET") {
    let searchResult = state.searchResult
    state.searchText = action.searchText;
    if(state.searchText) {
      let myPattern = new RegExp('(\\w*' + state.searchText + '\\w*)','gi');
      state.tweets.forEach(element => {
        if((element['tweet-text'].match(myPattern))) {
          searchResult.unshift(element)
        }
      });
    }  
    return {
      ...state,
      searchResult: searchResult,
      isSearchModalOpen: !state.isSearchModalOpen
    }
  }
  if(action.type === "CLOSESEARCHBLOCK") {
    let searchResultList = [];
    return {
      ...state,
      searchResult: searchResultList
    }
  }
  return state;
}

const IndexBasedOnTweetList = (tweetText, tweetList) => {
  let resultIndex = null;
  tweetList.map((tweet, index) => {
    if(tweet['tweet-text'] === tweetText) {
      resultIndex = index;
      return resultIndex;
    }
  });
  return resultIndex;
}

export default reducer;
