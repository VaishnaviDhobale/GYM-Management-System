import axios from "axios";
import {
  REQUEST_START,
  REQUEST_FAILURE,
  GET_BLOCKED_USERS_SUCCESS,
  UNBLOCK_USER_SUCCESS,
  BLOCK_USER_SUCCESS,
} from "./ActionType.js";
import { baseUrl } from "../../comman.js";

// block users action methods
export const requestStartAction = () => {
  return { type: REQUEST_START };
};

export const getBlockUserSuccessAction = (payload) => {
  return { type: GET_BLOCKED_USERS_SUCCESS, payload };
};

export const blockUserSuccessAction = (payload) => {
  return { type: BLOCK_USER_SUCCESS, payload };
};

export const unblockUserSuccessAction = () => {
  return { type: UNBLOCK_USER_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get blocked users
export const getBlockedUsers = () => async (dispatch) => {
  try {
    dispatch(requestStartAction());
    const response = await axios.get(`${baseUrl}/blockUsers/`);
    response.status === 200 && dispatch(getBlockUserSuccessAction(response));
    dispatch(getBlockUserSuccessAction(response));
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Block users
export const blockUsers = (payload,adminToken) => async (dispatch) => {
  try {
    console.log(payload);
    dispatch(requestStartAction());
    const response = await axios.post(`${baseUrl}/blockUsers/block`, payload,{
      headers : {
        "Content-Type" : "application/json",
        adminToken
      }
    });
    response.status === 200 && dispatch(blockUserSuccessAction(response));
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Unblock users
export const unblockUser = (payload,adminToken) => async (dispatch) => {
  try {
    dispatch(requestStartAction());
    const response = await axios.post(`${baseUrl}/blockUsers/unblock`, payload,{
      headers : {
        "Content-Type" : "application/json",
        adminToken
      }
    });
    dispatch(unblockUserSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};
