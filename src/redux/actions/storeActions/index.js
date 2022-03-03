import {
  errorDispatch,
  loadingDispatch,
  successDispatch,
} from "../../../utils/requestFunc";
import {
  CREATE_STORE_FAIL,
  CREATE_STORE_LOADING,
  CREATE_STORE_SUCCESS,
  GET_MARKETS_FAIL,
  GET_MARKETS_LOADING,
  GET_MARKETS_SUCCESS,
} from "../../constants";
import axios from "axios";

let connect = process.env;

let url = {
  prod: connect.REACT_APP_API_URL,
};

export const get_Markets = () => async (dispatch, getState) => {
  try {
    loadingDispatch(GET_MARKETS_LOADING);
    const token = getState().verifyNumber.token;

    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authorization}`,
      },
    };

    const {data} = await axios.get(`${url.prod}/markets/getAllMarkets`, config);

    successDispatch(GET_MARKETS_SUCCESS, data);
  } catch (error) {
    errorDispatch(GET_MARKETS_FAIL, error);
  }
};

export const create_Store =
  (
    store_name,
    description,
    store_address,
    market_id,
    logo,
    acc_name,
    acc_no,
    bank,
    transaction_pin,
    nin,
  ) =>
  async (dispatch, getState) => {
    if (logo === [] && nin !== "") {
      try {
        loadingDispatch(CREATE_STORE_LOADING);

        const token = getState().verifyNumber.token;

        const authorization = `Bearer ${token}`;

        let userData = new FormData();
        // userData.append('logo', logo);
        userData.append("store_name", store_name);
        userData.append("description", description);
        userData.append("store_address", store_address);
        userData.append("market_id", market_id);
        userData.append("store_wallet[acc_name]", acc_name);
        userData.append("store_wallet[acc_no]", acc_no);
        userData.append("store_wallet[bank]", bank);
        userData.append("transaction_pin", transaction_pin);
        userData.append("nin", nin);
        const config = {
          method: "post",
          url: `${url.prod}/stores/createstore`,
          headers: {
            Authorization: `${authorization}`,
            "Content-Type": "multipart/form-data",
          },
          data: userData,
          timeout: 60000,
          timeoutErrorMessage:
            "Couldn't connect to the server. Poor network connection",
        };

        await axios(config)
          .then(res => {
            successDispatch(CREATE_STORE_SUCCESS, res.data);
          })
          .catch(error => {
            errorDispatch(CREATE_STORE_FAIL, error);
          });
      } catch (error) {
        errorDispatch(CREATE_STORE_FAIL, error);
      }
    } else if (logo === [] && nin === "") {
      try {
        loadingDispatch(CREATE_STORE_LOADING);

        const token = getState().verifyNumber.token;

        const authorization = `Bearer ${token}`;

        let userData = new FormData();
        // userData.append('logo', logo);
        userData.append("store_name", store_name);
        userData.append("description", description);
        userData.append("store_address", store_address);
        userData.append("market_id", market_id);
        userData.append("store_wallet[acc_name]", acc_name);
        userData.append("store_wallet[acc_no]", acc_no);
        userData.append("store_wallet[bank]", bank);
        userData.append("transaction_pin", transaction_pin);
        //  userData.append('nin', nin);
        const config = {
          method: "post",
          url: `${url.prod}/stores/createstore`,
          headers: {
            Authorization: `${authorization}`,
            "Content-Type": "multipart/form-data",
          },
          data: userData,
          timeout: 60000,
          timeoutErrorMessage:
            "Couldn't connect to the server. Poor network connection",
        };

        await axios(config)
          .then(res => {
            successDispatch(CREATE_STORE_SUCCESS, res.data);
          })
          .catch(error => {
            errorDispatch(CREATE_STORE_FAIL, error);
          });
      } catch (error) {
        errorDispatch(CREATE_STORE_FAIL, error);
      }
    } else if (logo !== [] && nin !== "") {
      try {
        loadingDispatch(CREATE_STORE_LOADING);

        const token = getState().verifyNumber.token;

        const authorization = `Bearer ${token}`;

        let userData = new FormData();
        logo.map(item => userData.append("logo", item));
        // userData.append("logo", logo);
        userData.append("store_name", store_name);
        userData.append("description", description);
        userData.append("store_address", store_address);
        userData.append("market_id", market_id);
        userData.append("store_wallet[acc_name]", acc_name);
        userData.append("store_wallet[acc_no]", acc_no);
        userData.append("store_wallet[bank]", bank);
        userData.append("transaction_pin", transaction_pin);
        userData.append("nin", nin);
        const config = {
          method: "post",
          url: `${url.prod}/stores/createstore`,
          headers: {
            Authorization: `${authorization}`,
            "Content-Type": "multipart/form-data",
          },
          data: userData,
          timeout: 60000,
          timeoutErrorMessage:
            "Couldn't connect to the server. Poor network connection",
        };

        await axios(config)
          .then(res => {
            successDispatch(CREATE_STORE_SUCCESS, res.data);
          })
          .catch(error => {
            errorDispatch(CREATE_STORE_FAIL, error);
          });
      } catch (error) {
        errorDispatch(CREATE_STORE_FAIL, error);
      }
    } else if (logo !== [] && nin === "") {
      try {
        loadingDispatch(CREATE_STORE_LOADING);

        const token = getState().verifyNumber.token;

        const authorization = `Bearer ${token}`;

        let userData = new FormData();
        logo.map(item => userData.append("logo", item));
        // userData.append("logo", logo);
        userData.append("store_name", store_name);
        userData.append("description", description);
        userData.append("store_address", store_address);
        userData.append("market_id", market_id);
        userData.append("store_wallet[acc_name]", acc_name);
        userData.append("store_wallet[acc_no]", acc_no);
        userData.append("store_wallet[bank]", bank);
        userData.append("transaction_pin", transaction_pin);
        //  userData.append('nin', nin);
        const config = {
          method: "post",
          url: `${url.prod}/stores/createstore`,
          headers: {
            Authorization: `${authorization}`,
            "Content-Type": "multipart/form-data",
          },
          data: userData,
          timeout: 60000,
          timeoutErrorMessage:
            "Couldn't connect to the server. Poor network connection",
        };

        await axios(config)
          .then(res => {
            successDispatch(CREATE_STORE_SUCCESS, res.data);
          })
          .catch(error => {
            errorDispatch(CREATE_STORE_FAIL, error);
          });
      } catch (error) {
        errorDispatch(CREATE_STORE_FAIL, error);
      }
    }
  };
