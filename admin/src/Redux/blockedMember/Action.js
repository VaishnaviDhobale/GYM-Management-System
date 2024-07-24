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
        dispatch(requestStartAction());
        const response = await axios.get(`${baseUrl}/blockMembers/`);
        dispatch(getBlockMemberSuccessAction(response));
        return response
    }catch(error){
      const status = error.response.status;
      if(status===500){
        dispatch(requestFailureAction())
      }
      return { status, error: error.response.data.error.message };
    }
};

// Block members 
export const blockMembers = (payload) => async(dispatch) =>{
  try{  
    dispatch(requestStartAction());
    const response = await axios.post(`${baseUrl}/blockMembers/block`, payload);
    response.status===200 && dispatch(blockMemberSuccessAction());
    return response
  }catch(error){
    const status = error.response.status;
    if(status===500){
      dispatch(requestFailureAction())
    }
    return { status, error: error.response.data.error.message };
  }
}

// Unblock members
export const unblockMembers = (payload) => async(dispatch) => {
  try{
    dispatch(requestStartAction());
    const response = await axios.post(`${baseUrl}/blockMembers/unblock`,payload);
    response.status===200 && dispatch(unblockMemberSuccessAction());
    return response;
  }catch(error){
    const status = error.response.status;
    if(status===500){
      dispatch(requestFailureAction());
    }
    return { status, error: error.response.data.error.message };
  }
}