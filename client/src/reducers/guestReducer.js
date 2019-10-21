import {
    ADD_URL_SUCCESS,
    SET_STORED_URLS
} from '../actions/types';

const initialState = {
    urls: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_URL_SUCCESS:
            return {
                urls: [action.payload, ...state.urls]
            }
        case SET_STORED_URLS:
                return {
                    urls: action.payload
                }
        default:
            return state
    }
}