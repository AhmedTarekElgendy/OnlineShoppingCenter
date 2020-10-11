import { Success, Failure } from "./saveditemsTypes";
import axios from "axios";

const GetData = user => {
  return {
    type: Success,
    payload: user
  };
};

const GetError = error => {
  return {
    type: Failure,
    payload: error
  };
};

export const Getsaveditems = () => {
  return dispatch => {
    axios
      .get("http://localhost:57260/api/card/" + 11)
      .then(result => {
        const sait = result.data;
        dispatch(GetData(sait));
      })
      .catch(error => {
        const err = error.message;
        dispatch(GetError(err));
      });
  };
};
