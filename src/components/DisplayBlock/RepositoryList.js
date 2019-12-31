import React, { Component } from 'react';
import Repository from './Repository';
import '../../Styles/SearchResultDisplayBlock.css'

class RepositoryList extends Component {
  renderRepository() {
    return (
      this.props.repositoryList.map((repository, index) => {
        return <Repository key={index} repository={repository} />
      })
    )
  }
  render() {
    return (
      <div className="SearchResultDisplayBlock">
        {this.renderRepository()}
      </div>
    )
  }
}

export default RepositoryList