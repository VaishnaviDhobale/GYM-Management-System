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


const initialState = {
    isLoading: false,
    deleteIsLoading :false,
    updateIsLoading : false,
    postIsLoading: false,
    isError: false,
    privateMsgs: [],
  };

export const reducer = (state = initialState, { type, payload}) => {
    
    switch(type){
        
        case GET_REQUEST_START : {
            return {...state, isLoading:true}
        }

        case GET_MSG_SUCCESS :{
            return {...state, isLoading:false, privateMsgs : payload.data}
        }

        case POST_MSG_SUCCESS : {
            return {...state, postIsLoading:false}
        }

        case POST_REQUEST_START : {
            return {...state, postIsLoading:true}
        }

        case DELETE_REQUEST_START : {
            return {...state, deleteIsLoading:true}
        }

        case DELETE_MSG_SUCCESS : {
            return {...state, deleteIsLoading:false}
        }

        case UPDATE_REQUEST_START : {
            return {...state, updateIsLoading : true}
        }

        case UPDATE_MSG_SUCCESS : {
            return {...state, updateIsLoading:false}
        }

        case REQUEST_FAILURE: {
            return {
              ...state,
              isLoading: false,
              updateIsLoading: false,
              postIsLoading: false,
              deleteIsLoading: false,
              isError: true,
            };
          }

        default : {
            return {...state}
        }
    }
}