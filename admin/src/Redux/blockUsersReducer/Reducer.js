import {
    REQUEST_FAILURE,
    REQUEST_START,
    GET_BLOCKED_USERS_SUCCESS,
    BLOCK_USER_SUCCESS,
    UNBLOCK_USER_SUCCESS,
  } from "./ActionType";
  
  const initialState = {
    isLoading: false,
    isError: false,
    blockedUsers: [],
  };
  
  export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case REQUEST_START: {
        return { ...state, isLoading: true, isError: false, errorMessage: '' };
      }
  
      case GET_BLOCKED_USERS_SUCCESS: {
        return { ...state, blockedUsers: payload?.data, isLoading: false };
      }
  
      case BLOCK_USER_SUCCESS: {
        return { ...state, isLoading: false };
      }
  
      case UNBLOCK_USER_SUCCESS: {
        return { ...state, isLoading: false };
      }
  
      case REQUEST_FAILURE: {
        return { ...state, isLoading: false, isError: true};
      }
  
      default: {
        return { ...state };
      }
    }
  };
  