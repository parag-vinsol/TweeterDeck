import React, { Component } from 'react';
import '../../Styles/SingleTweetBlock.css'

class Repository extends Component {
  render() {
    return(
      <div className="SingleTweetBlock">
        <p>Watcher's Count: {this.props.repository["watchersCount"]}</p>
        <p>forks: {this.props.repository["forks"]}</p>
        <p>OpenIssues: {this.props.repository["openIssues"]}</p>
        <p>URL: <a target="_blank" href={this.props.repository["URL"]}>{this.props.repository["URL"]}</a></p>
        <p>Updated at: {this.props.repository["updatedAt"]}</p>
        <p>Stargazers Count: {this.props.repository["stargazersCount"]}</p>
      </div>
    )
  }
}

export default Repository;