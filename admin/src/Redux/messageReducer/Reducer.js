import {
  REQUEST_FAILURE,
  REQUEST_START,
  GET_MESSAGE_SUCCESS,
  POST_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
} from "./ActionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  messages: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_START: {
      return { ...state, isLoading: true };
    }

    case POST_MESSAGE_SUCCESS: {
      return { ...state, isLoading: false };
    }

    case REQUEST_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    default: {
      return state;
    }
  }
};
