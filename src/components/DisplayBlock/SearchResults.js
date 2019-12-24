import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import SearchResultDisplayblock from './SearchResultDisplayBlock';
import '../../Styles/SearchResult.css'

class SearchResults extends Component {
  callSearchResultDisplayblockOneByOne = (searchResultList) => {
    return (
      searchResultList.map((search, index) => {
        if(search['searchResult'].length) {
          return <SearchResultDisplayblock key={index} searchResult={search}/>
        }
      })
    )
  }
  render() {
    return(
      <div className="SearchResult">
        {this.callSearchResultDisplayblockOneByOne(this.props.searchResult)}
      </div>
      
      
    )
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.searchResult,
    searchResultLength: state.searchResult.length,
    changesDone: state.toggleChange
  } 
}

export default connect(mapStateToProps)(SearchResults);