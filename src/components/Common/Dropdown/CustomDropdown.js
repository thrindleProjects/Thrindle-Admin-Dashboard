import React from "react";
import styled from "styled-components";
import { Fieldset } from "../../../styles/globalStyles";

const Select = styled.div`
  position: relative;
  width: 100%;
  color: #20639b;
  padding: 0.3em 0em 0.5em 0.5em;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Option = styled.div`
  &.store-option {
    padding: 0.1em 0.3em;
    margin: 5px;
    z-index: 7;

    &:hover {
      background: #4165e8;
      color: white;
      border-radius: 4px;
    }
  }
`;

const OptionBox = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  z-index: 3;
  background: #ebe6e6;
  color: black;
  border-radius: 8px;
  top: 2em;
  left: 0;
  padding-top: 0.2em;
  box-shadow: -2px 1px 5px -1px #ccc, 2px 0px 5px -1px #ccc;
  cursor: pointer;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0.5em 0;
  z-index: -1;
`;

const SearchInput = styled.input`
  width: 98%;
  background-color: inherit;
  padding: 0.3em 0.5em;
  margin: 5px 5px 0 5px;
  outline: none;
  border: 1px solid black;
  border-radius: inherit;
  z-index: 7;

  &::placeholder {
    color: inherit;
    opacity: 0.5;
  }

  &:focus {
    border: 2px solid #4165e8;
  }
`;

function CustomDropdown({
  list,
  setOpenDropdown,
  selectStore,
  currentStoreValue,
  setCurrentStoreValue,
  toggleOptions,
  fieldset,
  storeValue,
  setStoreValue,
  searchStoreValue,
  handleSearch,
  required,
}) {
  // helper function to compute empty state value and UI
  const handleReset = () => {
    setStoreValue("");
    setCurrentStoreValue("Choose a Store");
    document.getElementById("stores-box").style.display = "none";
    setOpenDropdown(false);
  };

  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      <Select>
        <div
          className="flex justify-between items-center"
          onClick={(e) => toggleOptions(e)}
        >
          <Option>{currentStoreValue}</Option>
          <svg
            className="w-3.5 h-3.5 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <OptionBox id="stores-box" className="font-Regular">
          <SearchInput
            type="text"
            placeholder="Search by store name"
            value={searchStoreValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Option className="store-option" onClick={handleReset}>
            Choose a Store
          </Option>
          {list?.map((item, index) => (
            <Option
              key={index}
              className="store-option"
              onClick={(e) => selectStore(e, index)}
              id={`store${index}`}
              data-value={item}
            >
              {item}
            </Option>
          ))}
        </OptionBox>
      </Select>
      <Input
        type="text"
        value={storeValue}
        required={required}
        onChange={() => setStoreValue(storeValue)}
      />
    </Fieldset>
  );
}

export default CustomDropdown;
