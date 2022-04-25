import React, { useCallback, useState } from "react";
import { Fieldset } from "../../../styles/globalStyles";
import AsyncSelect from "react-select/async";
import axiosInstance from "../../../utils/axiosInstance";
import styled from "styled-components";

const EmptyState = styled.div`
  width: 100%;
  color: #20639b;
  background: inherit;
  outline: none;
  padding: 0.3em 0.5em 0.5em 0.5em;
  cursor: pointer;
`;

const customStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "white",
    border: state.isFocused ? 0 : 0,
    outline: 0,
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#20639b",
  }),
  input: (styles) => ({
    ...styles,
    color: "#20639b",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#20639b",
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: "#20639b",
  }),
  loadingMessage: (styles) => ({
    ...styles,
    color: "#20639b",
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      color: isSelected ? "#f6f6f6" : "#20639b",
      cursor: isSelected ? "not-allowed" : "default",
    };
  },
};

function CustomDropdown({
  fieldset,
  setStoreValue,
  marketValue,
  getMarketID,
  handleSearch,
  searchStoreValue,
}) {
  const [allStores, setAllStores] = useState({
    ekoMarketStores: [],
    computerVillageStores: [],
  });

  const getEkoMarketLoadOptions = useCallback(
    async (market) => {
      let stores;
      if (allStores.ekoMarketStores.length > 0) {
        stores = allStores.ekoMarketStores.filter((item) =>
          item.value.includes(searchStoreValue)
        );
        return stores;
      }
      let marketID = getMarketID(market);
      try {
        let res = await axiosInstance.get(
          `/stores/storespermarket/${marketID}`
        );
        localStorage.setItem("storesPerMarket", JSON.stringify(res.data.data));
        stores = res.data.data
          .map((item) => {
            return {
              value: item.store_name,
              label: item.store_name,
              isFixed: true,
            };
          })
          .filter((item) => item.value.includes(searchStoreValue));
        setAllStores((oldState) => ({
          ...oldState,
          ekoMarketStores: stores,
        }));
        return stores;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.log(error);
        }
      }
    },
    [getMarketID, searchStoreValue, allStores.ekoMarketStores]
  );
  
  const getComputerVillageLoadOptions = useCallback(
    async (market) => {
      let stores;
      if (allStores.computerVillageStores.length > 0) {
        stores = allStores.computerVillageStores.filter((item) =>
          item.value.includes(searchStoreValue)
        );
        return stores;
      }
      let marketID = getMarketID(market);
      try {
        let res = await axiosInstance.get(
          `/stores/storespermarket/${marketID}`
        );
        localStorage.setItem("storesPerMarket", JSON.stringify(res.data.data));
        stores = res.data.data
          .map((item) => {
            return {
              value: item.store_name,
              label: item.store_name,
              isFixed: true,
            };
          })
          .filter((item) => item.value.includes(searchStoreValue));
        setAllStores((oldState) => ({
          ...oldState,
          computerVillageStores: stores,
        }));
        return stores;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.log(error);
        }
      }
    },
    [getMarketID, searchStoreValue, allStores.computerVillageStores]
  );

  const handleChange = (value) => {
    setStoreValue(value.value);
  };

  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      {marketValue === "" && <EmptyState>Please Select a Market</EmptyState>}
      {marketValue === "Eko Market" && (
        <AsyncSelect
          cacheOptions
          onInputChange={handleSearch}
          loadOptions={() => getEkoMarketLoadOptions(marketValue)}
          onChange={handleChange}
          placeholder={"Search For Store"}
          required
          styles={customStyles}
          defaultOptions
        />
      )}
      {marketValue === "Computer Village" && (
        <AsyncSelect
          cacheOptions
          onInputChange={handleSearch}
          onChange={handleChange}
          loadOptions={() => getComputerVillageLoadOptions(marketValue)}
          placeholder={"Search For Store"}
          required
          styles={customStyles}
          defaultOptions
        />
      )}
    </Fieldset>
  );
}

export default CustomDropdown;
