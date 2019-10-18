import axios from 'axios';

import { 
    USER_LOADED, 
    AUTH_ERROR, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    LOGOUT_SUCCESS, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL 
} from '../actions/types';

import { returnMessage } from './messageActions';

// check token and load user
export const loadUser = () => (dispatch, getState) => {    
    axios.get('/api/auth', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(error => {
            dispatch(
                returnMessage(error.response.data.msg, error.response.status)
            );

            dispatch({
                type: AUTH_ERROR
            })
        });
}

// logout user
export const logOut = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// log in user
export const logIn = ({ email, password }) => dispatch => {    
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //body
    const body = { email, password };

    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            dispatch(
                returnMessage('User logged in', res.status, LOGIN_SUCCESS)
            );
        })
        .catch(error => {            
            dispatch(
                returnMessage(error.response.data.msg, error.response.status, LOGIN_FAIL)
            );

            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// sign up user
export const signUp = ({ email, password, password_confirm }) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //body
    const body = { email, password, password_confirm };

    axios.post('/api/user', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            dispatch(
                returnMessage('User registered', res.status, REGISTER_SUCCESS)
            );
        })
        .catch(error => {            
            dispatch(
                returnMessage(error.response.data.msg, error.response.status, REGISTER_FAIL)
            );

            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// setup config/headers and token
export const tokenConfig = getState => {    
    // get token from localstorage
    const token = getState().auth.token;    

    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}