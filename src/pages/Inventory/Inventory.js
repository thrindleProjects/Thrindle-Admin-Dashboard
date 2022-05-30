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
  inventTableHeader,
} from "../../data/data";
import styled from "styled-components";
import axios from "axios";
import InventoryEditModal from "../../components/Inventory/InventoryEditModal";
// import VerifiedEditModal from "../../components/Inventory/VerifiedEditProduct";
import ApprovedProducts from "../../components/Common/GenralTable/ApprovedProducts";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";
import DeleteProductModal from "../../components/DeleteProductModal/DeleteProductModal";
import paginationArr from "../../utils/pagination";

const Inventory = (props) => {
  const [products, setProducts] = useState({
    allProducts: [],
    paginatedProducts: [],
    pageIndex: 0,
    categories: [],
    currentCategory: "",
    allProductsImmutable: [],
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState({
    verified: false,
    verifiedEditModal: false,
    editModal: false,
  });

  const [modalId, setModalId] = useState("");
  const [activeTab, setActiveTab] = useState("Pending Products");
  const [activeID, setActiveID] = useState(null);
  const [activeApprovedProduct, setActiveApprovedProducts] = useState({});
  const [filterValue, setFilterValue] = useState("");
  const [inventoryData, setInventoryData] = useState(inventData);
  const [allInventory, setAllInventory] = useState(0);
  const [status, setStatus] = useState({ isLoading: true, isError: false });

  // const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

  const qty = props.location.search
    ? props.location.search.split("=")[1]
    : "Pending Products";

  // // Break Customers Array into smaller arrays for pagination
  // const paginationArr = (arr, size) => {

  // }
  //   Array.from({ length: Math.ceil(arr?.length / size) }, (v, i) =>
  //     arr.slice(i * size, i * size + size)
  //   );

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

  const resetPageIndex = () => {
    setProducts({ ...products, pageIndex: 0 });
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
    resetPageIndex();
    setActiveTab(val);
  };

  const handleSetModal = useCallback((action, modalId, verified) => {
    switch (action) {
      case "SHOW_EDIT_MODAL":
        setShowModal({ editModal: true, verifiedEditModal: false, verified });
        setModalId(modalId);
        break;
      case "SHOW_VERIFIED_EDIT_MODAL":
        setShowModal({ editModal: false, verifiedEditModal: true, verified });
        setModalId(modalId);
        break;
      case "CLOSE_ALL_MODALS":
        setShowModal({ editModal: false, verifiedEditModal: false });
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
          currentCategory: "",
        };
      });

      setStatus({ isError: false, isLoading: true });

      let endpoints = ["/products/unverifiedproducts", "/products/search"];

      axios
        .all(endpoints.map((endpoint) => axiosInstance.get(endpoint)))
        .then(
          axios.spread((unverifiedProducts, approvedProducts) => {
            // destructing responses from axios.all
            let {
              data: { data: unverifiedProductsArr },
            } = unverifiedProducts;

            let {
              data: { data: approvedProductsArr },
            } = approvedProducts;

            getMarkets();

            // mutating all state at once
            if (activeTab === "Pending Products") {
              setProducts((prevState) => {
                if (
                  prevState?.pageIndex >
                  unverifiedProductsArr.reverse()?.length - 1
                ) {
                  return {
                    ...prevState,
                    allProducts: unverifiedProductsArr.reverse(),
                    paginatedProducts: paginationArr(
                      unverifiedProductsArr.reverse(),
                      20
                    ),
                    pageIndex: unverifiedProductsArr.reverse()?.length - 1,
                    allProductsImmutable: unverifiedProductsArr.reverse(),
                  };
                }

                return {
                  ...prevState,
                  allProducts: unverifiedProductsArr.reverse(),
                  paginatedProducts: paginationArr(
                    unverifiedProductsArr.reverse(),
                    20
                  ),
                  allProductsImmutable: unverifiedProductsArr.reverse(),
                };
              });
            }

            if (activeTab === "Approved Products") {
              setProducts((prevState) => {
                if (
                  prevState?.pageIndex >
                  approvedProductsArr.reverse()?.length - 1
                ) {
                  return {
                    ...prevState,
                    allProducts: approvedProductsArr.reverse(),
                    paginatedProducts: paginationArr(
                      approvedProductsArr.reverse(),
                      20
                    ),
                    pageIndex: approvedProductsArr.reverse()?.length - 1,
                    allProductsImmutable: approvedProductsArr.reverse(),
                  };
                }

                return {
                  ...prevState,
                  allProducts: approvedProductsArr.reverse(),
                  paginatedProducts: paginationArr(
                    approvedProductsArr.reverse(),
                    20
                  ),
                  allProductsImmutable: approvedProductsArr.reverse(),
                };
              });
            }

            setInventoryData((prevState) => {
              let currentState = prevState.map((item) => {
                if (item.title === "Pending Products") {
                  return { ...item, value: unverifiedProductsArr?.length };
                }

                if (item.title === "Approved Products") {
                  return { ...item, value: approvedProductsArr?.length };
                }

                return item;
              });

              return currentState;
            });

            setAllInventory(
              unverifiedProductsArr?.length + approvedProductsArr?.length
            );

            setStatus({ isError: false, isLoading: false });
          })
        )
        .catch((error) => {
          // single error block

          setStatus((prevState) => {
            return { ...prevState, isError: true };
          });

          if (error.response) {
            toast.error(error.response.data.message);
            throw new Error(error);
          } else {
            toast.error("Please check that you're connected");
            throw new Error(error);
          }
        })
        .finally(() => {
          // close all loaders
          setStatus((prevState) => {
            return { ...prevState, isLoading: false };
          });
        });
    }
  }, [activeTab]);

  // get all categories
  useEffect(() => {
    const getCategories = () => {
      setProducts((prevState) => {
        return {
          ...prevState,
          categories: [
            ...new Set(
              products.allProductsImmutable?.map((item) => item.category.name)
            ),
            "No Weight",
          ],
        };
      });
    };
    getCategories();
  }, [products.allProductsImmutable]);

  useEffect(() => {
    if (qty && qty !== "") {
      setActiveTab(qty);
    }
  }, [qty]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // handle overflow when modals are open
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (
        showModal.editModal === true ||
        showModal.verifiedEditModal === true ||
        openDeleteModal === true
      ) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "visible";
      }
    }

    return () => {
      mounted = false;
    };
  }, [showModal.editModal, showModal.verifiedEditModal, openDeleteModal]);

  const displayDeleteModal = (id, data) => {
    setOpenDeleteModal(true);
    setActiveID(id);
    setActiveApprovedProducts(data);
  };

  return (
    <MainContainer className={`relative`}>
      <FirstSection>
        {showModal.editModal && (
          <InventoryEditModal
            handleSetModal={handleSetModal}
            modalId={modalId}
            getAllProducts={getAllProducts}
            showModal={showModal}
          />
        )}
        {/* Not being used */}
        {/* {showModal.verifiedEditModal && (
          <VerifiedEditModal
            handleSetModal={handleSetModal}
            modalId={modalId}
            getAllProducts={getAllProducts}
            showModal={showModal}
          />
        )} */}
        <ScreenHeader title="Inventory" value={allInventory} />
        <GeneralHeaderTab
          data={inventoryData}
          activeTab={activeTab}
          changeTab={changeTab}
        />
        <GeneralFilterTab
          filter={filterValue}
          filterData={products?.categories}
          products={products}
          setProducts={setProducts}
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

        {activeTab === "Pending Products" && (
          <InventoryTable
            showCheck
            tableHeaderData={inventTableHeader}
            tableData={products.paginatedProducts[products.pageIndex]}
            pageIndex={products.pageIndex}
            setModal={handleSetModal}
            displayDeleteModal={(id, activeData) =>
              displayDeleteModal(id, activeData)
            }
            status={status}
          />
        )}

        {activeTab === "Approved Products" && (
          <ApprovedProducts
            tableHeaderData={approvedProductHeader}
            tableData={products?.paginatedProducts[products?.pageIndex]}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            displayDeleteModal={(id, activeData) =>
              displayDeleteModal(id, activeData)
            }
            setModal={handleSetModal}
            pageIndex={products.pageIndex}
            status={status}
          />
        )}
        {openDeleteModal && (
          <DeleteProductModal
            setOpenDeleteModal={setOpenDeleteModal}
            activeID={activeID}
            activeDeleteProduct={activeApprovedProduct}
            openDeleteModal={openDeleteModal}
            getAllProducts={getAllProducts}
          />
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Inventory;

const FirstSection = styled.div``;
