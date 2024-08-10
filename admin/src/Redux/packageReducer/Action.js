import axios from "axios";
import {
  GET_REQUEST_START,
  GET_PACKAGE_SUCCESS,
  REQUEST_FAILURE,
  POST_PACKAGE_SUCCESS,
  DELETE_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_SUCCESS,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START,
  POST_REQUEST_START,
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

export const getPackageSuccessAction = (payload) => {
  return { type: GET_PACKAGE_SUCCESS, payload };
};

export const postPackageSuccessAction = (payload) => {
  return { type: POST_PACKAGE_SUCCESS, payload };
};

export const deletePackageSuccessAction = () => {
  return { type: DELETE_PACKAGE_SUCCESS };
};

export const updatePackageSuccessAction = () => {
  return { type: UPDATE_PACKAGE_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get packages
export const getPackages = () => async (dispatch) => {
  try {
    dispatch(getRequestStartAction());
    const response = await axios.get(`${baseUrl}/package/`);
    dispatch(getPackageSuccessAction(response));

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Add package
export const addPackage = (Package,adminId, adminToken) => async (dispatch) => {
  try {
    dispatch(postRequestStartAction());
    const response = await axios.post(
      `${baseUrl}/package/addPackage/${adminId}`,
      Package,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          adminToken: adminToken,
        },
      }
    );
    dispatch(postPackageSuccessAction(response));
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Delete Package
export const deletePackage = (id, adminToken) => async (dispatch) => {
  try {
    dispatch(deleteRequestStartAction());
    const response = await axios.delete(
      `${baseUrl}/package/deletePackage/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          adminToken: adminToken,
        },
      }
    );
    dispatch(deletePackageSuccessAction());

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Delete All Packages once
export const deleteAll = (adminToken) => (dispatch) => {
  try {
    dispatch(deleteRequestStartAction());
    const response = axios.delete(`${baseUrl}/package/deleteAll`, {
      headers: {
        "Content-Type": "application/json",
        adminToken: adminToken,
      },
    });
    dispatch(deletePackageSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Update Package
export const updatePackage = (updatedPackage, adminToken) => (dispatch) => {
  // console.log(updatedPackage);
  try {
    dispatch(updateRequestStartAction());
    const response = axios.patch(
      `${baseUrl}/package/updatePackage/${updatedPackage._id}`,
      updatedPackage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          adminToken,
        },
      }
    );
    dispatch(updatePackageSuccessAction());

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};
