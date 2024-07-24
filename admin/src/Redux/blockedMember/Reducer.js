import {
  REQUEST_FAILURE,
  REQUEST_START,
  GET_BLOCKED_MEMBERS_SUCCESS,
  BLOCK_MEMBER_SUCCESS,
  UNBLOCK_MEMBER_SUCCESS,
} from "./ActionType";

const initialState = {
  isLoading: false,
  isError: false,
  blockedMembers: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_START: {
      return { ...state, isLoading: true, isError: false, errorMessage: '' };
    }

    case GET_BLOCKED_MEMBERS_SUCCESS: {
      return { ...state, blockedMembers: payload?.data, isLoading: false };
    }

    case BLOCK_MEMBER_SUCCESS: {
      return { ...state, isLoading: false };
    }

    case UNBLOCK_MEMBER_SUCCESS: {
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
