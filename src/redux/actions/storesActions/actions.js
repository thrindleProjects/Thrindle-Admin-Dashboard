import * as constants from "../../constants/index";

export const setStoresData = (storeData) => (dispatch) => {
  return dispatch({ type: constants.SET_STORES_DATA, payload: storeData });
};

export const increasePageIndex = (pageNumber) => (dispatch) => {
  return dispatch({ type: constants.INCREASE_PAGE_INDEX, payload: pageNumber });
};

export const decreasePageIndex = (pageNumber) => (dispatch) => {
  return dispatch({ type: constants.DECREASE_PAGE_INDEX, payload: pageNumber });
};

export const setFilterNameValue = (filterValue) => (dispatch) => {
  return dispatch({
    type: constants.SET_FILTER_NAME_VALUE,
    payload: filterValue,
  });
};
