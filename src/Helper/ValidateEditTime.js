const validateEditTime = (postedTime) => {
    let postedDateTime = new Date(postedTime),
      presentDateTime = new Date(),
      minMinutesReq = 10,
      visibilty = "btnEdit";
    if(((presentDateTime - postedDateTime)/(1000 * 60)) < minMinutesReq) {
      visibilty =  `${visibilty} hiddenVisibilty`;
    }
    return visibilty
}

export default validateEditTime