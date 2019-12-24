import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {OPEN_SEARCH} from '../../Helper/Constants'

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
    openSearchModal: () => dispatch({type: OPEN_SEARCH})
  }
}
SearchBlock = connect(null, mapDispatchToProps)(SearchBlock);
export default SearchBlock;