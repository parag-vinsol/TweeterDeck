import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleTweetBlock from './SingleTweetBlock';
import { SEARCH_TWEET } from '../../Helper/Constants';
import { searchTags, searchRepositories } from '../../Store/Action'
import '../../Styles/DisplayBlock.css';


class DisplayBlock extends Component{
  componentDidMount() {
    this.tags = document.querySelectorAll('[data-tags = "display"]');
    this.mentions = document.querySelectorAll('[data-mentions = "display"]');
    this.repositories = document.querySelectorAll('[data-repository = "display"]')
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
  searchTags = (event) => {
    this.props.searchTweetHandler(event.target.text)
  }
  searchMentions = (event) => {
    this.props.searchTag(event.target.text)
  }
  searchRepository = (event) => {
    this.props.searchRepositories(event.target.text)
  }
  mapToSingleTweet() {
    return (
      this.props.tweets.map((tweet, index) => (
        <SingleTweetBlock key={index}  searchText={null} tweetIndex={index} tweet={tweet} dataAttribute="display"/>
     ))
    )
  }
  render() {
    return(
      <div className="DisplayBlock">
        {this.mapToSingleTweet()} 
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    tweets: state.tweets,
    toggle: state.toggleChange
  };
};

const mapDispatchToProps = dispatch => {
  return{
    searchTweetHandler: (searchText) => dispatch({type: SEARCH_TWEET, searchText}),
    searchTag: (searchTag) => dispatch(searchTags(searchTag)),
    searchRepositories: (repositoryName) => dispatch(searchRepositories(repositoryName))
  }
}


DisplayBlock = connect(mapStateToProps, mapDispatchToProps)(DisplayBlock);
export default DisplayBlock