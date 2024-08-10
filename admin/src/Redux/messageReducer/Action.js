import axios from "axios";
import {
  REQUEST_FAILURE,
  GET_REQUEST_START,
  GET_MESSAGE_SUCCESS,
  POST_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_SUCCESS,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START,
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

export const getMessagesSuccessAction = (payload) => {
  return { type: GET_MESSAGE_SUCCESS, payload };
};

export const postMessageSuccessAction = (payload) => {
  return { type: POST_MESSAGE_SUCCESS, payload };
};

export const deleteMessageSuccessAction = () => {
  return { type: DELETE_MESSAGE_SUCCESS };
};

export const updateMessageSuccessAction = () => {
  return { type: UPDATE_MESSAGE_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get msg's
export const getMessages = () => async (dispatch) => {
  try {
    dispatch(getRequestStartAction());
    const response = await axios.get(`${baseUrl}/msg/`);
    dispatch(getMessagesSuccessAction(response));

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Send msg
export const addMessages = (payload, adminToken) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/msg/sendMsg`, payload, {
      headers: {
        "Content-Type": "application/json",
        adminToken,
      },
    });
    dispatch(postMessageSuccessAction(response));
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Delete msg
export const deleteMessages = (payload, adminToken) => async (dispatch) => {
  try {
    dispatch(deleteRequestStartAction());
    const response = await axios.delete(`${baseUrl}/msg/deleteMsg/${payload}`, {
      headers: {
        "Content-Type": "application/json",
        adminToken,
      },
    });
    dispatch(deleteMessageSuccessAction());

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Update msg
export const updateMessages = (payload, adminToken) => async (dispatch) => {
  console.log(payload);
  try {
    dispatch(updateRequestStartAction());
    const response = await axios.patch(
      `${baseUrl}/msg/updateMsg/${payload._id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          adminToken,
        },
      }
    );
    dispatch(updateMessageSuccessAction());

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};
