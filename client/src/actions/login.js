import { LOGGING, LOGGIN_FAILURE, LOGGIN_RESET, LOGGIN_SUCCESS } from "./types";
import axios from "axios";

export const logging = () => ({
  type: LOGGING,
});

export const loggingSuccess = (payload) => ({
  type: LOGGIN_SUCCESS,
  payload,
});

export const loggingFailure = (payload) => ({
  type: LOGGIN_FAILURE,
  payload,
});

export const loginReset = () => ({
  type: LOGGIN_RESET,
});

export const login = (info) => {
  return (dispatch) => {
    dispatch(logging());
    axios({
      method: "post",
      url: "/login",
      data: info,
    })
      .then(function (response) {
        let userId = response.data.token;
        localStorage.removeItem("x-token");
        localStorage.setItem("x-token", userId);

        dispatch(loggingSuccess(userId));
      })
      .catch((err) => {
        console.log(err?.response?.data);
        const error = err?.response?.data?.error;
        dispatch(loggingFailure(error));
      });
  };
};
