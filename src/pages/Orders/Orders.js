import React, { useState, useEffect } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import {
  orderData,
  orderFilter,
  orderTableHeader,
  dashTableData,
} from "../../data";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import GeneralTable from "../../components/Common/GenralTable/GeneralTable";

const Orders = (props) => {
  const [activeTab, setActiveTab] = useState("Pending Orders");
  const [filterValue, setFilterValue] = useState("");

  const qty = props.location.search
    ? props.location.search.split("=")[1]
    : "Pending Orders";
  const changeTab = (val) => {
    setActiveTab(val);
  };
  useEffect(() => {
    if (qty && qty !== "") {
      setActiveTab(qty);
    }
  }, [qty]);
  return (
    <MainContainer>
      <FirstSection className='w-full'>
        <ScreenHeader title='Orders' value={1000} />
        <GeneralHeaderTab
          data={orderData}
          activeTab={activeTab}
          changeTab={changeTab}
        />
        <GeneralFilterTab
          filter={filterValue}
          filterData={orderFilter}
          changeFilter={(val) => setFilterValue(val)}
        />
        <GeneralPagination
          cancelText='Cancel Order'
          deleteText='delete Order'
        />
        <GeneralTable
          tableHeaderData={orderTableHeader}
          tableData={dashTableData}
          showCheck
        />
      </FirstSection>
    </MainContainer>
  );
};

export default Orders;

const FirstSection = styled.div``;
