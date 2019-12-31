import React, { Component } from 'react';
import '../../Styles/SingleTweetBlock.css'

class Repository extends Component {
  render() {
    return(
      <div className="SingleTweetBlock">
        <p>Watcher's Count: {this.props.repository["watchersCount"]}</p>
        <p>forks: {this.props.repository["forks"]}</p>
        <p>OpenIssues: {this.props.repository["openIssues"]}</p>
        <p>watchers: {this.props.repository["watchers"]}</p>
      </div>
    )
  }
}

export default Repository;