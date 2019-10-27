import axios from 'axios';

import {
    GET_STATS_SUCCESS,
    GET_STATS_FAIL
} from './types';

import { returnMessage } from './messageActions';
import { tokenConfig } from './authActions';

export const getStats = () => (dispatch, getState) => {    
    axios.get('/api/stats', tokenConfig(getState))
        .then(res => {            
            dispatch({
                type: GET_STATS_SUCCESS,
                payload: res.data
            })

            dispatch(
                returnMessage('Stats loaded', res.status, GET_STATS_SUCCESS)
            );
        })
        .catch(error => {
            console.log(error);
            
            dispatch(
                returnMessage(error.response.data.msg, error.response.status, GET_STATS_FAIL)
            );
        });
}