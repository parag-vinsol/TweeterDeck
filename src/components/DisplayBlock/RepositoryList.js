import React, { Component } from 'react';
import { connect } from 'react-redux';

import Repository from './Repository';
import { CLOSE_REPOSITORY_SEARCHBLOCK } from '../../Helper/Constants'
import '../../Styles/SearchResultDisplayBlock.css'

class RepositoryList extends Component {
  renderRepository() {
    return (
      this.props.repositoryList["repositoryList"].map((repository, index) => {
        return <Repository key={index} repository={repository} />
      })
    )
  }
  render() {
    return (
      <div className="SearchResultDisplayBlock">
        <button className="CloseBtn" onClick={() => this.props.closeRepositoryBlock(this.props.repositoryList['id'])}><i className="fa fa-close"></i></button> 
        {this.renderRepository()}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeRepositoryBlock : (id) => dispatch({type: CLOSE_REPOSITORY_SEARCHBLOCK, id})
  }
}

export default connect(null, mapDispatchToProps)(RepositoryList)