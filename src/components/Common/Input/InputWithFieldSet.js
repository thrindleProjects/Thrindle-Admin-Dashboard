import React, { useState } from "react";
import styled, { css } from "styled-components";
// import { InputFieldPassword } from "../../../styles/globalStyles";

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

  ${(props) =>
    props.autoFill &&
    css`
      background: #f0f1f5;
    `}
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.3em 0.5em 0.3em 0.5em;
  color: #20639b;
  background-color: transparent;
  text-transform: capitalize;

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

  ${(props) =>
    props.autoFill &&
    css`
      background: #f0f1f5;
    `}
`;

const InputFieldPassword = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: inherit;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }
`;

function InputWithFieldSet({
  fieldset,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  rows,
  cols,
  autoFill,
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
    <Fieldset autoFill={autoFill}>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      {type === "password" ? (
        <div className="flex align-center px-2 py-1">
          <svg
            width="20"
            height="20"
            className="mr-2"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.87756 14.2052L3.18335 14.489H3.18335L3.87756 14.2052ZM3.58839 9.53771L2.86467 9.34093H2.86467L3.58839 9.53771ZM16.4116 9.53771L17.1353 9.34092V9.34092L16.4116 9.53771ZM16.1224 14.2052L15.4282 13.9213L15.4282 13.9213L16.1224 14.2052ZM11.697 17.3688L11.5817 16.6277L11.697 17.3688ZM8.30291 17.3688L8.18758 18.1099H8.18758L8.30291 17.3688ZM6.73533 6.48783L6.58658 5.75273L6.73533 6.48783ZM13.2646 6.48783L13.1159 7.22293L13.2646 6.48783ZM7.67897 17.2717L7.7943 16.5306H7.79429L7.67897 17.2717ZM3.95497 14.3945L4.64918 14.1106L4.64918 14.1106L3.95497 14.3945ZM12.321 17.2717L12.4363 18.0128H12.4363L12.321 17.2717ZM16.045 14.3945L16.7392 14.6784L16.7392 14.6784L16.045 14.3945ZM16.3478 9.30316L15.6241 9.49995V9.49995L16.3478 9.30316ZM3.65217 9.30316L4.37589 9.49995H4.37589L3.65217 9.30316ZM12.6479 6.68814L11.9613 6.38641L12.6479 6.68814ZM11.7838 6.79038C11.6171 7.16959 11.7895 7.6121 12.1687 7.77874C12.5479 7.94538 12.9904 7.77305 13.157 7.39384L11.7838 6.79038ZM7.35205 6.68814L8.03867 6.38641V6.38641L7.35205 6.68814ZM6.84294 7.39384C7.00958 7.77306 7.45208 7.94538 7.83129 7.77874C8.21051 7.6121 8.38283 7.16959 8.21619 6.79038L6.84294 7.39384ZM9.36909 2.56183L9.49527 3.30114L9.49527 3.30114L9.36909 2.56183ZM9.46697 2.54513L9.34079 1.80582L9.34079 1.80582L9.46697 2.54513ZM10.533 2.54513L10.4068 3.28444L10.4068 3.28444L10.533 2.54513ZM10.6309 2.56183L10.757 1.82252L10.757 1.82252L10.6309 2.56183ZM12.8544 4.62363L13.587 4.46268L12.8544 4.62363ZM7.14553 4.62363L7.87805 4.78458L7.14553 4.62363ZM12.2056 16.5306L11.5817 16.6277L11.8123 18.1099L12.4363 18.0128L12.2056 16.5306ZM8.41823 16.6277L7.7943 16.5306L7.56365 18.0128L8.18758 18.1099L8.41823 16.6277ZM15.6241 9.49995L15.6878 9.73449L17.1353 9.34092L17.0715 9.10638L15.6241 9.49995ZM15.4282 13.9213L15.3508 14.1107L16.7392 14.6784L16.8166 14.489L15.4282 13.9213ZM4.64918 14.1106L4.57177 13.9213L3.18335 14.489L3.26076 14.6783L4.64918 14.1106ZM4.31211 9.7345L4.37589 9.49995L2.92844 9.10638L2.86467 9.34093L4.31211 9.7345ZM4.57177 13.9213C4.02559 12.5855 3.93513 11.1209 4.31211 9.7345L2.86467 9.34093C2.40085 11.0467 2.5128 12.8491 3.18335 14.489L4.57177 13.9213ZM15.6878 9.73449C16.0648 11.1209 15.9744 12.5855 15.4282 13.9213L16.8166 14.489C17.4872 12.8491 17.5991 11.0467 17.1353 9.34092L15.6878 9.73449ZM11.5817 16.6277C10.5341 16.7908 9.46578 16.7908 8.41823 16.6277L8.18758 18.1099C9.38798 18.2967 10.612 18.2967 11.8123 18.1099L11.5817 16.6277ZM6.88408 7.22293C8.93848 6.80721 11.0615 6.80721 13.1159 7.22293L13.4134 5.75273C11.1626 5.29728 8.83733 5.29728 6.58658 5.75273L6.88408 7.22293ZM7.79429 16.5306C6.35556 16.3068 5.16693 15.3769 4.64918 14.1106L3.26076 14.6783C3.98671 16.4538 5.62991 17.7119 7.56365 18.0128L7.79429 16.5306ZM12.4363 18.0128C14.37 17.7119 16.0132 16.4538 16.7392 14.6784L15.3508 14.1107C14.833 15.3769 13.6444 16.3068 12.2056 16.5306L12.4363 18.0128ZM13.1159 7.22293C14.3553 7.47373 15.3159 8.36659 15.6241 9.49995L17.0715 9.10638C16.6069 7.39758 15.1799 6.11019 13.4134 5.75273L13.1159 7.22293ZM6.58658 5.75273C4.82011 6.11019 3.39308 7.39758 2.92844 9.10638L4.37589 9.49995C4.68406 8.36659 5.6447 7.47373 6.88408 7.22293L6.58658 5.75273ZM11.9613 6.38641L11.7838 6.79038L13.157 7.39384L13.3345 6.98988L11.9613 6.38641ZM6.66542 6.98988L6.84294 7.39384L8.21619 6.79038L8.03867 6.38641L6.66542 6.98988ZM9.49527 3.30114L9.59315 3.28444L9.34079 1.80582L9.24291 1.82252L9.49527 3.30114ZM10.4068 3.28444L10.5047 3.30114L10.757 1.82252L10.6592 1.80582L10.4068 3.28444ZM12.1219 4.78458C12.2397 5.32079 12.1843 5.87893 11.9613 6.38641L13.3345 6.98988C13.6847 6.19304 13.7733 5.31097 13.587 4.46268L12.1219 4.78458ZM6.413 4.46268C6.22662 5.31097 6.31526 6.19304 6.66542 6.98988L8.03867 6.38641C7.81567 5.87893 7.76024 5.32079 7.87805 4.78458L6.413 4.46268ZM9.59315 3.28444C9.86219 3.23852 10.1378 3.23852 10.4068 3.28444L10.6592 1.80582C10.2231 1.73139 9.77686 1.73139 9.34079 1.80582L9.59315 3.28444ZM13.587 4.46268C13.2857 3.09174 12.1528 2.06074 10.757 1.82252L10.5047 3.30114C11.3323 3.44239 11.959 4.04301 12.1219 4.78458L13.587 4.46268ZM7.87805 4.78458C8.04099 4.04301 8.66767 3.44239 9.49527 3.30114L9.24291 1.82252C7.84718 2.06074 6.71423 3.09174 6.413 4.46268L7.87805 4.78458Z"
              fill="#9FA5C0"
            />
          </svg>

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
                stroke="currentColor"
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
          autoFill={autoFill}
          autoComplete={autoComplete}
          readOnly={readOnly}
          className={className}
        />
      )}
    </Fieldset>
  );
}

export default InputWithFieldSet;
