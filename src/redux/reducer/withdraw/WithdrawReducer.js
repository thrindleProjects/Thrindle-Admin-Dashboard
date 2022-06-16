import { WITHDRAW_DATA, WITHDRAW_LOADING, WITHDRAW_ERROR } from "../../constants/index";


const initialState = {
  loading: false,
  error: "",
  data: [],
 
};




export const withdrawReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WITHDRAW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case WITHDRAW_DATA:
      return {
        ...state,
        loading: false,
        error: "",
        ...payload,
      };
    
    case  WITHDRAW_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };

    default:
      return state;
  }
};