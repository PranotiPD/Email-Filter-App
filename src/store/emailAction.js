import request from "../api";
import {
    EMAIL_CONTENT_REQUEST,
    EMAIL_LIST_FAILURE,
    EMAIL_LIST_SUCCESS,
    EMAIL_LIST_REQUEST,
    EMAIL_CONTENT_SUCCESS,
    EMAIL_CONTENT_FAILURE,
  } from "./constants";

export const getEmailList = (read, pageNo) => async (dispatch) => {
    try {
        dispatch({type: EMAIL_LIST_REQUEST })
        let url = "/?page=1";
        pageNo && (url=`/?page=${pageNo}`)
        const { data } = await request.get(url);
        const list = data.list.reduce((acc, element) => {
            if (!read.includes(element.id)) {
              return [element, ...acc];
            }
            return [...acc, element];
        }, []);
        dispatch({
            type: EMAIL_LIST_SUCCESS,
            payload: list,
        })
    }
    catch(err){
        dispatch({
            type: EMAIL_LIST_FAILURE,
            payload: err.message
        })
    }
}

export const getEmailById = (id) => async(dispatch) => {
    try {
        dispatch({type: EMAIL_CONTENT_REQUEST})
        const { data } = await request.get("/",{
            params: {
                id,
            },
        })
        dispatch({
            type: EMAIL_CONTENT_SUCCESS,
            payload: data
        })
    }
    catch(err){
        dispatch({
            type: EMAIL_CONTENT_FAILURE,
            payload: err.message
        })
    }
}