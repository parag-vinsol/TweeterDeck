import Axios from 'axios';


export const POST = "POST";
export const DELETE = "DELETE";
export const OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL";
export const CANCEL_EDIT = "CANCEL_EDIT";
export const EDIT = "EDIT";
export const OPEN_ADD_NEW_MODAL = "OPEN_ADD_NEW_MODAL";
export const OPEN_SEARCH = "OPEN_SEARCH";
export const SEARCH_TWEET = "SEARCH_TWEET";
export const CLOSE_SEARCH_BLOCK = "CLOSE_SEARCH_BLOCK";
export const SEARCH_TAGS = "SEARCH_TAGS";
export const CLOSE_USER_BLOCK = "CLOSE_USER_BLOCK";
export const SEARCH_REPOSITORIES = "SEARCH_REPOSITORIES";
export const CLOSE_REPOSITORY_SEARCHBLOCK = "CLOSE_REPOSITORY_SEARCHBLOCK";

const storeUser = (user) => {
  return {
    type: SEARCH_TAGS,
    user: user
  }
}
export const searchTags = (searchTag) => {
  return dispatch => {
    let user = {
        id: null,
        name: "",
        picURL: "",
        company: "",
        followers: 0,
        following: 0
    }
    let userName = searchTag.substring(1, searchTag.length);
    Axios.get(`https://api.github.com/users/${userName}`)
    .then(res => {
        user["id"] = res.data["id"]
        user["name"] = res.data["name"];
        user["picURL"] = res.data["avatar_url"];
        user["company"] = res.data["company"];
        user["followers"] = res.data["followers"];
        user["following"] = res.data["following"];
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
          let repository = {
            id: null,
            watchersCount: 0,
            forks: 0,
            openIssues: 0,
            watchers: 0,
            URL: null,
            updatedAt: null,
            stargazersCount: 0
          }
          repository["id"] = element["id"];
          repository["watchersCount"] = element["watchers_count"];
          repository["forks"] = element["forks"];
          repository["openIssues"] = element["open_issues"];
          repository["watchers"] = element["watchers"];
          repository["URL"] = element["html_url"];
          repository["updatedAt"] = element["updated_at"]
          repository["stargazersCount"] = element["stargazers_count"]

          repositoryList.push(repository);
        })
        dispatch(storeRepository(repositoryList))
      })
  }
}
export const URL_REGEX = /^(ftp|https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*$/;
export const TAGS_REGEX = /^(#.+)$/;
export const MENTION_TAGS = /^(@.+)$/;
export const REPOSITORY_TAGS = /^(\$.+)$/;