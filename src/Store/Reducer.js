const initialState = {
    'tweets': localStorage.getItem('tweets') ? JSON.parse(localStorage.getItem('tweets')) : [],
    postedTweet: false,
    isEditModalOpen: false,
    index: -1,
    tweetText: '',
    isNewTweetModalOpen: false  
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
                postedTweet: true,
                isEditModalOpen: false
            }
        }
    }
    if(action.type === "DELETE") {
        let tweets = JSON.parse(localStorage.getItem('tweets'));
        tweets.reverse().splice(action.index, 1);
        tweets.reverse();
        localStorage.setItem("tweets", JSON.stringify(tweets));
        return{
            ...state,
            'tweets': tweets,
            postedTweet: false,
            isEditModalOpen: false
        }
    }
    if(action.type === "OPENEDITMODAL") {
        return {
            ...state,
            isEditModalOpen:true,
            index: action.index,
            postedTweet: true,
            tweetText: JSON.parse(localStorage.getItem('tweets')).reverse()[action.index]['tweet-text']
        }
    }
    if(action.type === "CANCELEDIT") {
        return {
            ...state,
            isEditModalOpen:false,
            postedTweet:false,
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
            postedTweet:false,
            isEditModalOpen: false,
            isNewTweetModalOpen: false
        }
    }
    if(action.type === "OPENADDNEWMODAL") {
        return{
            ...state,
            isNewTweetModalOpen: !state.isNewTweetModalOpen
        }
    }
    return state;
}

export default reducer;
