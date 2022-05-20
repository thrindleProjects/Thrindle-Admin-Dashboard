import { combineReducers } from "redux";
import { loginReducer } from "../reducer/authReducer";
import { ordersReducer } from "../reducer/ordersReducer";
import { storesReducer } from "../reducer/storesReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  orders: ordersReducer,
  stores: storesReducer,
});

export default rootReducer;
