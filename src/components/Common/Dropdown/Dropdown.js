import React from "react";
import styled from "styled-components";

const Fieldset = styled.fieldset`
  border: 0.98px solid #20639b;
  color: #2f3133;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;

  padding: 0 5px 5px;
`;

const Select = styled.select`
  width: 100%;
  color: #20639b;
  background: inherit;
  outline: none;
  padding: 0.3em 0.5em 0.5em 0.5em;
  cursor: pointer;
`;

const Option = styled.option`
  opacity: 0.8 !important;
  background: inherit;
`;

function Dropdown({
  list,
  fieldset,
  emptyValue,
  value,
  id,
  name,
  onChange,
  onBlur,
  required,
  weightClass,
}) {
  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      <Select
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        id={id}
        name={name}
        required={required}>
        <Option value="">{emptyValue}</Option>
        {list.map((listItems, index) =>
          weightClass ? (
            <Option key={index} value={listItems}>
              {listItems}Kg
            </Option>
          ) : (
            <Option key={index} value={listItems}>
              {listItems}
            </Option>
          ),
        )}
      </Select>
    </Fieldset>
  );
}

export default Dropdown;
