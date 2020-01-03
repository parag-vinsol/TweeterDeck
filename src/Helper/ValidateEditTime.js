import { MIN_MINS_REQ_TO_EDIT } from './Constants'
const validateEditTime = (postedTime) => {
    let postedDateTime = new Date(postedTime),
      presentDateTime = new Date(),
      visibilty = "btnEdit";
    if(((presentDateTime - postedDateTime)/(1000 * 60)) < MIN_MINS_REQ_TO_EDIT) {
      visibilty =  `${visibilty} hiddenVisibilty`;
    }
    return visibilty
}

export default validateEditTime