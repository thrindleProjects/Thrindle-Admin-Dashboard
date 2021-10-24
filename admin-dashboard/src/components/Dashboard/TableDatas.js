import React from "react";
import styled from "styled-components";

const TableDatas = (props) => {
  // const dataLength = props.data.length;
  return (
    <>
      <div

        className="w-full grid grid-rows-1 pt-1 overflow-auto"
      >
        <MainCont
          status={props.tab}
          className={`w-full grid grid-cols-${props.length} gap-5 mt-2 data-cont overflow-auto `}
        >
          {props.data.map((item, index) => (
            <>
              <h6
                className="text-left text-xs font-Medium status"
                key={index * 1 + 13}
              >
                {item.status}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 2 + 12}
              >
                {item.OrderID}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 3 + 10}
              >
                {item.ProductTitle}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 4 + 103}
              >
                {item.Price}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 5 + 322}
              >
                {item.CustomerName}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 6 + 414}
              >
                {item.PhoneNo}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 7 + 532}
              >
                {item.Market}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 8 + 612}
              >
                {item.Store}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 9 + 756}
              >
                {item.Category}
              </h6>
              <h6
                className="text-left text-xs font-Medium"
                key={index * 10 + 438}
              >
                {item.OrderDate}
              </h6>
            </>
          ))}
        </MainCont>
      </div>
    </>
  );
};


export default TableDatas;

const MainCont = styled.div`
  //   .main {
  //     align-items: center;
  //     justify-content: space-between;
  //   }
  .status {
    color: ${({ status }) =>
      status === "Pending"
        ? "#F69F13"
        : status === "Delivered"
        ? "#009E52"
        : "#F5000F"};
  }
`;


