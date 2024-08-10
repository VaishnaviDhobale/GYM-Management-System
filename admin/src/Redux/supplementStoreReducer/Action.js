import axios from "axios";
import {
  GET_REQUEST_START,
  REQUEST_FAILURE,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START,
  POST_REQUEST_START,
  DELETE_SUPPLEMENTS_SUCCESS,
  UPDATE_SUPPLEMENTS_SUCCESS,
  POST_SUPPLEMENTS_SUCCESS,
  GET_SUPPLEMENTS_SUCCESS,
} from "./ActionTypes";
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

export const getSupplementSuccessAction = (payload) => {
  return { type: GET_SUPPLEMENTS_SUCCESS, payload };
};

export const postSupplemetSuccessAction = (payload) => {
  return { type: POST_SUPPLEMENTS_SUCCESS, payload };
};

export const deleteSupplemtSuccessAction = () => {
  return { type: DELETE_SUPPLEMENTS_SUCCESS };
};

export const updateSupplemtSuccessAction = () => {
  return { type: UPDATE_SUPPLEMENTS_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get supplements
export const getSupplements = () => async (dispatch) => {
  try {
    dispatch(getRequestStartAction());
    const response = await axios.get(`${baseUrl}/supplement/`);
    dispatch(getSupplementSuccessAction(response));
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Add supplements
export const addSupplements = (supplement, adminData) => async (dispatch) => {
  try {
    dispatch(postRequestStartAction());
    const response = await axios.post(
      `${baseUrl}/supplement/addSupplement/${adminData.adminId}`,
      supplement,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          adminToken: adminData.adminToken,
        },
      }
    );
    dispatch(postSupplemetSuccessAction());

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Update Supplements
export const updateSupplement = (supplement, adminData) => async (dispatch) => {
  try {
    dispatch(updateRequestStartAction());
    const response = await axios.patch(
      `${baseUrl}/supplement/updateSupplement/${supplement._id}`,
      supplement,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          adminToken: adminData.adminToken,
        },
      }
    );
    dispatch(updateSupplemtSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Delete supplements
export const deleteSupplement = (id,adminData) => async (dispatch) => {
  try {
    dispatch(deleteRequestStartAction());
    const response = await axios.delete(
      `${baseUrl}/supplement/deleteSupplement/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          adminToken: adminData.adminToken,
        },
      }
    );
    dispatch(deleteSupplemtSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Delete all supplements
export const deleteAllSupplements = (adminData) => async (dispatch) => {
  try {
    dispatch(deleteRequestStartAction());
    const response = await axios.delete(
      `${baseUrl}/supplement/deleteAllSupplement`,{
        headers: {
          "Content-Type": "application/json",
          adminToken: adminData.adminToken,
        },
      }
    );
    dispatch(deleteSupplemtSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};
