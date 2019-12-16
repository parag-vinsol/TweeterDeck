import React, { Component, Fragment } from 'react';
import 'react-bootstrap';
import SearchModal from '../Modal/SearchModal';

class SearchBlock extends Component {
    state = {
        isSearchModalOpen: false
    }
    openSearchModal = () => {
        this.setState(prevState => ({
            isSearchModalOpen : !prevState.isSearchModalOpen
        }))
        
    }

    render() {
        return(
            <Fragment>
                <button onClick={this.openSearchModal}>Search</button>
                {this.state.isSearchModalOpen ? <SearchModal /> : null}
            </Fragment>
        )
    }
}

export default SearchBlock;