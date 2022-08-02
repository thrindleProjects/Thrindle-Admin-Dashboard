import * as constants from "../../constants/index";

const initialState = {
  allStores: [],
  allStoresImmutable: [],
  paginatedStores: [],
  pageIndex: 0,
  markets: [],
  currentMarket: "",
  nameFilter: "",
};

export const storesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SET_STORES_DATA:
      return { ...state, ...payload };
    case constants.INCREASE_PAGE_INDEX:
      return { ...state, pageIndex: payload };
    case constants.DECREASE_PAGE_INDEX:
      return { ...state, pageIndex: payload };
    case constants.SET_FILTER_NAME_VALUE:
      return { ...state, nameFilter: payload };
    default:
      return state;
  }
};
