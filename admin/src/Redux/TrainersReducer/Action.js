import axios from "axios";
import {
  GET_REQUEST_START,
  REQUEST_FAILURE,
  DELETE_REQUEST_START,
  UPDATE_REQUEST_START,
  POST_REQUEST_START,
  DELETE_TRAINERS_SUCCESS,
  UPDATE_TRAINERS_SUCCESS,
  POST_TRAINERS_SUCCESS,
  GET_TRAINERS_SUCCESS,
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
  console.log("Dispatching POST_REQUEST_START");
  return { type: POST_REQUEST_START };
};

export const getTrainerSuccessAction = (payload) => {
  return { type: GET_TRAINERS_SUCCESS, payload };
};

export const postTrainerSuccessAction = (payload) => {
  return { type: POST_TRAINERS_SUCCESS, payload };
};

export const deleteTrainerSuccessAction = () => {
  return { type: DELETE_TRAINERS_SUCCESS };
};

export const updateTrainerSuccessAction = () => {
  return { type: UPDATE_TRAINERS_SUCCESS };
};

export const requestFailureAction = (error) => {
  return { type: REQUEST_FAILURE, error };
};

// Get trainers
export const getTrainers = (adminToken) => async (dispatch) => {
  try {
    dispatch(getRequestStartAction());
    const response = await axios.get(`${baseUrl}/trainers/`);
    dispatch(getTrainerSuccessAction(response));

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Add trainers
export const addTrainers = (trainer, adminToken) => async (dispatch) => {
  try {
    dispatch(postRequestStartAction());
    const response = await axios.post(
      `${baseUrl}/trainers/addTrainer`,
      trainer,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          adminToken,
        },
      }
    );
    dispatch(postTrainerSuccessAction());

    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};

// Update trainers
export const updateTrainers =
  (updatedTrainer, adminToken) => async (dispatch) => {
    try {
      console.log(updatedTrainer, "updated trainer");
      dispatch(updateRequestStartAction());
      const response = await axios.patch(
        `${baseUrl}/trainers/updateTrainer/${updatedTrainer._id}`,
        updatedTrainer,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            adminToken,
          },
        }
      );
      dispatch(updateTrainerSuccessAction());
      return response;
    } catch (error) {
      const status = error.response.status;
      if (status === 500 || status === 401) {
        dispatch(requestFailureAction());
      }
      return { status, error: error?.response?.data?.error };
    }
  };

// Delete trainers
export const deleteTrainers = (id, adminToken) => async (dispatch) => {
  try {
    console.log(adminToken);
    dispatch(deleteRequestStartAction());
    const response = await axios.delete(
      `${baseUrl}/trainers/deleteTrainer/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          adminToken,
        },
      }
    );
    dispatch(deleteTrainerSuccessAction());
    return response;
  } catch (error) {
    const status = error.response.status;
    if (status === 500 || status === 401) {
      dispatch(requestFailureAction());
    }
    return { status, error: error?.response?.data?.error };
  }
};
