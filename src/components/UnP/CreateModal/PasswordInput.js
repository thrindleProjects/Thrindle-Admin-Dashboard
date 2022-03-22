import { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ name, id, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <PasswordWrapper>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button className="right-4 transform -translate-y-1/2 cursor-pointer text-2xl top-1/2 text-primary-main">
        {showPassword ? (
          <FaEye
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEyeSlash
            onClick={() => setShowPassword(true)}
          />
        )}
      </button>
    </PasswordWrapper>
  );
};

export default PasswordInput;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  input {
    width: 100%;
    height: 100%;
  }
  button {
    position: absolute;
    width: fit-content;
    height: fit-content;
  }
`;
