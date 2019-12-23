import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchResultDisplayblock from './SearchResultDisplayBlock';
import '../../Styles/SearchResult.css'

class SearchResults extends Component {
  render() {
    return(
      <div className="SearchResult">
        {this.props.searchResult.map((search, index) => {
          if(search.length) {
            return (<SearchResultDisplayblock key={index} searchResult={search} searchText={this.props.searchText} searchCounter={index}/>)
          }
        })}
      </div>
      
      
    )
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.searchResult,
    counter: state.searchCounter,
    searchResultLength: state.searchResult.length,
    changesDone: state.toggleChange,
    searchText: state.searchText,
    toggleChange: state.toggleChange
  } 
}

export default connect(mapStateToProps)(SearchResults);