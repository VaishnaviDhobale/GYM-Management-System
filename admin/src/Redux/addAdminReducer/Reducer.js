import {
  REQUEST_START,
  GET_ADMIN_SUCCESS,
  REQUEST_FAILURE,
  DELETE_ADMIN_SUCCESS,
  POST_ADMIN_SUCCESS,
} from "./ActionType";

const initialState = {
  isLoading: false,
  isError: false,
  admins: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_START: {
      return { ...state, isLoading: true };
    }

    case GET_ADMIN_SUCCESS: {
      return { ...state, isLoading: false, admins: payload.data };
    }
    case POST_ADMIN_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case REQUEST_FAILURE: {
      return { ...state, isError: true, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
