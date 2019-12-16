import React, { Component } from 'react';
import './SearchModal.css'

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
                <button onClick={this.searchTweetHandler}>Search</button>
            </div>
        )
    }
}

export default SearchModal;