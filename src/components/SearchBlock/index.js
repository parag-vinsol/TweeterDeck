import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from '../../Helper/Constants'

class SearchBlock extends Component {
  render() {
    return(
      <Fragment>
        <button onClick={this.props.openSearchModal}>Search</button>
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return{
    openSearchModal: () => dispatch({type: ActionTypes.OPEN_SEARCH})
  }
}
SearchBlock = connect(null, mapDispatchToProps)(SearchBlock);
export default SearchBlock;