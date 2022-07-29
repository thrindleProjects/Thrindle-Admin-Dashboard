import { WITHDRAW_DATA, WITHDRAW_LOADING, WITHDRAW_ERROR } from "../../constants/index";
import axiosInstance from "../../../utils/axiosInstance";



export const withdrawData = () => async (dispatch) => {
  
  dispatch({ type: WITHDRAW_LOADING });
  try {
    const res = await axiosInstance.get('withdrawal/admin');
    const resData = res.data.data.reverse();

    

    dispatch({
      type: WITHDRAW_DATA,
      payload: { data: resData,  },
    });
  } catch (error) {
    dispatch({
      type:  WITHDRAW_ERROR ,
      payload: error,
    });
    console.error(error);
  }
};