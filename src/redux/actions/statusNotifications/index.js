import * as constants from "../../constants/index";

export const showNotification = data => ({
  type: constants.SHOW_NOTIFICATION,
  payload: data,
});

export const hideNotification = () => ({
  type: constants.HIDE_NOTIFICATION,
});
