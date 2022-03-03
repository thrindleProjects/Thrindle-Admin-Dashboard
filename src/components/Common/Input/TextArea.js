import React from "react";
import styled from "styled-components";

const Fieldset = styled.fieldset`
  border: 0.98px solid #20639b;
  color: #2f3133;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  padding: 0 5px 5px;

  &:focus-within {
    border: 1px solid #f39e28;
    box-shadow: 3px 4px 10px rgba(237, 56, 51, 0.25);
  }
`;

const TextAreaElement = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.3em 0.5em 0.5em 0.5em;
  color: #20639b;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: inherit;
    opacity: 0.3;
    color: #20639b;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }
`;

function TextArea({
  fieldset,
  id,
  name,
  placeholder,
  value,
  onChange,
  rows,
  cols,
  noFormik,
}) {
  return (
    <>
      {noFormik ? (
        <Fieldset>
          <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
          <TextAreaElement
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            cols={cols}
          />
        </Fieldset>
      ) : (
        <Fieldset>
          <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
          <TextAreaElement
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            cols={cols}
          />
        </Fieldset>
      )}
    </>
  );
}

export default TextArea;
