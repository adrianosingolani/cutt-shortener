import { 
    GET_MESSAGE, 
    CLEAR_MESSAGE, 
    LOGOUT_SUCCESS 
} from './types';

export const returnMessage = (msg, status, id = null) => {    
    if (status === 401) {        
        return {
            type: LOGOUT_SUCCESS
        }
    }

    return {
        type: GET_MESSAGE,
        payload: { msg, status, id }
    }
}

export const clearMessage = () => {    
    return {
        type: CLEAR_MESSAGE
    }
}