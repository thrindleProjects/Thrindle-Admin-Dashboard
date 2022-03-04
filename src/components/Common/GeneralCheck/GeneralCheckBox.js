import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const GeneralCheckBox = (props) => {
  return (
    <MainCheck
      check={props.check}
      className="rounded-sm flex flex-row cursor-pointer"
      onClick={props.toggleCheck}
    >
      {props.check && <FaCheck className="text-base text-white-main" />}
    </MainCheck>
  );
};

export default GeneralCheckBox;

const MainCheck = styled.div`
  width: 20px;
  height: 20px;
  border: 1.5px solid #2f3133;
  background: ${({ check }) => (check ? "#16588F" : "")};
  align-items: center;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
`;
