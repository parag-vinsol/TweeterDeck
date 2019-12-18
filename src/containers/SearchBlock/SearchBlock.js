import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchModal from '../Modal/SearchModal';

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
    openSearchModal: () => dispatch({type: "OPENSEARCH"})
  }
}
export default connect(null, mapDispatchToProps)(SearchBlock);