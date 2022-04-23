// import axiosInstance from "../../../utils/axiosInstance";
// import { errorHandler } from "../../../utils/axiosUtils";
// import * as constants from "../../constants/index";

export const HANDLE_AUTH = "HANDLE_AUTH";

// export const login_admin = (email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: constants.ADMIN_LOGIN_LOADING,
//     });
//     const {
//       data: {
//         data: { user, access_token, refresh_token },
//       },
//     } = await axiosInstance.post("/users/login", { email, password });

//     if (user && access_token && refresh_token) {
//       dispatch({
//         type: constants.ADMIN_LOGIN_SUCCESS,
//         payload: {
//           user,
//           accessToken: access_token,
//           refreshToken: refresh_token,
//         },
//       });
//     }
//   } catch (error) {
//     errorHandler(error, dispatch);
//   } finally {
//     dispatch({
//       type: constants.CLEAR_DETAILS,
//     });
//   }
// };
