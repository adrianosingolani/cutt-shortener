import axios from 'axios';

import {
    GET_CODE_SUCCESS,
    GET_CODE_FAIL,
    GET_DETAILS_SUCCESS,
    GET_DETAILS_FAIL,
    REDIRECT_SUCCESS,
    REDIRECT_FAIL,
    ADD_URL_SUCCESS,
    ADD_URL_FAIL,
    UPDATE_URL_SUCCESS,
    UPDATE_URL_FAIL,
    DELETE_URL_SUCCESS,
    DELETE_URL_FAIL,
    GET_URLS_SUCCESS,
    GET_URLS_FAIL
} from './types';

import { returnMessage } from './messageActions';
import { tokenConfig } from './authActions';

export const getUrls = () => (dispatch, getState) => {
    axios.get('/api/url', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_URLS_SUCCESS,
                payload: res.data
            })

            dispatch(
                returnMessage('URLs loaded', res.status, GET_URLS_SUCCESS)
            );
        })
        .catch(error => {
            dispatch(
                returnMessage(error.response.data.msg, error.response.status, GET_URLS_FAIL)
            );
        });
}

export const updateUrl = (url) => (dispatch, getState) => {
    axios.patch('/api/url/', { url }, tokenConfig(getState))
        .then(res => {            
            dispatch({
                type: UPDATE_URL_SUCCESS,
                payload: res.data
            })

            dispatch(
                returnMessage('Link updated', res.status, UPDATE_URL_SUCCESS)
            );
        })
        .catch(error => {            
            dispatch(
                returnMessage(
                    error.response.data.msg ? error.response.data.msg : 'Link couldn\'t be updated', 
                    error.response.status, 
                    UPDATE_URL_FAIL
                )
            );
        });
}

export const deleteUrl = (urlId) => (dispatch, getState) => {    
    axios.delete('/api/url/'+urlId, tokenConfig(getState))
        .then(res => {
            console.log(res);
            
            dispatch({
                type: DELETE_URL_SUCCESS,
                payload: res.data
            })

            dispatch(
                returnMessage('Link deleted', res.status, DELETE_URL_SUCCESS)
            );
        })
        .catch(error => {         
            console.log(error);
               
            dispatch(
                returnMessage(
                    error.response.data.msg ? error.response.data.msg : 'Link couldn\'t be deleted', 
                    error.response.status, 
                    DELETE_URL_FAIL
                )
            );
        });
}

export const getStats = (urlCode) => (dispatch, getState) => {    
    axios.get('/api/url/stats/'+urlCode, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DETAILS_SUCCESS,
                payload: res.data
            })

            dispatch(
                returnMessage('URL stats loaded', res.status, GET_DETAILS_SUCCESS)
            );
        })
        .catch(error => {
            dispatch(
                returnMessage(error.response.data.msg, error.response.status, GET_DETAILS_FAIL)
            );
        });
}

export const addClickAndRedirect = (code) => (dispatch) => {
    axios.post('/api/url/redirect/', { code })
        .then(res => {
            dispatch({
                type: REDIRECT_SUCCESS,
                payload: res.data
            })

            dispatch(
                returnMessage('click added and redirect URL loaded', res.status, REDIRECT_SUCCESS)
            );
        })
        .catch(error => {
            dispatch(
                returnMessage(error.response.data.msg, error.response.status, REDIRECT_FAIL)
            );
        });
}

export const getCode = () => (dispatch) => {
    axios.get('/api/url/code')
        .then(res => {
            dispatch({
                type: GET_CODE_SUCCESS,
                payload: res.data
            });

            dispatch(
                returnMessage('New URL code created', res.status, GET_CODE_SUCCESS)
            );
        })
        .catch(error => {
            dispatch({
                type: GET_CODE_FAIL
            });

            dispatch(
                returnMessage(error.response.data.msg, error.response.status, GET_CODE_FAIL)
            );
        });
}

export const addUrl = ({ urlCode, longUrl }) => (dispatch, getState) => {
    const body = { urlCode, longUrl };

    axios.post('/api/url', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_URL_SUCCESS,
                payload: res.data,
            });

            dispatch(
                returnMessage('URL added', res.status, ADD_URL_SUCCESS)
            );
        })
        .catch(error => {
            dispatch(
                returnMessage(error.response.data.msg, error.response.status, ADD_URL_FAIL)
            );
        })
}