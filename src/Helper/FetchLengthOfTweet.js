import { URL_REGEX, TAGS_REGEX, MENTION_TAGS, REPOSITORY_TAGS } from './Constants'

const fetchLengthOfTweet = (tweetValue) => {
    const TotalNumberOfLettersAllowed = 160;
    let urlLength = 0,
      length = tweetValue.length,
      urlLengthToBeCounted = 0;
    let words = tweetValue.split(' ')
    words.reverse().forEach(element => {
      if(element.match(URL_REGEX)) {
        urlLength = element.match(URL_REGEX).input.length;
        urlLengthToBeCounted = urlLengthToBeCounted + 8;
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
    return TotalNumberOfLettersAllowed - length - urlLengthToBeCounted;
}
export default fetchLengthOfTweet;