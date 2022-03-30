import React from "react";
import styled from "styled-components";

const MainTable = (props) => {
  return (
    <MainCont className="w-full  overflow-auto">
      <MainHeader
        length={props.headerData.length}
        className={`w-full grid grid-cols-${props.headerData.length} gap-2 mt-2`}
      >
        {props.headerData.map((item, index) => (
          <h6 className="text-left text-xs font-Medium" key={index}>
            {item.title}
          </h6>
        ))}
      </MainHeader>
      {props.tableData.map((item, index) => (
        <div
          key={index}
          className={`w-full single-details grid grid-rows-${props.headerData.length} gap-2 `}
        >
          <p>Hello</p>
          <p>Hello</p>
          {/* <p className="status text-left text-sm text-white-text font-Regular">
            {item.status}
          </p>
          <p className="orderId text-left text-sm text-white-text font-Regular">
            {item.OrderID}
          </p> */}
        </div>
      ))}
    </MainCont>
  );
};

export default MainTable;

const MainCont = styled.div`
  //   box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  .single-details {
    height: 50px;
    align-items: center;
  }
`;
const MainHeader = styled.div`
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  height: 40px;
  align-items: center;
`;
