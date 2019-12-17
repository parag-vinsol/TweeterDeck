import React, { Component } from 'react';
import {connect} from 'react-redux';
import './SearchResultDisplayBlock.css'
import SingleTweetBlock from './SingleTweetBlock';

class SearchResultDisplayblock extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        console.log(this.props.searchResult, this.state);
        return(
            <div className="SearchResultDisplayBlock">
                {this.props.searchResult.map((tweet, index) => {
                    return <SingleTweetBlock key={index} tweetsToBeDisplayed={tweet['tweet-text']} tweetIndex={index} />
                })}
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        searchResult: state.searchResult
    }
}
export default connect(mapStateToProps)(SearchResultDisplayblock);