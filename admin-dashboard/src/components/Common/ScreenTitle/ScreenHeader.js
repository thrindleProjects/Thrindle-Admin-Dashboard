import React from "react";
import styled from "styled-components";

const ScreenHeader = (props) => {
  return (
    <MainHeader className="w-full flex flex-row pt-5 pb-10">
      <h2 className="text-left header text-3xl  font-ExtraBold mr-5">
        {props.title}
      </h2>
      <div className="box flex flex-row bg-primary-dark">
        <p className="text-white-main text-sm font-Bold">{props.value}</p>
      </div>
    </MainHeader>
  );
};

export default ScreenHeader;

const MainHeader = styled.div`
  align-items: center;
  .header {
    color: #2f3133;
  }
  .box {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 2000px) {
    .header {
      font-size: 36px;
    }
  }
`;
