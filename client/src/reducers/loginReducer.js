import {
  LOGGING,
  LOGGIN_FAILURE,
  LOGGIN_RESET,
  LOGGIN_SUCCESS,
} from "../actions/types";

const initialState = {
  signup: false,
  error: null,
  loading: false,
  userId: localStorage.getItem("x-token") || null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING: {
      console.log(1);
      return { ...state, loading: true, signup: false };
    }
    case LOGGIN_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        signup: true,
        userId: action.payload,
      };
    }
    case LOGGIN_FAILURE: {
      console.log(3);
      return {
        ...state,
        loading: false,
        signup: false,
        error: action.payload,
        userId: null,
      };
    }
    case LOGGIN_RESET: {
      localStorage.removeItem("x-token");
      return {
        ...state,
        signup: false,
        userId: localStorage.getItem("x-token"),
      };
    }
    default:
      return state;
  }
};

export default loginReducer;
