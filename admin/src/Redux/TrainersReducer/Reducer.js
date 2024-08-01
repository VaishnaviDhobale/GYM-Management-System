import {
  GET_REQUEST_START,
  REQUEST_FAILURE,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START,
  POST_REQUEST_START,
  DELETE_TRAINERS_SUCCESS,
  UPDATE_TRAINERS_SUCCESS,
  POST_TRAINERS_SUCCESS,
  GET_TRAINERS_SUCCESS,
} from "./ActionTypes";

const initialState = {
  isLoading: false,
  deleteIsLoading: false,
  updateIsLoading: false,
  postIsLoading: false,
  isError: false,
  trainers: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_REQUEST_START: {
      return { ...state, isLoading: true };
    }

    case GET_TRAINERS_SUCCESS: {
      return { ...state, isLoading: false, trainers: payload.data };
    }

    case POST_REQUEST_START: {
      console.log("coming here");
      return { ...state, postIsLoading: true };
    }

    case POST_TRAINERS_SUCCESS: {
      return { ...state, postIsLoading: false };
    }

    case DELETE_REQUEST_START: {
      return { ...state, deleteIsLoading: true };
    }

    case DELETE_TRAINERS_SUCCESS: {
      return { ...state, deleteIsLoading: false };
    }

    case UPDATE_REQUEST_START: {
      return { ...state, updateIsLoading: true };
    }

    case UPDATE_TRAINERS_SUCCESS: {
      return { ...state, updateIsLoading: false };
    }

    case REQUEST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        updateIsLoading: false,
        postIsLoading: false,
        deleteIsLoading: false,
        isError: true,
      };
    }

    default: {
      return { ...state };
    }
  }
};
