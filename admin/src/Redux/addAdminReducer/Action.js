import axios from "axios";
import {
  REQUEST_START,
  GET_ADMIN_SUCCESS,
  REQUEST_FAILURE,
  DELETE_ADMIN_SUCCESS,
  POST_ADMIN_SUCCESS,
} from "./ActionType";
import { baseUrl } from "../../comman";
import { getRequestStartAction } from "../packageReducer/Action";

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
export const getAdmins = (adminToken) => async (dispatch) => {
  console.log(adminToken);
  try {
    dispatch(requestStartAction());
    const admins = await axios.get(`${baseUrl}/admin/`);
    dispatch(getAdminSuccessAction(admins));
    console.log(admins);
    return admins;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Get admin by id
export const adminById = (id) => async (dispatch) => {
  console.log(id);
  try {
    dispatch(getRequestStartAction());
    const response = await axios.get(`${baseUrl}/admin/adminById/${id}`);
    dispatch(getAdminSuccessAction(response.data));
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Add admin
export const addAdmin = (admin, adminToken) => async (dispatch) => {
  try {
    dispatch(requestStartAction());
    const addMember = await axios.post(`${baseUrl}/admin/addAdmin`, admin, {
      headers: {
        "Content-Type": "multipart/form-data",
        adminToken 
      },
    });
    dispatch(postAdminSuccessAction(addMember));
    return addMember;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error};
  }
};
