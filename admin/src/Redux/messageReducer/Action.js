import axios from "axios";
import {
  REQUEST_FAILURE,
  REQUEST_START,
  GET_MESSAGE_SUCCESS,
  POST_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
} from "./ActionTypes";
import { baseUrl } from "../../comman";
import { toast } from "react-toastify";

export const requestStartAction = () => {
  return { type: REQUEST_START };
};

export const getMessagesSuccessAction = (payload) => {
    return { type: GET_MESSAGE_SUCCESS, payload };
  };
  
  export const postMessageSuccessAction = (payload)=>{
      return { type : POST_MESSAGE_SUCCESS, payload}
  }
  
  export const deleteMessageSuccessAction = () => {
      return { type : DELETE_MESSAGE_SUCCESS}
  }
  
  export const requestFailureAction = (error) => {
    return { type: REQUEST_FAILURE, error };
  };
  
// Send msg 
  export const addMsg = (payload) => async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/msg/sendMsg`, payload);
      dispatch(postMessageSuccessAction(response));
      return response;
    } catch (error) {
      const status = error.response.status;
      if(status===500){
        dispatch(requestFailureAction())
      }
      return { status, error: error.response.data.error.message };
    }
  };
  