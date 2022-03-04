import { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import InventoryTable from "../../components/Common/GenralTable/InventoryTable";
import InventoryModal from "../../components/Inventory/InventoryModal";
import Loader from "../../components/Common/Loader/Loader";
import { inventData, inventFilter, inventTableHeader } from "../../data/data";
import styled from "styled-components";
import axios from "axios";

const Inventory = (props) => {
  const [unverifiedProducts, setUnverifiedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [activeTab, setActiveTab] = useState("Pending Products");
  const [filterValue, setFilterValue] = useState("");

  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

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

  const handleSetModal = useCallback((show = true, modalId) => {
    setShowModal(show);
    setModalId(modalId);
  }, []);

  const getAllUnverifiedStores = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${url}/products/unverifiedproducts`);
      setUnverifiedProducts(data);
    } catch (error) {
      throw new Error(error)
    }
  }, []);

  useEffect(() => {
    getAllUnverifiedStores();
  }, [getAllUnverifiedStores]);

  useEffect(() => {
    getAllUnverifiedStores();
  }, [showModal, getAllUnverifiedStores]);

  return (
    <MainContainer className="relative">
      <FirstSection>
        {showModal && (
          <InventoryModal setModal={setShowModal} modalId={modalId} />
        )}
        <ScreenHeader title="Inventory" value={4000} />
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
        <GeneralPagination noPag showButtons={false} pag={true} />
        {unverifiedProducts.length > 0 ? (
          <InventoryTable
            showCheck
            tableHeaderData={inventTableHeader}
            tableData={unverifiedProducts}
            setModal={handleSetModal}
          />
        ) : (
          <Loader />
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Inventory;

const FirstSection = styled.div``;
