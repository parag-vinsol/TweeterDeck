import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../Styles/SearchModal.css';
import {SEARCH_TWEET} from '../../Helper/Constants';

class SearchModal extends Component {
  state = {
    search: ''
  }
  
  searchTextSetter = (event) => {
    this.setState({search: event.target.value.trim()})
  }
  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    this.inputRef = React.createRef();
    return(
      <div className="SearchModal">
        <h2>search</h2>
        <input type="text" ref={this.inputRef} onChange={this.searchTextSetter} placeholder="Search" value={this.state.search} />
        <button onClick={() => this.props.searchTweetHandler(this.state.search)}>Search</button>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return{
    searchTweetHandler: (searchText) => dispatch({type: SEARCH_TWEET, searchText})
  }
}

export default connect(null, mapDispatchToProps)(SearchModal);