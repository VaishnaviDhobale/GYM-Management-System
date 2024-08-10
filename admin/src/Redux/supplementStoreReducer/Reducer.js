import {
  GET_REQUEST_START,
  REQUEST_FAILURE,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START,
  POST_REQUEST_START,
  DELETE_SUPPLEMENTS_SUCCESS,
  UPDATE_SUPPLEMENTS_SUCCESS,
  POST_SUPPLEMENTS_SUCCESS,
  GET_SUPPLEMENTS_SUCCESS,
} from "./ActionTypes";

const initialState = {
  isLoading: false,
  deleteIsLoading: false,
  updateIsLoading: false,
  postIsLoading: false,
  isError: false,
  supplements: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_REQUEST_START: {
      return { ...state, isLoading: true };
    }

    case GET_SUPPLEMENTS_SUCCESS: {
      return { ...state, isLoading: false, supplements: payload.data };
    }

    case POST_SUPPLEMENTS_SUCCESS: {
      return { ...state, postIsLoading: false };
    }

    case POST_REQUEST_START: {
      return { ...state, postIsLoading: true };
    }

    case DELETE_REQUEST_START: {
      return { ...state, deleteIsLoading: true };
    }

    case DELETE_SUPPLEMENTS_SUCCESS: {
      return { ...state, deleteIsLoading: false };
    }

    case UPDATE_REQUEST_START: {
      return { ...state, updateIsLoading: true };
    }

    case UPDATE_SUPPLEMENTS_SUCCESS: {
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
