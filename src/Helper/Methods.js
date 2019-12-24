export const indexBasedOnTweetList = (id, tweetList) => {
    let resultIndex = null;
    tweetList.map((tweet, index) => {
      if(tweet['id'] === id) {
        resultIndex = index;
        return resultIndex;
      }
    });
    return resultIndex;
  }
  
export const addNewTweet = (tweet) => {
  let tweets = JSON.parse(localStorage.getItem('tweets')),
    id = getIdForTheTweet(tweets),
    date = new Date();
  tweets.unshift({'tweet-text': tweet, isEdited: false, id: id, postedTime: date.toLocaleString()});
  localStorage.setItem('tweets', JSON.stringify(tweets));
  return tweets;
}
export const getIdForTheTweet = (tweets) => {
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
  
export const deleteFromDisplay = (id, allTweets) => {
  let indexToBeDeleted = indexBasedOnTweetList(id, allTweets),
    tweets = JSON.parse(localStorage.getItem('tweets'));
  tweets.splice(indexToBeDeleted, 1);
  return tweets;
}

export const deleteFromSearchResult = (searchResult, id) => {
  if(searchResult.length) {
    let indexOfSearchResult = indexBasedOnTweetList(id, searchResult);
    searchResult.splice(indexOfSearchResult, 1);
  }
  return searchResult;
}
  
export const getTweetTextById = (id, allTweets) => {
  let tweetText = null;
  allTweets.forEach(element => {
    if(element["id"] == id) {
      tweetText = (element["tweet-text"])
    }
  });
  return tweetText
}
  
export const editTweet = (id, tweetList, editText) => {
  let tweets = [];
  tweetList.forEach(element => {
    if(element['id'] == id) {
      element['tweet-text'] = editText;
      element['isEdited'] = true;
    }
  });
  return tweetList;
}
  
export const searchTweetFromText = (searchText, tweets) => {
  let searchResultForParticularText = [];
  const SEARCH_PATTERN = new RegExp('(\\w*' + searchText + '\\w*)','gi');
  tweets.forEach(element => {
    if((element['tweet-text'].match(SEARCH_PATTERN))) {
      searchResultForParticularText.push(element);
    }
  });
  return searchResultForParticularText;
}
  
export const saveSearchResultToObj = (searchResultForParticularText, searchText, searchResult) => {
  let searchResultObj = {
    id: null,
    searchResult: null,
    searchText: ""
  };
  let prevId = getPreviousIdOfSearchResults(searchResult);
  searchResultObj['id'] = prevId + 1;
  searchResultObj['searchResult'] = searchResultForParticularText;
  searchResultObj['searchText'] = searchText;
  return searchResultObj;
}
  
export const getPreviousIdOfSearchResults = (searchResult) => {
  if(searchResult.length) {
    return searchResult[searchResult.length-1]['id'];
  }
  return -1
}

