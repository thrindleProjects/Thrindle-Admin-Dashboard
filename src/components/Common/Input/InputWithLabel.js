import React, { useState } from "react";
import styled from "styled-components";


const Input = styled.input`
  width: 100%;
  border: 1px solid #20639b;
  border-radius: 5px;
  outline: none;
  padding: 0.75em 0.5em;
  color: #20639b;
  background-color: transparent;
  text-transform: capitalize;
  margin-top: 5px;

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

const InputFieldPassword = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 0.75em 0.6em;
  color: #20639b;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #20639b;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }
`;

function InputWithLabel({
  text,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  rows,
  cols,
  readOnly,
  autoComplete,
  inputMode,
  className,
}) {
  const [hidden, setHidden] = useState(true);

  const toggleVisibility = () => {
    setHidden((prevState) => !prevState);
  };

  return (
    <div>
      <label className="text-primary-main">{text}</label>
      {type === "password" ? (
        <div className="flex items-center mt-5 border border-primary-main rounded-md px-2">
          <InputFieldPassword
            type={hidden ? "password" : "text"}
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
          />

          <span className="eye">
            {hidden ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="#20639b"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleVisibility}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={toggleVisibility}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </span>
        </div>
      ) : (
        <Input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          cols={cols}
          inputMode={inputMode}
          autoComplete={autoComplete}
          readOnly={readOnly}
          className={className}
        />
      )}
    </div>
  );
}

export default InputWithLabel;


// const Fieldset = styled.fieldset`
//   border: 0.98px solid #20639b;
//   color: #2f3133;
//   border-radius: 10px;
//   -webkit-border-radius: 10px;
//   -moz-border-radius: 10px;
//   padding: 0 5px 5px;

//   &:focus-within {
//     border: 1px solid #f39e28;
//     box-shadow: 3px 4px 10px rgba(237, 56, 51, 0.25);
//   }
// `;
