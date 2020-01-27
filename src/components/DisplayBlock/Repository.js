import React, { Component } from 'react';
import '../../Styles/SingleTweetBlock.css'

class Repository extends Component {
  render() {
    let {watchers_count, forks, open_issues, html_url, updated_at, stargazers_count} = this.props.repository
    return(
      <div className="SingleTweetBlock">
        <p>Watcher's Count: {watchers_count}</p>
        <p>forks: {forks}</p>
        <p>OpenIssues: {open_issues}</p>
        <p>URL: <a target="_blank" href={html_url}>{this.props.repository["html_url"]}</a></p>
        <p>Updated at: {updated_at}</p>
        <p>Stargazers Count: {stargazers_count}</p>
      </div>
    )
  }
}

export default Repository;