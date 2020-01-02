import { URL_REGEX, TAGS_REGEX, MENTION_TAGS, REPOSITORY_TAGS, MAX_LENGTH_OF_TWEET, URL_LENGTH } from './Constants'

const fetchLengthOfTweet = (tweetValue) => {
    let urlLength = 0,
      length = tweetValue.length,
      urlLengthToBeCounted = 0;
    let words = tweetValue.split(' ')
    words.forEach(element => {
      if(element.match(URL_REGEX)) {
        urlLength = element.match(URL_REGEX).input.length;
        urlLengthToBeCounted = urlLengthToBeCounted + URL_LENGTH;
        length = length - urlLength;
      }
      else if(element.match(TAGS_REGEX)) {
        urlLength = element.match(TAGS_REGEX).input.length;
        length = length - urlLength;
      }
      else if(element.match(MENTION_TAGS)) {
        urlLength = element.match(MENTION_TAGS).input.length;
        length = length - urlLength;
      }
      else if(element.match(REPOSITORY_TAGS)) {
        urlLength = element.match(REPOSITORY_TAGS).input.length;
        length = length - urlLength;
      }

    });
    return MAX_LENGTH_OF_TWEET - length - urlLengthToBeCounted;
}
export default fetchLengthOfTweet;