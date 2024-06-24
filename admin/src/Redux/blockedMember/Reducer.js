import {
  REQUEST_FAILURE,
  REQUEST_START,
  GET_BLOCKED_USER_SUCCESS,
  BLOCK_MEMBER_SUCCESS,
  UNBLOCK_USER_SUCCESS,
} from "./ActionType";

const initialState = {
  isLoading: false,
  isError: false,
  blockedMembers: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case REQUEST_START: {
      return { ...state, isLoading: true };
    }

    case GET_BLOCKED_USER_SUCCESS: {
      return { ...state, isLoading: false, blockedMembers: payload.data };
    }

    case BLOCK_MEMBER_SUCCESS : {
      return {...state, isLoading :false}
    }

    case UNBLOCK_USER_SUCCESS : {
      return {...state,isLoading:false}
    }
    
    case REQUEST_FAILURE: {
      return { ...state, isLoading: true, isError: true };
    }

    default: {
      return state;
    }
  }
};
