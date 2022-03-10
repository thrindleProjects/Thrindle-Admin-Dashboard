import * as actions from '../actions/actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.HANDLE_AUTH:
      return { ...state, isAuthenticated: action.payload.status };
    default:
      return { ...state };
  }
};

export default reducer;
