import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../Styles/SearchModal.css';
import * as ActionTypes from '../../Helper/Constants';

class SearchModal extends Component {
  state = {
    search: ''
  }
  
  searchTextSetter = (event) => {
    this.setState({search: event.target.value.trim()})
  }

  searchTweetHandler = () => {
    let searchText = this.state.search;
    if(searchText) {
        let tweets = JSON.parse(localStorage.getItem('tweets'));
        for(let i in tweets) {
            let tweetText = tweets[i]["tweet-text"];
        }
    }    
  }
  
  render() {
    return(
      <div className="SearchModal">
        <h2>search</h2>
        <input type="text" onChange={this.searchTextSetter} placeholder="Search" value={this.state.search} />
        <button onClick={() => this.props.searchTweetHandler(this.state.search)}>Search</button>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return{
    searchTweetHandler: (searchText) => dispatch({type: ActionTypes.SEARCH_TWEET, searchText})
  }
}

export default connect(null, mapDispatchToProps)(SearchModal);