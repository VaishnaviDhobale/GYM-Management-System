import axios from "axios";
import {
  GET_REQUEST_START,
  REQUEST_FAILURE,
  GET_MEMBER_SUCCESS,
  POST_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  DELETE_ALL_MEMBERS_SUCCESS,
  POST_REQUEST_START,
  DELETE_ALL_REQUEST_START,
  DELETE_REQUEST_START,
} from "./ActionType";

import { baseUrl } from "../../comman";


export const requestStartAction = () => {
  return { type: GET_REQUEST_START };
};

export const getMembersSuccessAction = (payload) => {
  return { type: GET_MEMBER_SUCCESS, payload };
};

export const postRequestStart = () => {
  return { type: POST_REQUEST_START };
};

export const postMemberSuccessAction = (payload) => {
  return { type: POST_MEMBER_SUCCESS, payload };
};

export const deleteRequestStart = () => {
  return { type: DELETE_REQUEST_START };
};


export const deleteMemberSuccessAction = () => {
  return { type: DELETE_MEMBER_SUCCESS };
};

export const deleteAllRequestStart = () => {
  return {type : DELETE_ALL_REQUEST_START}
}

export const deleteAllMembersSuccessAction = () => {
  return { type: DELETE_ALL_MEMBERS_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get members
export const getMembers = (adminToken) => async (dispatch) => {
  try {
    dispatch(requestStartAction());
    const members = await axios.get(`${baseUrl}/member/`, {
      headers: {
        "Content-Type": "application/json",
        adminToken: adminToken,
      },
    });
    dispatch(getMembersSuccessAction(members));
    return members;
  } catch (error) {
    const status = error.response.status;
      if (status === 500 || status === 401) {
        dispatch(requestFailureAction());
      }
      return { status, error: error?.response?.data?.error };
  }
};

// Get member by id 
export const getMemberById = (id,adminToken) => async(dispatch) => {
  // console.log(id,adminData.adminToken)
  try{
    dispatch(requestStartAction());
    const response = await axios.get(`${baseUrl}/member/memberById/${id}`,{
      headers : {
        "Content-Type" : "application/json",
        adminToken : adminToken
      }
    });
    dispatch(getMembersSuccessAction(response));
    return response
  }catch(error){
    const status = error.response.status;
      if (status === 500 || status === 401) {
        dispatch(requestFailureAction());
      }
      return { status, error: error?.response?.data?.error };
  }
}

// Delete member
export const deleteMembers = (payload,adminToken) => async (dispatch) => {
  try {
    dispatch(deleteRequestStart());
    const response = await axios.delete(
      `${baseUrl}/member/deleteMember/${payload}`,
      {
        headers: {
          "Content-Type": "application/json",
          adminToken: adminToken,
        },
      }
    );
    dispatch(deleteMemberSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
      if (status === 500 || status === 401) {
        dispatch(requestFailureAction());
      }
      return { status, error: error?.response?.data?.error };
  }
};

// Delete All Members
export const deleteAllMembers = (adminToken) => async (dispatch) => {
  try {
    dispatch(deleteAllRequestStart());
    const response = await axios.delete(`${baseUrl}/member/deleteAllMembers`, {
      headers: {
        "Content-Type": "application/json",
        adminToken,
      },
    });

    dispatch(deleteAllMembersSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
      if (status === 500 || status === 401) {
        dispatch(requestFailureAction());
      }
      return { status, error: error?.response?.data?.error };
  }
};
