import { toast } from "react-toastify";
import * as constants from "../redux/constants/index";

export const errorHandler = (error, dispatch) => {
  if (error?.response) {
    toast.error(error.response.data.message);
    return dispatch({
      type: constants.ADMIN_LOGIN_FAIL,
      payload: error?.response?.data?.message,
    });
  } else {
    toast.error("Something went wrong, Try again.");
    return dispatch({
      type: constants.ADMIN_LOGIN_FAIL,
      payload: "Something went wrong, Try again.",
    });
  }
};
