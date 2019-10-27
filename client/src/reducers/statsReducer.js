import { GET_STATS_SUCCESS } from '../actions/types';

const initialState = {
    stats: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STATS_SUCCESS:
            return {
                stats: action.payload
            }
        default:
            return state
    }
}