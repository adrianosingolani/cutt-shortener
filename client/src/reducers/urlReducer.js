import {
    GET_CODE_SUCCESS,
    GET_CODE_FAIL,
    GET_DETAILS_SUCCESS,
    REDIRECT_SUCCESS,
    ADD_URL_SUCCESS,
    UPDATE_URL_SUCCESS,
    DELETE_URL_SUCCESS,
    GET_URLS_SUCCESS
} from '../actions/types';

const initialState = {
    newCode: null,
    urls: [
        {
            id: null,
            urlCode: null,
            longUrl: null,
            date: null,
            clicks: [{ date: null }],
            accordionActive: false
        }
    ],
    redirectUrl: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CODE_SUCCESS:
            return {
                ...state,
                newCode: action.payload.urlCode
            }
        case GET_CODE_FAIL:
            return {
                ...state,
                newCode: null
            }
        case ADD_URL_SUCCESS:
            return {
                ...state,
                urls: [...state.urls, action.payload],
                newCode: ''
            }
        case UPDATE_URL_SUCCESS:
            const updatedUrls = state.urls.map(url => {
                // return url._id === action.payload._id ? action.payload : url;

                if (url._id === action.payload._id) {
                    url = action.payload;
                    url.accordionActive = true;
                }

                return url;
            })

            return {
                ...state,
                urls: updatedUrls
            }
        case DELETE_URL_SUCCESS:
            const urls = state.urls.filter(url => {
                return url._id !== action.payload._id;
            });

            return {
                ...state,
                urls: urls
            }
        case GET_URLS_SUCCESS:
            return {
                ...state,
                urls: action.payload
            }
        case REDIRECT_SUCCESS:
            return {
                ...state,
                redirectUrl: action.payload
            }
        case GET_DETAILS_SUCCESS:
            return {
                ...state,
                urlDetails: action.payload
            }
        default:
            return state
    }
}