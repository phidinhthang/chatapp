import { SIGNUPING, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "./types";
import axios from "axios";

export const signuping = () => ({
  type: SIGNUPING,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailure = (payload) => ({
  type: SIGNUP_FAILURE,
  payload,
});

export const signup = (info) => {
  return (dispatch) => {
    dispatch(signuping());
    axios({
      method: "post",
      url: "/signup",
      data: info,
    })
      .then((response) => {
        console.log("here");
        dispatch(signupSuccess());
      })
      .catch((err) => {
        const { error } = err.response.data;
        dispatch(signupFailure(error));
      });
  };
};
