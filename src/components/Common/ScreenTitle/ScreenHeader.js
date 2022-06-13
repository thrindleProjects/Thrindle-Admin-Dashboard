import React from "react";
import styled from "styled-components";

const ScreenHeader = (props) => {
  return (
    <MainHeader className="flex flex-row pt-5 pb-5 lg:pb-10">
      <h2 className="text-left header text-lg md:text-2xl lg:text-3xl font-ExtraBold mr-5">
        {props.title}
      </h2>
      {props.noVal ? (
        ""
      ) : (
        <div className="box flex flex-row bg-primary-dark text-lg md:text-2xl lg:text-3xl">
          <p className="text-white-main text-sm font-Bold">{props.value}</p>
        </div>
      )}
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
    width: max-content;
    aspect-ratio: 1;
    padding: 0.25rem; 
    border-radius: 50px;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 768px) {
    /* .box {
      width: px;
    } */
  }

  @media (min-width: 1024px) {
    /* .box {
      width: 50px;
    } */
  }

  @media (min-width: 2000px) {
    .header {
      font-size: 36px;
    }
  }
`;
