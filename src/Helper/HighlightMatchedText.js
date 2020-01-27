const highLightMatchedText = (searchText, tweets) => {
  let regEx = new RegExp(searchText, "ig"),
    tweetToBeDisplayed = tweets.replace(regEx, `<span class="highlighted-text">$&</span>`);
  return tweetToBeDisplayed; 
}

export default highLightMatchedText