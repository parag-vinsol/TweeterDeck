import Axios from 'axios';
import _ from 'underscore'
import {SEARCH_TAGS, SEARCH_REPOSITORIES} from '../Helper/Constants'

const storeUser = (user) => {
  return {
    type: SEARCH_TAGS,
    user: user
  }
}
export const searchTags = (searchTag) => {
  return dispatch => {
    let userName = searchTag.substring(1, searchTag.length);
    Axios.get(`https://api.github.com/users/${userName}`)
    .then(res => {
      let user = _.pick(res.data, ['id', 'name', 'avatar_url', 'company', 'followers', 'following']);
      dispatch(storeUser(user));
    });
  }
}

const storeRepository = (repositoryList) => {
  return {
    type: SEARCH_REPOSITORIES,
    repositoryList: repositoryList
  }
}

export const searchRepositories = (repositoryName) => {
  let repositoryNameReq = repositoryName.substring(1, repositoryName.length);
  let repositoryList = [];
  return dispatch => {
    Axios.get(`https://api.github.com/search/repositories?q=${repositoryNameReq}`)
      .then(res => {
        res.data["items"].forEach(element => {
          let repository = _.pick(element, ['id', 'watchers_count', 'forks', 'open_issues', 'watchers', 'html_url', 'updated_at', 'stargazers_count']);
          repositoryList.push(repository);
        })
        dispatch(storeRepository(repositoryList))
      })
  }
}