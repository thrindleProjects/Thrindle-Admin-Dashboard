import { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import InventoryTable from "../../components/Common/GenralTable/InventoryTable";
import InventoryModal from "../../components/Inventory/InventoryModal";
import {
  inventData,
  inventFilter,
  inventTableHeader,
  inventTableData,
} from "../../data";
import styled from "styled-components";

const Inventory = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [activeTab, setActiveTab] = useState("Pending Products");
  const [filterValue, setFilterValue] = useState("");

  const qty = props.location.search
    ? props.location.search.split("=")[1]
    : "Pending Products";

  const changeTab = (val) => {
    setActiveTab(val);
  };
  useEffect(() => {
    if (qty && qty !== "") {
      setActiveTab(qty);
    }
  }, [qty]);

  const handleSetModal = useCallback(
    (arg = true, modalItem = inventData[0]) => {
      setShowModal(arg);
      setModalItem(modalItem);
    },
    []
  );

  return (
    <MainContainer className='relative'>
      <FirstSection>
        {showModal && (
          <InventoryModal setModal={setShowModal} modalItem={modalItem} />
        )}
        <ScreenHeader title='Inventory' value={4000} />
        <GeneralHeaderTab
          data={inventData}
          activeTab={activeTab}
          changeTab={changeTab}
        />
        <GeneralFilterTab
          filter={filterValue}
          filterData={inventFilter}
          changeFilter={(val) => setFilterValue(val)}
        />
        <GeneralPagination noPag showButtons={false} />
        <InventoryTable
          showCheck
          tableHeaderData={inventTableHeader}
          tableData={inventTableData}
          setModal={handleSetModal}
        />
      </FirstSection>
    </MainContainer>
  );
};

export default Inventory;

const FirstSection = styled.div``;
