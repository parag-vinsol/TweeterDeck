import React, { Component } from 'react';
import {connect} from 'react-redux';
import './SearchResultDisplayBlock.css'
import SingleTweetBlock from './SingleTweetBlock';

class SearchResultDisplayblock extends Component {
  render() {
    return(
      <div className="SearchResultDisplayBlock">
        <div>
          <button className="CloseBtn" onClick={this.props.closeSearchBlock}><i className="fa fa-close"></i></button>
        </div>
        <br></br>
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
    searchResultLength: state.searchResult.length,
    changesDone: state.toggleChange
  }
}
const mapDispatchToProps = dispatch => {
  return {
    closeSearchBlock: () => dispatch({type: "CLOSESEARCHBLOCK"})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResultDisplayblock);