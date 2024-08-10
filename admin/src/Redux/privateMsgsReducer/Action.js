import axios from "axios";
import {
  GET_REQUEST_START,
  GET_MSG_SUCCESS,
  REQUEST_FAILURE,
  POST_MSG_SUCCESS,
  DELETE_MSG_SUCCESS,
  UPDATE_MSG_SUCCESS,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START,
  POST_REQUEST_START,
} from "./ActionType";
import { baseUrl } from "../../comman";

export const getRequestStartAction = () => {
  return { type: GET_REQUEST_START };
};

export const deleteRequestStartAction = () => {
  return { type: DELETE_REQUEST_START };
};

export const updateRequestStartAction = () => {
  return { type: UPDATE_REQUEST_START };
};

export const postRequestStartAction = () => {
  return { type: POST_REQUEST_START };
};

export const getMsgSuccessAction = (payload) => {
  return { type: GET_MSG_SUCCESS, payload };
};

export const postMsgSuccessAction = (payload) => {
  return { type: POST_MSG_SUCCESS, payload };
};

export const deleteMsgSuccessAction = () => {
  return { type: DELETE_MSG_SUCCESS };
};

export const updateMsgSuccessAction = () => {
  return { type: UPDATE_MSG_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get msgs
export const getAllPrivateMsgs = () => async(dispatch)=>{
  try{
    // dispatch(getRequestStartAction());
    const response = await axios.get(`${baseUrl}/privateMsgs/`);
    dispatch(getMsgSuccessAction(response));
    return response
  }catch(error){
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
}

// Send msgs
export const sendMsg = (msg,adminData) => async(dispatch) => {
  try {
    dispatch(postRequestStartAction());
    const response = await axios.post(`${baseUrl}/privateMsgs/sendMsg`,msg,{
      headers : {
        "Content-Type" : "application/json",
        adminToken : adminData.adminToken
      }
    });
    dispatch(postMsgSuccessAction());
    console.log(response)
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Delete msgs 
export const deleteMsg = (id,adminToken) => async(dispatch) => {
  try{
    dispatch(deleteRequestStartAction());
    const response = await axios.delete(`${baseUrl}/privateMsgs/deleteMsg/${id}`,{
      headers : {
        "Content-Type" : "application/json",
        adminToken 
      }
    });
    dispatch(deleteMsgSuccessAction());
    return response;
  }catch(error){
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
}