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


const initialState = {
    isLoading: false,
    deleteIsLoading :false,
    updateIsLoading : false,
    postIsLoading: false,
    isError: false,
    packages: [],
  };

export const reducer = (state = initialState, { type, payload}) => {
    
    switch(type){
        
        case GET_REQUEST_START : {
            return {...state, isLoading:true}
        }

        case GET_PACKAGE_SUCCESS :{
            return {...state, isLoading:false, packages : payload.data}
        }

        case POST_PACKAGE_SUCCESS : {
            return {...state, postIsLoading:false}
        }

        case POST_REQUEST_START : {
            return {...state, postIsLoading:true}
        }

        case DELETE_REQUEST_START : {
            return {...state, deleteIsLoading:true}
        }

        case DELETE_PACKAGE_SUCCESS : {
            return {...state, deleteIsLoading:false}
        }

        case UPDATE_REQUEST_START : {
            return {...state, updateIsLoading : true}
        }

        case UPDATE_PACKAGE_SUCCESS : {
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