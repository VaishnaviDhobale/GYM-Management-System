import {
    REQUEST_START,
  REQUEST_FAILURE,
  GET_USERS_SUCCESS,
  POST_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_ALL_USERS_SUCCESS
  } from "./ActionTypes";
  
  const initialState = {
    isLoading: false,
    isError: false,
    users: [],
  };
  
  export const reducer = (state = initialState, { type, payload }) => {
    // console.log(payload,"payload")
    switch (type) {
      case REQUEST_START: {
        return { ...state, isLoading: true };
      }
  
      case GET_USERS_SUCCESS : {
        return {...state, isLoading:false, users : payload?.data}
      }
  
      case POST_USER_SUCCESS: {
        return { ...state, isLoading: false };
      }
  
      case DELETE_USER_SUCCESS : {
        return { ...state, isLoading: false };
      }

      case DELETE_ALL_USERS_SUCCESS : {
        return {...state, isLoading : false}
      }
  
      case UPDATE_USER_SUCCESS : {
        return {...state, isLoading:false}
      }
  
      case REQUEST_FAILURE: {
        return { ...state, isLoading: false, isError: true };
      }
      default: {
        return {...state};
      }
    }
  };
  