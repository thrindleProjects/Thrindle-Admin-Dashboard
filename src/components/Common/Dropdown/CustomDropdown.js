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
    font-weight: 600;
    padding: 0.1em 0.3em;
    margin: 5px 3px;
  }
`;

const OptionBox = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  z-index: 3;
  background: #575757;
  color: white;
  border-radius: 8px;
  top: 2em;
  left: 0;
  box-shadow: -2px 1px 5px -1px #ccc, 2px 0px 5px -1px #ccc;
  cursor: pointer;

  & > div {
    &:hover {
      background: #4165e8;
      color: white;
      border-radius: 4px;
    }
  }
`;

function CustomDropdown({
  list,
  selectStoreTest,
  value,
  toggleOptions,
  fieldset,
}) {
  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      <Select>
        <div
          className="flex justify-between items-center"
          onClick={(e) => toggleOptions(e)}
        >
          <Option>{value}</Option>
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

        <OptionBox id="stores-box">
          <Option className="store-option">Choose a Store</Option>
          {list?.map((item, index) => (
            <Option
              key={index}
              className="store-option"
              onClick={() => selectStoreTest(index)}
              id={`store${index}`}
              data-value={item}
            >
              {item}
            </Option>
          ))}
        </OptionBox>
      </Select>{" "}
    </Fieldset>
  );
}

export default CustomDropdown;
