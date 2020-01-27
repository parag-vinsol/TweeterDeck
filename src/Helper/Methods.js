import _ from 'underscore';

export const removeItemFromList = (id, list) => {
  return _.reject(list, list=> list.id == id);
}
export const assignId = (list) => {
  if(list == null || !list.length) {
    return 1;
  } 
  else {
    let id = null;
    let reversedList = _.sortBy(list, 'id').reverse();
    return reversedList[0]["id"];
  }
}
   
export const addNewTweet = (tweet) => {
  let tweets = JSON.parse(localStorage.getItem('tweets'));
  let id = assignId(tweets),
    date = new Date();
    let newTweetObj = setNewTweetObject(tweet, id, date);
  setNewTweetObjectInElasticDBIndex(tweet, id, date);
  return newTweetObj;
}

export const storeNewTweetInLocal = (tweetObj) => {
  let tweets = JSON.parse(localStorage.getItem('tweets'));
  if(tweets){
    tweets.unshift(tweetObj);
  }
  else{
    tweets = [];
    tweets.push(tweetObj);
  }
  
  localStorage.setItem('tweets', JSON.stringify(tweets));
  return tweets;
}

const setNewTweetObject = (tweet, id, date) => {
  let tweetObj = {
    'tweet-text': tweet, 
    isEdited: false, 
    id: id + 1,
    postedTime: date.toLocaleString()
  }
  return tweetObj;
}

const setNewTweetObjectInElasticDBIndex = (tweet, id, date) => {
  let doc = {
    "id": id +1,
    "tweet-text": tweet,
    "isEdited": false,
    "postedTime": date.toLocaleString()
  }     
  window.elasticDBIndex.addDoc(doc);
}

export const checkSearchForNewTweet = (searchResult, newTweetObj) => {
  let searchResultForParticularText = [],
    searchResultOutput = [],
    searchTexts = [],
    searchResults = searchResult;
  searchTexts = _.map(searchResults, function(searchResult){ return searchResult.searchText });
  searchTexts.forEach(searchText => {
    searchResultForParticularText = searchTweetFromText(searchText);
    let searchResultObj = saveSearchResultToObj(searchResultForParticularText, searchText, searchResultOutput);
    searchResultOutput.push(searchResultObj)
  });
  return searchResultOutput;
}
  
export const deleteFromDisplay = (id, allTweets) => {
  let tweets = JSON.parse(localStorage.getItem('tweets'));
  tweets = removeItemFromList(id, tweets)
  return tweets;
}

export const deleteFromSearchResult = (searchResult, id) => {
  let resultingSearchTweet = [];
  if(searchResult.length) {
    searchResult.forEach(element => {
      element['searchResult'] = removeItemFromList(id, element['searchResult']);
      window.elasticDBIndex.removeDocByRef(id, element['searchResult'])
      resultingSearchTweet = searchResult
    });
  }
  return resultingSearchTweet;
}
  


export const getTweetTextById = (id, allTweets) => {
  let tweetObj = _.find(allTweets, function(tweets) {return tweets["id"] == id});
  return tweetObj["tweet-text"];
}
  
export const editTweet = (id, tweetList, editText) => {
  let tweetTime = null;
  tweetList.forEach(element => {
    if(element['id'] == id) {
      element['tweet-text'] = editText;
      element['isEdited'] = true;
      tweetTime = element['postedTime']
    }
  });
  let doc = {
    "id": id,
    "tweet-text": editText,
    "isEdited": true,
    "postedTime": tweetTime
  }
  window.elasticDBIndex.updateDoc(doc);
  return tweetList;
}
  
export const editTweetForSearchResult = (tweetList) => {
  let tweetListouput = [];
  tweetList.forEach(element => {
    let searchResultForParticularText = searchTweetFromText(element["searchText"]);
    let tweetObj = saveSearchResultToObj(searchResultForParticularText, element["searchText"], tweetList);
    tweetListouput.push(tweetObj)
  });
  return tweetListouput;
}

export const searchTweetFromText = (searchText) => {
  let searchResultForParticularText = []; 
  let searchResult = window.elasticDBIndex.search(searchText, {
    fields: {
      'tweet-text': {boost: 1}
    },
    bool: "OR",
    expand: true
  });
  searchResult.map(({ ref, score }) => {
    const doc = window.elasticDBIndex.documentStore.getDoc(ref);
    searchResultForParticularText.push(doc);
  });
  return searchResultForParticularText;
}
  
export const saveSearchResultToObj = (searchResultForParticularText, searchText, searchResult) => {
  let searchResultObj = {
    id: null,
    searchResult: null,
    searchText: ""
  };
  let prevId = assignId(searchResult);
  searchResultObj['id'] = prevId + 1;
  searchResultObj['searchResult'] = searchResultForParticularText;
  searchResultObj['searchText'] = searchText;
  return searchResultObj;
}
  




