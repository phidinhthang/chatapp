import { SIGNUPING, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../actions/types";

const initialState = {
  signup: false,
  error: null,
  loading: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUPING: {
      return { ...state, loading: true, signup: false };
    }
    case SIGNUP_SUCCESS: {
      return {
        loading: false,
        error: null,
        signup: true,
      };
    }
    case SIGNUP_FAILURE: {
      return {
        ...state,
        loading: false,
        signup: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default signupReducer;
