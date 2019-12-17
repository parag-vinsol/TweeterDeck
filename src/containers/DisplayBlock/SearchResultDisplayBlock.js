import React, { Component } from 'react';
import {connect} from 'react-redux';
import './SearchResultDisplayBlock.css'
import SingleTweetBlock from './SingleTweetBlock';

class SearchResultDisplayblock extends Component {
    render() {
        console.log(this.props.searchResult)
        return(
            <div className="SearchResultDisplayBlock">
                {this.props.searchResult.map((tweet, index) => {
                    return <SingleTweetBlock key={index} tweetsToBeDisplayed={tweet['tweet-text']} tweetIndex={index} />
                })}
            </div>
        )
    }
}
// length used because searchResult is not rerendering
const mapStateToProps = state => {
    return {
        searchResult: state.searchResult,
        searchResultLength: state.searchResult.length
    }
}
export default connect(mapStateToProps)(SearchResultDisplayblock);