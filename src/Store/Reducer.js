const initialState = {
    'tweets': localStorage.getItem('tweets') ? JSON.parse(localStorage.getItem('tweets')) : [],
    isEditModalOpen: false,
    index: -1,
    tweetText: '',
    isNewTweetModalOpen: false,
    isSearchModalOpen: false,
    searchResult: []  
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
        let indexToBeDeleted = null;
        state.tweets.map((tweet, index) => {
            if(tweet['tweet-text'] === action.tweetText) {
                indexToBeDeleted = index;

            }
        })
        console.log(indexToBeDeleted)
        let tweets = JSON.parse(localStorage.getItem('tweets'));
        console.log(tweets);
        tweets.reverse().splice(indexToBeDeleted, 1);
        tweets.reverse();
        
        localStorage.setItem("tweets", JSON.stringify(tweets));
        return{
            ...state,
            'tweets': tweets,
            isEditModalOpen: false,
            isNewTweetModalOpen: false
        }
    }
    if(action.type === "OPENEDITMODAL") {
        return {
            ...state,
            isEditModalOpen:true,
            index: action.index,
            tweetText: JSON.parse(localStorage.getItem('tweets')).reverse()[action.index]['tweet-text'],
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
        let tweets = JSON.parse(localStorage.getItem('tweets'));
        tweets.reverse();
        tweets[action.index]['tweet-text'] = action.editText;
        tweets.reverse();
        localStorage.setItem("tweets", JSON.stringify(tweets));
        return {
            ...state,
            'tweets': tweets,
            isEditModalOpen: false,
            isNewTweetModalOpen: false
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
        console.log(searchResult)
        let searchText = action.searchText;
        if(searchText) {
            let myPattern = new RegExp('(\\w*' +searchText + '\\w*)','gi');
            state.tweets.forEach(element => {
            if((element['tweet-text'].match(myPattern))) {
                searchResult.push(element)
            }
        });
        console.log(searchResult)
        }
         
        return {
            ...state,
            searchResult: searchResult,
            isSearchModalOpen: !state.isSearchModalOpen
        }
    }
    return state;
}

export default reducer;
