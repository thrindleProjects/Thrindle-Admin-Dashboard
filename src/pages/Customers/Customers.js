import React, { useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import { orderFilter, customerHeader, customerData } from "../../data";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import CustomerTable from "../../components/Common/GenralTable/CustomerTable";

const Customers = () => {
  const [filterValue, setFilterValue] = useState("");
  return (
    <MainContainer>
      <FirstSection className="w-full">
        <ScreenHeader title="Customers" value={1000} />
        <GeneralFilterTab
          filter={filterValue}
          filterData={orderFilter}
          changeFilter={(val) => setFilterValue(val)}
        />
        <GeneralPagination
          cancelText="Cancel Order"
          deleteText="delete Order"
        />
        <CustomerTable
          tableHeaderData={customerHeader}
          tableData={customerData}
          showCheck
        />
      </FirstSection>
    </MainContainer>
  );
};

export default Customers;

const FirstSection = styled.div``;
