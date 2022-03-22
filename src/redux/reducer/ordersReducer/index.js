import * as constants from "../../constants/index"

export const ordersReducer = (state= {
  singleOrder: {},
}, {type, payload}) => {
  switch (type) {
    case constants.SET_ORDER_ITEM:
      return {...state, singleOrder: payload}
    default:
      return state;
  }
}