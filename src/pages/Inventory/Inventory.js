import { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
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
import { Route, Routes, useParams, useSearchParams } from "react-router-dom";
import InventoryHeader from "../../components/Common/GeneralHeaderTab/InventoryHeaderTab";

const Inventory = (props) => {
  let params = useParams();
  const [products, setProducts] = useState({
    allProducts: [],
    paginatedProducts: [],
    pageIndex: 0,
    categories: [],
    currentCategory: "",
    allProductsImmutable: [],
    pageInfo: null,
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState({
    verified: false,
    verifiedEditModal: false,
    editModal: false,
  });

  const [modalId, setModalId] = useState("");
  const [activeID, setActiveID] = useState(null);
  const [activeApprovedProduct, setActiveApprovedProducts] = useState({});
  const [filterValue, setFilterValue] = useState("");
  const [inventoryData, setInventoryData] = useState(inventData);
  const [allInventory, setAllInventory] = useState(0);
  const [status, setStatus] = useState({ isLoading: true, isError: false });
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const search = searchParams.get("search");

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

  // HandlePagination for frontend paginated table
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

  // HandlePagination for backend paginated table
  const changePage = (type, payload = products.pageInfo?.currentPage) => {
    let changeParams = {};
    if (!!search) changeParams.search = search;

    switch (type) {
      case "NEXT_PAGE":
        changeParams.page = products.pageInfo?.next?.page;
        setSearchParams(changeParams);
        break;
      case "PREVIOUS_PAGE":
        changeParams.page = products.pageInfo?.previous?.page;
        setSearchParams(changeParams);
        break;
      case "FIRST_PAGE":
        if (payload === 1) return;
        changeParams.page = 1;
        setSearchParams(changeParams);
        break;
      case "LAST_PAGE":
        if (payload === products.pageInfo?.totalPages) return;
        changeParams.page = products.pageInfo?.totalPages;
        setSearchParams(changeParams);
        break;
      case "GO_TO_PAGE":
        changeParams.page = payload;
        setSearchParams(changeParams);
        break;
      default:
        console.log("Argumenet NOT handled");
        break;
    }
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
    setProducts((oldProducts) => {
      return {
        ...oldProducts,
        paginatedProducts: [],
        allProducts: [],
        currentCategory: "",
        pageInfo: null,
      };
    });

    setStatus({ isError: false, isLoading: true });

    let verifiedEndPoint = search
      ? `/products/search/${search}?page=${page ? page : 1}`
      : `/products/search?page=${page ? page : 1}`;

    let endpoints = ["/products/unverifiedproducts", verifiedEndPoint];

    axios
      .all(endpoints.map((endpoint) => axiosInstance.get(endpoint)))
      .then(
        axios.spread((unverifiedProducts, approvedProducts) => {
          // destructing responses from axios.all
          let {
            data: { data: unverifiedProductsArr, pageInfo: unverifiedPageInfo },
          } = unverifiedProducts;

          let {
            data: { data: approvedProductsArr, pageInfo: approvedPageInfo },
          } = approvedProducts;

          getMarkets();

          // mutating all state at once
          const numberOfPagesToBeDisplayed = 5;
          let pageNumber = Number(page);
          const isApprovedTab = params["*"] === "approved-product";
          // Create array of all possible pages
          let rightHandSide;
          if (!isApprovedTab) {
            rightHandSide = Array.from(
              { length: unverifiedPageInfo.totalPages },
              (_, index) => index + 1
            );
          }
          if (isApprovedTab) {
            rightHandSide = Array.from(
              { length: approvedPageInfo.totalPages },
              (_, index) => index + 1
            );
          }

          let leftHandSide;
          leftHandSide = rightHandSide.splice(0, pageNumber);

          let maxLeft =
            rightHandSide.length < 3
              ? numberOfPagesToBeDisplayed - rightHandSide.length
              : 3;
          let maxRight =
            leftHandSide.length < 3
              ? numberOfPagesToBeDisplayed - leftHandSide.length
              : 2;

          //Get first three items from leftHandSide if its length
          // is larger than 3
          leftHandSide = leftHandSide.reverse().slice(0, maxLeft).reverse();
          rightHandSide = rightHandSide.slice(0, maxRight);
          let newPages = leftHandSide
            .concat(rightHandSide)
            .map((item) => ({ page: item, limit: 20 }));

          if (isApprovedTab) {
            approvedPageInfo.displayPages = newPages;
            approvedPageInfo.currentPage = pageNumber;
          }

          if (!isApprovedTab) {
            unverifiedPageInfo.displayPages = newPages;
            unverifiedPageInfo.currentPage = pageNumber;
          }

          setProducts((prevState) => {
            return isApprovedTab
              ? {
                  ...prevState,
                  allProducts: approvedProductsArr,
                  pageInfo: approvedPageInfo,
                }
              : {
                  ...prevState,
                  allProducts: unverifiedProductsArr,
                  pageInfo: approvedPageInfo,
                };
          });

          setInventoryData((prevState) => {
            let currentState = prevState.map((item) => {
              if (item.title === "Pending Products") {
                return { ...item, value: unverifiedPageInfo.totalHits };
              }

              if (item.title === "Approved Products") {
                return { ...item, value: approvedPageInfo.totalHits };
              }

              return item;
            });

            return currentState;
          });

          setAllInventory(
            unverifiedPageInfo.totalHits + approvedPageInfo.totalHits
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
  }, [params, page, search]);

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
        <ScreenHeader title="Inventory" value={allInventory} />
        <InventoryHeader data={inventoryData} activeTab={params["*"]} />
        {!status.isError && !status.isLoading && (
          <Routes>
            <Route
              index
              element={
                <InventoryTable
                  showCheck
                  tableHeaderData={inventTableHeader}
                  tableData={products.allProducts}
                  pageIndex={products.pageIndex}
                  setModal={handleSetModal}
                  displayDeleteModal={(id, activeData) =>
                    displayDeleteModal(id, activeData)
                  }
                  handlePagination={handlePagination}
                  itemsNumber={products?.paginatedProducts}
                  status={status}
                  totalNumber={products?.allProducts?.length}
                  filterValue={filterValue}
                  products={products}
                  setProducts={setProducts}
                  setFilterValue={setFilterValue}
                />
              }
            />
            <Route
              path="approved-product"
              element={
                <ApprovedProducts
                  tableHeaderData={approvedProductHeader}
                  tableData={products?.allProducts}
                  openDeleteModal={openDeleteModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                  displayDeleteModal={(id, activeData) =>
                    displayDeleteModal(id, activeData)
                  }
                  setModal={handleSetModal}
                  pageIndex={page ? page : 1}
                  status={status}
                  pageInfo={products.pageInfo}
                  changePage={changePage}
                  setProducts={setProducts}
                />
              }
            />
          </Routes>
        )}

        {!status.isError && status.isLoading && (
          <div className="w-full h-96">
            <NewLoader />
          </div>
        )}

        {status.isError && <div>Error! Please Reload the Page</div>}

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
