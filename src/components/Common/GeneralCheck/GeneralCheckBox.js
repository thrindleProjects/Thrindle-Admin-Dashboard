import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const GeneralCheckBox = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClicked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <MainCheck
      check={props.check}
      className={`rounded-sm flex flex-row cursor-pointer ${
        isChecked && "bg-primary-dark"
      }`}
      onClick={() => handleClicked()}
    >
      {isChecked && <FaCheck className='text-base text-white-main' />}
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
  justify-content: center;
  transition: all 0.3s ease-in-out;
`;
