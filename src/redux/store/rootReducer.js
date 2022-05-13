import { combineReducers } from "redux";
import { loginReducer } from "../reducer/authReducer";
import { ordersReducer } from "../reducer/ordersReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  orders: ordersReducer,

});

export default rootReducer;
