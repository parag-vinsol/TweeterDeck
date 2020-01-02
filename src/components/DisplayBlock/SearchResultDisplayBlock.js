import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../../Styles/SearchResultDisplayBlock.css';
import {CLOSE_SEARCH_BLOCK} from '../../Helper/Constants';
import SingleTweetBlock from './SingleTweetBlock';


class SearchResultDisplayblock extends Component {
  callSingleTweet = () => {
    return(this.props.searchResult['searchResult'].map((tweet, index) => {
      return <SingleTweetBlock key={index} searchText={this.props.searchResult['searchText']} tweet={tweet} />
    }))
  }

  

  render() {
    return(
      <div className="SearchResultDisplayBlock">
        <div>
          <input type="input" disabled value={this.props.searchResult['searchText']}/>
          <button className="CloseBtn" onClick={() => this.props.closeSearchBlock(this.props.searchResult['id'])}><i className="fa fa-close"></i></button> 
        </div>
        {this.callSingleTweet()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSearchBlock: (id) => dispatch({type: CLOSE_SEARCH_BLOCK, id})
  }
}

export default connect(null, mapDispatchToProps)(SearchResultDisplayblock);