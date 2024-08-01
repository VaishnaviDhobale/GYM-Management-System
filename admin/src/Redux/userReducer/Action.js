import axios from "axios";
import {
  REQUEST_START,
  REQUEST_FAILURE,
  GET_USERS_SUCCESS,
  POST_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_ALL_USERS_SUCCESS
} from "./ActionTypes";
import { baseUrl } from "../../comman";

export const requestStartAction = () => {
  return { type: REQUEST_START };
};

export const getUsersSuccessAction = (payload) => {
  return { type: GET_USERS_SUCCESS, payload };
};

export const postUserSuccessAction = (payload) => {
  return { type: POST_USER_SUCCESS, payload };
};

export const deleteUserSuccessAction = () => {
  return { type: DELETE_USER_SUCCESS };
};

export const deleteAllUserSuccessAction = () => {
  return {type : DELETE_ALL_USERS_SUCCESS}
}

export const updateUserSuccessAction = () => {
  return { type: UPDATE_USER_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get All Users
export const getAllUsers = () => async(dispatch) => {
  try {
    dispatch(requestStartAction());
    const response = await axios.get(`${baseUrl}/user`);
    dispatch(getUsersSuccessAction(response));

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Delete Users 
export const deleteUsers = (id, adminToken) => async(dispatch) => {
    try{
        console.log(adminToken,id)
        dispatch(requestStartAction());
        const response = await axios.delete(`${baseUrl}/user/deleteUser/${id}`, {
           headers : {
            "Content-Type" : "application/json",
            adminToken
           }
        });
        dispatch(deleteUserSuccessAction());
    
        return response;
    }catch(error){
      const status = error.response.status;
      if (status === 500 || status === 401) {
        dispatch(requestFailureAction());
      }
      return { status, error: error?.response?.data?.error };
    }
}

// Delete All Users 
export const deleteAllUsers = (adminToken) => async(dispatch) =>{
  try{
    dispatch(requestStartAction());
    const response = await axios.delete(`${baseUrl}/user/deleteAllUsers`, {
      headers : {
       "Content-Type" : "application/json",
       adminToken
      }
   });

   dispatch(deleteAllUserSuccessAction());
   return response
  }catch(error){
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
}