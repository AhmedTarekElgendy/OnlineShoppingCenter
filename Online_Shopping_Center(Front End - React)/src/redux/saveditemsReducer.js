import { Success, Failure } from "./saveditemsTypes";

const intialState = {
  saveditems: [],
  error: ""
};

const savedItemsReducer = (state = intialState, action) => {
  switch (action.type) {
    case Success:
      return {
        ...state,
        saveditems: action.payload
      };
    case Failure:
      return {
        ...state,
        saveditems: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default savedItemsReducer;
