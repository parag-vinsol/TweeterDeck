import React from 'react';
import './Styles/App.css';
import { connect } from 'react-redux';
import TweetDeck from './components/TweetDeck';

class App extends React.Component {
  componentDidMount() {
    this.props.tweets.forEach(element => {
      let doc = {
        "id": element['id'],
        "tweet-text": element['tweet-text'],
        "isEdited": element['isEdited'],
        "postedTime": element['postedTime']
      }
      window.elasticDBIndex.addDoc(doc);
    });
  }

  render() {
    return (
        <TweetDeck />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets
  }
}

export default connect(mapStateToProps)(App);
