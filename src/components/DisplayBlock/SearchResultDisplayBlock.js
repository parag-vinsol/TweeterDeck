import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../../Styles/SearchResultDisplayBlock.css'
import SingleTweetBlock from './SingleTweetBlock';
import * as ActionTypes from '../../Helper/Constants'

class SearchResultDisplayblock extends Component {
  render() {
    return(
      <div className="SearchResultDisplayBlock">
        <div>
          <input type="input" disabled value={this.props.searchText}/>
          {<button className="CloseBtn" onClick={() => this.props.closeSearchBlock(this.props.searchCounter)}><i className="fa fa-close"></i></button> }
        </div>
        {this.props.searchResult.map((tweet, index) => {
          return <SingleTweetBlock key={index} searchText={this.props.searchText} tweetsToBeDisplayed={tweet['tweet-text']} tweetIndex={index} postedTime={tweet['postedTime']} isEdited={tweet['isEdited']} id={tweet['id']} />
        })}
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => {
  return {
    closeSearchBlock: (searchCounter) => dispatch({type: ActionTypes.CLOSE_SEARCH_BLOCK, searchCounter})
  }
}

export default connect(null, mapDispatchToProps)(SearchResultDisplayblock);