import * as constants from '../../constants/index';

export const loginReducer = (
  state = {
    isLoading: false,
    isError: '',
    user: {},
    accessToken: '',
    refreshToken: '',
  },
  { type, payload }
) => {
  switch (type) {
    case constants.ADMIN_LOGIN_LOADING:
      return { ...state, isLoading: true };
    case constants.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case constants.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isError: payload,
        user: {},
        accessToken: '',
        refreshToken: '',
        isLoading: false,
      };
    case constants.ADMIN_LOGOUT:
      return {
        ...state,
        isError: payload,
        user: {},
        accessToken: '',
        refreshToken: '',
      };
    case constants.CLEAR_DETAILS:
      return {
        ...state,
        isError: '',
        isLoading: false,
      };
    default:
      return state;
  }
};
