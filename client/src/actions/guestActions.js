import axios from 'axios';

import {
    ADD_URL_SUCCESS, 
    ADD_URL_FAIL, 
    SET_STORED_URLS
} from './types';

import { returnMessage } from './messageActions';

export const addGuestUrl = ({ urlCode, longUrl }) => (dispatch) => {
    const body = { urlCode, longUrl };

    axios.post('/api/url/guest', body)
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

export const setStoredUrls = (urls) => (dispatch) => {    
    if (urls) {
        dispatch({
            type: SET_STORED_URLS,
            payload: urls
        })        
    }
}