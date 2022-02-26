import { useState, useEffect } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import { inventData } from "../../data";
import styled from "styled-components";

const Inventory = (props) => {
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
      <FirstSection>
        <ScreenHeader title='Inventory' value={4000} />
        <GeneralHeaderTab
          data={inventData}
          activeTab={activeTab}
          changeTab={changeTab}
        />
      </FirstSection>
    </MainContainer>
  );
};

export default Inventory;

const FirstSection = styled.div``;
