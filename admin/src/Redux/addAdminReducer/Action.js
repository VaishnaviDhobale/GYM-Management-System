import axios from "axios";
import {
  REQUEST_START,
  GET_ADMIN_SUCCESS,
  REQUEST_FAILURE,
  DELETE_ADMIN_SUCCESS,
  POST_ADMIN_SUCCESS,
} from "./ActionType";
import { baseUrl } from "../../comman";

// admin action methods

export const requestStartAction = () => {
  return { type: REQUEST_START };
};

export const getAdminSuccessAction = (payload) => {
  return { type: GET_ADMIN_SUCCESS, payload };
};

export const postAdminSuccessAction = (payload) => {
  return { type: POST_ADMIN_SUCCESS, payload };
};

export const deleteAdminSuccessAction = () => {
  return { type: DELETE_ADMIN_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get admins
export const getAdmins = () => async (dispatch) => {
  try {
    dispatch(requestStartAction());
    const admins = await axios.get(`${baseUrl}/admin/`,{ headers : {
        "Content-Type" : "application/json"
    }});
    dispatch(getAdminSuccessAction(admins));
  } catch (error) {
    dispatch(requestFailureAction(error));
  }
};

// Add admin 
export const addAdmin = (admin)=> async(dispatch)=>{
    try{
        dispatch(requestStartAction());
        const addMember = await axios.post(`${baseUrl}/admin/addAdmin`,admin,{headers : {
            "Content-Type" : "application/json"
        }});
        dispatch(postAdminSuccessAction(addMember));
        return addMember
    }catch(error){
        dispatch(requestFailureAction(error))
    }
}
