import React, { Component } from 'react';
import { connect } from 'react-redux';
import RepositoryList from './RepositoryList';
import '../../Styles/SearchResult.css'

class Repositories extends Component {
  renderRepositoryList = () => {
    return (
      this.props.repositories.map((repositoryList, index) => {
        return <RepositoryList key={index} repositoryList={repositoryList} />
      })
    )
  }
  render() {
    return(
      <div className="SearchResult">
        {this.renderRepositoryList()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    repositories: state.repositories,
    length: state.repositories.length
  }
}

export default connect(mapStateToProps)(Repositories);