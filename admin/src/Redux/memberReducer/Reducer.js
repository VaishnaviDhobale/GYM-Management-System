import {
  GET_REQUEST_START,
  REQUEST_FAILURE,
  GET_MEMBER_SUCCESS,
  POST_MEMBER_SUCCESS,
  DELETE_REQUEST_START,
  DELETE_MEMBER_SUCCESS,
  DELETE_ALL_REQUEST_START,
  DELETE_ALL_MEMBERS_SUCCESS,
} from "./ActionType";

const initialState = {
  isLoading: false,
  deleteIsLoading: false,
  deleteAllIsLoading: false,
  isError: false,
  members: [],
};

export const reducer = (state = initialState, { type, payload }) => {
 
  switch (type) {
    case GET_REQUEST_START: {
      return { ...state, isLoading : true };
    }

    case GET_MEMBER_SUCCESS: {
      return { ...state, isLoading: false, members: payload.data };
    }

    case POST_MEMBER_SUCCESS: {
      return { ...state,isLoading:false };
    }

    case DELETE_REQUEST_START: {
      return { ...state, deleteIsLoading: true };
    }

    case DELETE_MEMBER_SUCCESS: {
      return { ...state, deleteIsLoading: false };
    }

    case DELETE_ALL_REQUEST_START: {
      return { ...state, deleteAllIsLoading: true };
    }

    case DELETE_ALL_MEMBERS_SUCCESS: {
      return { ...state, deleteAllIsLoading: false };
    }

    case REQUEST_FAILURE: {
      return { ...state, isLoading: false, deleteIsLoading: false, isError: true  };
    }

    default: {
      return { ...state};
    }

    
  }
};
