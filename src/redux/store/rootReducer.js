import { combineReducers } from 'redux';
import { loginReducer } from '../reducer/authReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
