import React, { Component, Fragment } from 'react';
import ActionBlock from '../../containers/ActionBlock/ActionBlock'

class TweetDeck extends Component {
    state = {
        userName: "Parag"
    }
    render() {
        return(
            <Fragment>
                <ActionBlock />
            </Fragment>
        )
    }
}

export default TweetDeck;