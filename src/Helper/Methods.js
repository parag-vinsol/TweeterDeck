import _ from 'underscore';

export const removeItemFromList = (id, list) => {
  let result = _(list).filter(function(item) {
    return item.id !== id; 
  });
  return result;
}
  
export const addNewTweet = (tweet) => {
  let tweets = JSON.parse(localStorage.getItem('tweets')),
    id = getIdForTheTweet(tweets),
    date = new Date();
  tweets.unshift({'tweet-text': tweet, isEdited: false, id: id, postedTime: date.toLocaleString()});
  let doc = {
    "id": id,
    "tweet-text": tweet,
    "isEdited": false,
    "postedTime": date.toLocaleString()
  }     
  window.elasticDBIndex.addDoc(doc);
  localStorage.setItem('tweets', JSON.stringify(tweets));
  return tweets;
}

export const checkSearchForNewTweet = (searchResult) => {
  let searchResultForParticularText = [];
  let searchResultOutput = []
  if(searchResult.length) {
    let allTweets = JSON.parse(localStorage.getItem('tweets')),
      searchTexts = [];
    let searchResults = searchResult;
    searchResults.forEach(element => {
      searchTexts.push(element['searchText'])
    });
    searchTexts.forEach(searchText => {
      searchResultForParticularText = searchTweetFromText(searchText, allTweets);
      let searchResultObj = saveSearchResultToObj(searchResultForParticularText, searchText, searchResult);
      searchResultOutput.push(searchResultObj)
    });
  }
  
  return searchResultOutput;
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
  let tweets = JSON.parse(localStorage.getItem('tweets'));
  tweets = removeItemFromList(id, tweets)
  return tweets;
}

export const deleteFromSearchResult = (searchResult, id) => {
  let resultingSearchTweet = [];
  if(searchResult.length) {
    searchResult.forEach(element => {
      element['searchResult'] = removeItemFromList(id, element['searchResult']);
      let searchTweetObj = {
        id: null,
        searchResult: null,
        searchText: ''
      }
      searchTweetObj['id'] = element['id'];
      searchTweetObj['searchResult'] = element['searchResult'];
      searchTweetObj['searchText'] = element['searchText'];
      resultingSearchTweet.push(searchTweetObj)
      console.log(resultingSearchTweet)
    });
    
  }
  return resultingSearchTweet;
  
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
  tweetList.forEach(element => {
    if(element['id'] == id) {
      element['tweet-text'] = editText;
      element['isEdited'] = true;
    }
  });
  return tweetList;
}
  
export const editTweetForSearchResult = (id, tweetList, editText) => {
  tweetList.forEach(element => {
    element['searchResult'].forEach(searchElement => {
      if(searchElement['id'] == id) {
        searchElement['tweet-text'] = editText;
        searchElement['isEdited'] = true;
      }
    })
    
  });
  return tweetList;
}

export const searchTweetFromText = (searchText, tweets) => {
  let searchResultForParticularText = []; 
  let searchResult = window.elasticDBIndex.search(searchText, {
    fields: {
        'tweet-text': {boost: 1}
    },
    bool: "OR",
    expand: true,
    highlight: true
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

export const getIdForRepo = (repo) => {
  let id = -1;
  repo.forEach(element => {
    id = element["id"];
  })
  return id + 1;
}

