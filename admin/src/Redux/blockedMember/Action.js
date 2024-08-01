import axios from "axios";
import {
  REQUEST_FAILURE,
  REQUEST_START,
  GET_BLOCKED_MEMBERS_SUCCESS,
  BLOCK_MEMBER_SUCCESS,
  UNBLOCK_MEMBER_SUCCESS,
} from "./ActionType";
import { baseUrl } from "../../comman";

// block members action methods
export const requestStartAction = () => {
  return { type: REQUEST_START };
};

export const getBlockMemberSuccessAction = (payload) => {
  return { type: GET_BLOCKED_MEMBERS_SUCCESS, payload };
};

export const blockMemberSuccessAction = (payload) => {
  return { type: BLOCK_MEMBER_SUCCESS, payload };
};

export const unblockMemberSuccessAction = () => {
  return { type: UNBLOCK_MEMBER_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};



// Get blocked members
export const getBlockedMembers = () => async(dispatch) => {
    try{
        // dispatch(requestStartAction());
        const response = await axios.get(`${baseUrl}/blockMembers/`);
        // dispatch(getBlockMemberSuccessAction(response));
        return response
    }catch(error){
      const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
    }
};

// Block members 
export const blockMembers = (payload,adminToken) => async(dispatch) =>{
  try{  
    dispatch(requestStartAction());
    const response = await axios.post(`${baseUrl}/blockMembers/block`, payload,{
      headers : {
        "Content-Length" : "application/json",
        adminToken
      }
    });
    dispatch(blockMemberSuccessAction());
    return response;
  }catch(error){
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
}

// Unblock members
export const unblockMembers = (payload,adminToken) => async(dispatch) => {
  try{
    dispatch(requestStartAction());
    const response = await axios.post(`${baseUrl}/blockMembers/unblock`,payload,{
      headers : {
        "Content-Type" : "application/json",
        adminToken
      }
    });
    dispatch(unblockMemberSuccessAction());
    return response;
  }catch(error){
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
}