import { combineReducers } from "redux";
import { loginReducer } from "../reducer/authReducer";
import { ordersReducer } from "../reducer/ordersReducer";
import { storesReducer } from "../reducer/storesReducer";
import { withdrawReducer } from "../reducer/withdraw/WithdrawReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  orders: ordersReducer,
  stores: storesReducer,
  withdraw: withdrawReducer
});

export default rootReducer;
