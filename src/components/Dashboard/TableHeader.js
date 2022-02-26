import React from "react";
import styled from "styled-components";

const TableHeader = (props) => {
  const dataLength = props.data.length;
  return (
    <MainCont
      length={dataLength}
      className={`w-full lg:grid grid-cols-${dataLength} gap-5 mt-2`}
    >
      {props.data.map((item, index) => (
        <h6 className="text-left text-xs font-Medium" key={index}>
          {item.title}
        </h6>
      ))}
      {/* <h1>hello</h1> */}
    </MainCont>
  );
};

export default TableHeader;

const MainCont = styled.div`
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  height: 40px;
  align-items: center;
`;
