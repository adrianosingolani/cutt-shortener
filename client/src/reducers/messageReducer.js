import { 
    GET_MESSAGE, 
    CLEAR_MESSAGE 
} from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    id: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGE:            
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }

        case CLEAR_MESSAGE:
            return {
                msg: {},
                status: null,
                id: null
            }
        default:
            return state
    }
}