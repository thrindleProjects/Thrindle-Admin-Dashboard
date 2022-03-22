import * as constants from "../../constants/index";

export const setSingleOrder = (order) => (dispatch) => {
  return dispatch({ type: constants.SET_ORDER_ITEM, payload: order });
};
