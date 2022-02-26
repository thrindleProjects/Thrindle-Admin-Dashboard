import React, { useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import {
  storeData,
  storeFilter,
  sellerHeader,
  storeTableData,
} from "../../data";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import StoreTable from "../../components/Common/GenralTable/StoreTable";

const Stores = () => {
  const [activeTab, setActiveTab] = useState("Pending Stores");
  const [filterValue, setFilterValue] = useState("");
  const changeTab = (val) => {
    setActiveTab(val);
  };
  return (
    <MainContainer>
      <FirstSection className="w-full">
        <ScreenHeader title="Stores" value={1000} />
        <GeneralHeaderTab
          data={storeData}
          activeTab={activeTab}
          changeTab={(val) => changeTab(val)}
        />
        <GeneralFilterTab
          filter={filterValue}
          filterData={storeFilter}
          changeFilter={(val) => setFilterValue(val)}
        />
        <GeneralPagination
          cancelText="Cancel Order"
          deleteText="delete Order"
        />
        <StoreTable
          tableHeaderData={sellerHeader}
          tableData={storeTableData}
          showCheck
        />
      </FirstSection>
    </MainContainer>
  );
};

export default Stores;

const FirstSection = styled.div``;
