import { combineReducers } from 'redux';
import urlReducer from './urlReducer';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import appReducer from './appReducer';

export default combineReducers({
    urls: urlReducer,
    auth: authReducer,
    message: messageReducer,
    app: appReducer
})