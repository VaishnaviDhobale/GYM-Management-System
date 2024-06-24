import axios from "axios";
import {
  REQUEST_START,
  REQUEST_FAILURE,
  GET_MEMBER_SUCCESS,
  POST_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
} from "./ActionType";

import { baseUrl } from "../../comman";
import { toast } from "react-toastify";

const adminToken = JSON.parse(localStorage.getItem("admin")).adminToken

export const requestStartAction = () => {
  return { type: REQUEST_START };
};

export const getMembersSuccessAction = (payload) => {
  return { type: GET_MEMBER_SUCCESS, payload };
};

export const postMemberSuccessAction = (payload)=>{
    return { type : POST_MEMBER_SUCCESS, payload}
}

export const deleteMemberSuccessAction = () => {
    return { type : DELETE_MEMBER_SUCCESS}
}

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};




// Get members 
export const getMembers = () => async(dispatch)=>{

    try{

        dispatch(requestStartAction());
        const members = await axios.get(`${baseUrl}/member/`, { headers: {
          'Content-Type': 'application/json',
          adminToken: adminToken
        }});
        dispatch(getMembersSuccessAction(members));
        return members.data;

    }catch(error){
      const status = error.response.status;
      if(status===500){
        dispatch(requestFailureAction())
      }
      return { status, error: error.response.data.error.message };
    }

}

// Delete member 
export const deleteMember = (payload) => async(dispatch) => {
  try{

    dispatch(requestStartAction())
    const response = await axios.delete(`${baseUrl}/member/deleteMember/${payload}`, {headers : {
      "Content-Type" : "application/json",
      adminToken : adminToken
    }});
    dispatch(deleteMemberSuccessAction ());
    return response
  }catch(error){
    const status = error.response.status;
      if(status===500){
        dispatch(requestFailureAction())
      }
      return { status, error: error.response.data.error.message };
  }
}