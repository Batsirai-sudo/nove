import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import AdminReducer from './admin';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  admin: AdminReducer,
});
