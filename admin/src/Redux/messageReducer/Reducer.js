import {
  REQUEST_FAILURE,
  GET_REQUEST_START,
  GET_MESSAGE_SUCCESS,
  POST_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_SUCCESS,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START
} from "./ActionTypes";

const initialState = {
  isLoading: false,
  deleteIsLoading :false,
  updateIsLoading : false,
  postIsLoading :false,
  isError: false,
  messages: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_REQUEST_START: {
      return { ...state, isLoading: true };
    }

    case DELETE_REQUEST_START : {
      return {...state, deleteIsLoading : true}
    }

    case GET_MESSAGE_SUCCESS : {
      return {...state, isLoading:false, messages : payload.data}
    }

    case UPDATE_REQUEST_START : {
      return {...state ,updateIsLoading:true}
    }

    case POST_MESSAGE_SUCCESS: {
      return { ...state, isLoading: false };
    }

    case DELETE_MESSAGE_SUCCESS : {
      return { ...state, deleteIsLoading: false };
    }

    case UPDATE_MESSAGE_SUCCESS : {
      
      return {...state, updateIsLoading:false}
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
      return {...state, isLoading : false};
    }
  }
};
