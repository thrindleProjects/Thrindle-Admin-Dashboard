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
  const [unverifiedProducts, setUnverifiedProducts] = useState({
    allUnverifiedProducts: [],
    paginatedProducts: [],
    pageIndex: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [activeTab, setActiveTab] = useState("Pending Products");
  const [filterValue, setFilterValue] = useState("");
  const [customerData, setCustomerData] = useState(inventData);
  const [status, setStatus] = useState({ isLoading: true, isError: false });

  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

  const qty = props.location.search
    ? props.location.search.split("=")[1]
    : "Pending Products";

  // Break Customers Array into smaller arrays for pagination
  const paginationArr = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  // HandlePagination
  const handlePagination = (type) => {
    switch (type) {
      case "NEXT_PAGE":
        setUnverifiedProducts((oldProducts) => {
          if (
            oldProducts.paginatedProducts.length - 1 ===
            oldProducts.pageIndex
          ) {
            return oldProducts;
          }
          return { ...oldProducts, pageIndex: oldProducts.pageIndex + 1 };
        });
        break;
      case "PREVIOUS_PAGE":
        setUnverifiedProducts((oldProducts) => {
          if (oldProducts.pageIndex === 0) {
            return oldProducts;
          }
          return { ...oldProducts, pageIndex: oldProducts.pageIndex - 1 };
        });
        break;
      default:
        console.log("Argumenet NOT handled");
        break;
    }
  };

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

  const getAllUnverifiedProducts = useCallback(async () => {
    setStatus({ isLoading: true, isError: false });
    setUnverifiedProducts((oldProducts) => {
      return { ...oldProducts, paginatedProducts: [], allProducts: [] };
    });
    try {
      const {
        status: statusCode,
        data: { data: allUnverifiedProducts },
      } = await axios.get(`${url}/products/unverifiedproducts`);
      if (statusCode > 399)
        return setStatus({ isError: true, isLoading: false });
      let paginatedProducts = paginationArr(allUnverifiedProducts, 20);
      setCustomerData((oldState) => {
        let newState = oldState.map((item) => {
          if (item.title !== "Pending Products") return item;
          return { ...item, value: allUnverifiedProducts.length };
        });
        return newState;
      });
      setUnverifiedProducts((oldProducts) => {
        return { ...oldProducts, paginatedProducts, allUnverifiedProducts };
      });
      return setStatus({ isError: false, isLoading: false });
    } catch (error) {
      setStatus({ isLoading: false, isError: true });
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    getAllUnverifiedProducts();
  }, [showModal, getAllUnverifiedProducts]);

  return (
    <MainContainer className='relative'>
      <FirstSection>
        {showModal && (
          <InventoryModal setModal={setShowModal} modalId={modalId} />
        )}
        <ScreenHeader
          title='Inventory'
          value={unverifiedProducts.allUnverifiedProducts.length}
        />
        <GeneralHeaderTab
          data={customerData}
          activeTab={activeTab}
          changeTab={changeTab}
        />
        <GeneralFilterTab
          filter={filterValue}
          filterData={inventFilter}
          changeFilter={(val) => setFilterValue(val)}
        />
        <GeneralPagination
          showButtons={false}
          pag
          handlePagination={handlePagination}
          pageNumber={unverifiedProducts.pageIndex}
          itemsNumber={unverifiedProducts.paginatedProducts}
          totalNumber={unverifiedProducts.allUnverifiedProducts.length}
        />
        {status.isError && <div>Error! Please Reload the Page</div>}
        {!status.isError &&
          !status.isLoading &&
          unverifiedProducts.allUnverifiedProducts.length > 0 && (
            <InventoryTable
              showCheck
              tableHeaderData={inventTableHeader}
              tableData={
                unverifiedProducts.paginatedProducts[
                  unverifiedProducts.pageIndex
                ]
              }
              setModal={handleSetModal}
            />
          )}
        {!status.isError && status.isLoading && <Loader />}
      </FirstSection>
    </MainContainer>
  );
};

export default Inventory;

const FirstSection = styled.div``;
