import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import SearchResultDisplayblock from './SearchResultDisplayBlock';
import '../../Styles/SearchResult.css';
import { SEARCH_TWEET } from '../../Helper/Constants';
import { searchTags, searchRepositories } from '../../Store/Action';

class SearchResults extends Component {

  initialiseClickHandler = () => {
    this.tags = document.querySelectorAll('[data-tags = "search"]');
    this.mentions = document.querySelectorAll('[data-mentions = "search"]');
    this.repositories = document.querySelectorAll('[data-repository = "search"]');
    this.tags.forEach(element => {
      element.addEventListener("click", this.searchTags)
    });
    this.mentions.forEach(element => {
      element.addEventListener("click", this.searchMentions)
    });
    this.repositories.forEach(element => {
      element.addEventListener("click", this.searchRepository)
    })
  }
  
  componentDidMount = () => {
    this.initialiseClickHandler();
  } 
  componentDidUpdate = () => {
    this.initialiseClickHandler();
  }
  
  searchTags = (event) => {
    console.log(event.target.text, '[is the set before handler]');
    this.props.searchTweetHandler(event.target.text)
  }

  searchMentions = (event) => {
    
    this.props.searchTags(event.target.text)
  }
  
  searchRepository = (event) => {
    this.props.searchRepositories(event.target.text)
  }
  renderSearchResultDisplayblock = (searchResultList) => {
    return (
      searchResultList.map((search, index) => {
        if(search['searchResult'].length) {
          return <SearchResultDisplayblock key={index} searchResult={search} dataAttribute="search"/>
        }
      })
    )
  }

  render() {
    return(
      <div className="SearchResult">
        {this.renderSearchResultDisplayblock(this.props.searchResult)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchResult: state.searchResult,
    changesDone: state.toggleChange
  } 
}
const mapDispatchToProps = dispatch => {
  return {
    searchTweetHandler: (searchText) => dispatch({type: SEARCH_TWEET, searchText}),
    searchTags: (searchTag) => dispatch(searchTags(searchTag)),
    searchRepositories: (repositoryName) => dispatch(searchRepositories(repositoryName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);