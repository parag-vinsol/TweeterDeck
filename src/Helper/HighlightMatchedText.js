const highLightMatchedText = (searchText, tweets) => {
  let regEx = new RegExp(searchText, "ig"),
    tweetToBeDisplayed = tweets.replace(regEx, "<mark>$&</mark>");
  return tweetToBeDisplayed; 
}

export default highLightMatchedText