import {
    EMAIL_CONTENT_FAILURE,
    EMAIL_CONTENT_REQUEST,
    EMAIL_CONTENT_SUCCESS,
    EMAIL_LIST_FAILURE,
    EMAIL_LIST_REQUEST,
    EMAIL_LIST_SUCCESS,
  } from "./constants";
  
  const emailListState = {
    emails: [],
    loading: false,
  };

  export const emailListReducer = (state = emailListState, action) => {
    switch (action.type) {
        case EMAIL_LIST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case EMAIL_LIST_SUCCESS:
            console.log('email1', action.payload);
            return {
                ...state,
                emails: action.payload,
                loading: false,
            }
            
        case EMAIL_LIST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
  }

  const selectedEmailState = {
    email: {},
    loading: false,
  };
  
  export const selectedEmailReducer = (state = selectedEmailState, action) => {
    switch (action.type) {
      case EMAIL_CONTENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case EMAIL_CONTENT_SUCCESS:
        return {
          ...state,
          email: action.payload,
          loading: false,
        };
      case EMAIL_CONTENT_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };