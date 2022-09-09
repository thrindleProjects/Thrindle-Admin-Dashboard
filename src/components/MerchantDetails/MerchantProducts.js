import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { merchantProductsTableHeader } from "../../data/data";
import NewLoader from "../newLoader/newLoader";
import MerchantHeader from "./MerchantHeader";
import DeleteProductModal from "../DeleteProductModal/DeleteProductModal";
import MerchantProductsTable from "./MerchantProductsTable";
import InventoryEditModal from "../Inventory/InventoryEditModal";
import ApprovedProductPagination from "../Common/GeneralPagination/ApprovedProductPagination";
import ApprovedFilter from "../Common/GeneralFilterTab/ApprovedProductsFilter";

function MerchantProducts() {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState({
    allProducts: [],
    pageInfo: null,
  });

  console.log({ products });
  const [modalId, setModalId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState({
    verifiedEditModal: false,
    editModal: false,
    verified: false,
  });
  const [activeProduct, setActiveProduct] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search");

  let { store_id } = useParams();

  const handleSetModal = useCallback((action, modalId, verified) => {
    switch (action) {
      case "SHOW_EDIT_MODAL":
        setShowModal({
          editModal: true,
          verifiedEditModal: false,
          verified,
        });
        setModalId(modalId);
        break;
      case "SHOW_VERIFIED_EDIT_MODAL":
        setShowModal({
          editModal: false,
          verifiedEditModal: true,
          verified,
        });
        setModalId(modalId);
        break;
      case "CLOSE_ALL_MODALS":
        setShowModal({
          editModal: false,
          verifiedEditModal: false,
          verified,
        });
        break;
      default:
        break;
    }
  }, []);

  const displayDeleteModal = (id, data) => {
    setOpenDeleteModal(true);
    setActiveProduct(data);
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

  const fetchProducts = useCallback(async () => {
    setProducts((oldProducts) => {
      return {
        ...oldProducts,
        paginatedProducts: [],
        allProducts: [],
        currentCategory: "",
      };
    });
    try {
      let url = `/products/store/${store_id}?sort=-createdAt&page=${page}`;

      if (search) {
        url += `&search=${search}`;
      }

      let {
        data: { data, pageInfo },
      } = await axiosInstance.get(url);

      const numberOfPagesToBeDisplayed = 5;
      let pageNumber = Number(page);

      let rightHandSide = Array.from(
        { length: pageInfo.totalPages },
        (_, index) => index + 1
      );

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

      pageInfo.displayPages = newPages;
      pageInfo.currentPage = pageNumber;

      setProducts((prevState) => {
        return {
          ...prevState,
          allProducts: data,
          pageInfo,
        };
      });

      setLoadingProducts(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        toast.warning(`${error.response.data.message}`);
      } else {
        toast.error(`${error}`);
      }
    } finally {
      setLoadingProducts(false);
    }
  }, [store_id, page, search]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoadingProducts(true);
      fetchProducts();
    }

    return () => {
      mounted = false;
    };
  }, [fetchProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rounded-md shadow-md w-full">
      <MerchantHeader text="Merchant's Products" />
      {openDeleteModal && (
        <DeleteProductModal
          setOpenDeleteModal={setOpenDeleteModal}
          activeID={activeProduct?._id}
          activeDeleteProduct={activeProduct}
          openDeleteModal={openDeleteModal}
          getAllProducts={fetchProducts}
        />
      )}
      {showModal.editModal && (
        <InventoryEditModal
          handleSetModal={handleSetModal}
          modalId={modalId}
          getAllProducts={fetchProducts}
          showModal={showModal}
        />
      )}
      {loadingProducts ? (
        <div className="h-vh40">
          <NewLoader />
        </div>
      ) : (
        <>
          {products.pageInfo?.totalHits === 0 ? (
            <p className="p-2">No Products</p>
          ) : (
            <>
              <ApprovedFilter setProducts={fetchProducts} />
              <ApprovedProductPagination
                pageIndex={page}
                handlePagination={changePage}
                pageInfo={products.pageInfo}
                pageLength={products.allProducts.length}
              />
              <MerchantProductsTable
                products={products.allProducts}
                productsInfo={products}
                merchantProductsTableHeader={merchantProductsTableHeader}
                handleSetModal={handleSetModal}
                displayDeleteModal={displayDeleteModal}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MerchantProducts;
