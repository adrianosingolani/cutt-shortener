import { combineReducers } from 'redux';
import urlReducer from './urlReducer';
import statsReducer from './statsReducer';
import guestReducer from './guestReducer';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import appReducer from './appReducer';

export default combineReducers({
    urls: urlReducer,
    stats: statsReducer,
    guest: guestReducer,
    auth: authReducer,
    message: messageReducer,
    app: appReducer
})