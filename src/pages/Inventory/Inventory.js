import { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import InventoryTable from "../../components/Common/GenralTable/InventoryTable";
import {
  approvedProductHeader,
  inventData,
  inventFilter,
  inventTableHeader,
} from "../../data/data";
import styled from "styled-components";
import axios from "axios";
import InventoryEditModal from "../../components/Inventory/InventoryEditModal";
import ApprovedProducts from "../../components/Common/GenralTable/ApprovedProducts";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";
import DeleteProductModal from "../../components/DeleteProductModal/DeleteProductModal";

const Inventory = (props) => {
  const [products, setProducts] = useState({
    allProducts: [],
    paginatedProducts: [],
    pageIndex: 0,
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState({
    editModal: false,
  });
  const [modalId, setModalId] = useState("");
  const [activeTab, setActiveTab] = useState("Pending Products");
  const [activeID, setActiveID] = useState(null);
  const [activeApprovedProduct, setActiveApprovedProducts] = useState({});
  const [filterValue, setFilterValue] = useState("");
  const [inventoryData, setInventoryData] = useState(inventData);
  const [allInventory, setAllInventory] = useState("");
  const [status, setStatus] = useState({ isLoading: true, isError: false });

  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

  const qty = props.location.search
    ? props.location.search.split("=")[1]
    : "Pending Products";

  // Break Customers Array into smaller arrays for pagination
  const paginationArr = (arr, size) =>
    Array.from({ length: Math.ceil(arr?.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  // get Markets data and store in local storage
  const getMarkets = async () => {
    try {
      let res = await axiosInstance.get("markets/getAllMarkets");
      localStorage.setItem("marketData", JSON.stringify(res.data.data));
    } catch (error) {
      if (error.response) {
        toast.warning(`${error.response.data.message}`);
      } else {
        toast.error(`${error}`);
      }
    }
  };

  // HandlePagination
  const handlePagination = (type) => {
    switch (type) {
      case "NEXT_PAGE":
        setProducts((oldProducts) => {
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
        setProducts((oldProducts) => {
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

  const handleSetModal = useCallback((action, modalId) => {
    switch (action) {
      case "SHOW_EDIT_MODAL":
        setShowModal({ editModal: true });
        setModalId(modalId);
        break;
      case "CLOSE_ALL_MODALS":
        setShowModal({ editModal: false });
        break;
      default:
        break;
    }
  }, []);

  const getAllProducts = useCallback(async () => {
    if (activeTab) {
      setProducts((oldProducts) => {
        return {
          ...oldProducts,
          paginatedProducts: [],
          allProducts: [],
          pageIndex: 0,
        };
      });

      let endpoints = [
        `${url}/products/unverifiedproducts`,
        `${url}/products/search`,
      ];

      setStatus({ isError: false, isLoading: true });

      try {
        let [allUnverifiedProducts, approvedProducts] = await axios.all(
          endpoints.map(async (endpoint) => {
            try {
              let {
                data: { data },
              } = await axiosInstance.get(endpoint);

              // Make request to get all market data
              await getMarkets();

              if (data) {
                setStatus({ isLoading: false, isError: false });
              }
              return data.reverse();
            } catch (error) {
              toast.error("Something went wrong ...");
            }
          })
        );

        // let allProducts, paginatedProducts;

        if (activeTab === "Pending Products") {
          // allProducts = allUnverifiedProducts;
          // paginatedProducts =
          setProducts((prevState) => {
            return {
              ...prevState,
              allProducts: allUnverifiedProducts,
              paginatedProducts: paginationArr(allUnverifiedProducts, 20),
            };
          });
        }

        if (activeTab === "Approved Products") {
          setProducts((prevState) => {
            return {
              ...prevState,
              allProducts: approvedProducts,
              paginatedProducts: paginationArr(approvedProducts, 20),
            };
          });
        }

        setInventoryData((prevState) => {
          let currentState = prevState.map((item) => {
            if (item.title === "Pending Products") {
              return { ...item, value: allUnverifiedProducts?.length };
            }

            if (item.title === "Approved Products") {
              return { ...item, value: approvedProducts?.length };
            }

            return item;
          });

          return currentState;
        });

        setAllInventory(
          allUnverifiedProducts?.length + approvedProducts?.length
        );

        return setStatus({ isError: false, isLoading: false });
      } catch (error) {
        setStatus({ isLoading: false, isError: true });
        toast.error("Something went wrong ...");
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (qty && qty !== "") {
      setActiveTab(qty);
    }
  }, [qty]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const displayDeleteModal = (id, data) => {
    setOpenDeleteModal(true);
    setActiveID(id);
    setActiveApprovedProducts(data);
  };

  return (
    <MainContainer
      className={` relative ${showModal.editModal && "overflow-y-hidden"}`}
    >
      <FirstSection className={`${showModal.editModal && "overflow-y-hidden"}`}>
        {showModal.editModal && (
          <InventoryEditModal
            handleSetModal={handleSetModal}
            modalId={modalId}
            getAllProducts={getAllProducts}
          />
        )}
        <ScreenHeader title="Inventory" value={allInventory} />
        <GeneralHeaderTab
          data={inventoryData}
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
          pageNumber={products?.pageIndex}
          itemsNumber={products?.paginatedProducts}
          totalNumber={products?.allProducts?.length}
        />

        {!status.isError && status.isLoading && (
          <div className="w-full h-96">
            <NewLoader />
          </div>
        )}

        {status.isError && <div>Error! Please Reload the Page</div>}

        {!status.isError &&
          !status.isLoading &&
          activeTab === "Pending Products" && (
            <InventoryTable
              showCheck
              tableHeaderData={inventTableHeader}
              tableData={products?.paginatedProducts[products?.pageIndex]}
              setModal={handleSetModal}
            />
          )}

        {!status.isError &&
          !status.isLoading &&
          activeTab === "Approved Products" && (
            <ApprovedProducts
              tableHeaderData={approvedProductHeader}
              tableData={products?.paginatedProducts[products?.pageIndex]}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              displayDeleteModal={(id, activeData) =>
                displayDeleteModal(id, activeData)
              }
            />
          )}
        {openDeleteModal && (
          <DeleteProductModal
            setOpenDeleteModal={setOpenDeleteModal}
            activeID={activeID}
            activeDeleteProduct={activeApprovedProduct}
          />
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Inventory;

const FirstSection = styled.div``;
