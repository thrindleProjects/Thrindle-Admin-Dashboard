import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { merchantProductsTableHeader } from "../../data/data";
import NewLoader from "../newLoader/newLoader";
import MerchantHeader from "./MerchantHeader";
import DeleteProductModal from "../DeleteProductModal/DeleteProductModal";
import VerifiedEditModal from "../Inventory/VerifiedEditProduct";
import MerchantProductsTable from "./MerchantProductsTable";
import paginationArr from "../../utils/pagination";
import GeneralFilterTab from "../Common/GeneralFilterTab/GeneralFilterTab";

function MerchantProducts() {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState({
    allProducts: [],
    paginatedProducts: [],
    pageIndex: 0,
    categories: [],
    currentCategory: "",
    allProductsImmutable: [],
  });
  const [modalId, setModalId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState({
    verifiedEditModal: false,
    editModal: false,
  });
  const [activeProduct, setActiveProduct] = useState({});
  const [filterValue, setFilterValue] = useState("");

  let { store_id } = useParams();

  const handleSetModal = useCallback((action, modalId) => {
    switch (action) {
      case "SHOW_EDIT_MODAL":
        document.documentElement.style.overflow = "hidden";
        setShowModal({
          editModal: true,
          verifiedEditModal: false,
        });
        setModalId(modalId);
        break;
      case "SHOW_VERIFIED_EDIT_MODAL":
        document.documentElement.style.overflow = "hidden";
        setShowModal({
          editModal: false,
          verifiedEditModal: true,
        });
        setModalId(modalId);
        break;
      case "CLOSE_ALL_MODALS":
        document.documentElement.style.overflow = "scroll";
        setShowModal({
          editModal: false,
          verifiedEditModal: false,
        });
        break;
      default:
        break;
    }
  }, []);

  const displayDeleteModal = (id, data) => {
    document.documentElement.style.overflow = "hidden";
    setOpenDeleteModal(true);
    setActiveProduct(data);
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
      let {
        data: { data },
      } = await axiosInstance.get(`/products/store/${store_id}`);
      data = data.sort((a, b) => {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });

      setProducts((prevState) => {
        if (prevState?.pageIndex > data?.length - 1) {
          return {
            ...prevState,
            allProducts: data,
            paginatedProducts: paginationArr(data, 20),
            pageIndex: data?.length - 1,
            allProductsImmutable: data,
          };
        }
        return {
          ...prevState,
          allProducts: data,
          paginatedProducts: paginationArr(data, 20),
          allProductsImmutable: data,
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
  }, [store_id]);

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
          ],
        };
      });
    };
    getCategories();
  }, [products.allProductsImmutable]);

  return (
    <div className="rounded-md shadow-md">
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
      {showModal.verifiedEditModal && (
        <VerifiedEditModal
          handleSetModal={handleSetModal}
          modalId={modalId}
          getAllProducts={fetchProducts}
          showModal={showModal}
        />
      )}
      <div className="w-full mb-4 px-4">
        {products.allProductsImmutable.length > 0 && (
          <GeneralFilterTab
            filterValue={filterValue}
            filterData={products.categories}
            products={products}
            setProducts={setProducts}
            changeFilter={setFilterValue}
          />
        )}
      </div>
      {loadingProducts ? (
        <div className="h-vh40">
          <NewLoader />
        </div>
      ) : (
        <>
          {products.paginatedProducts.length === 0 ? (
            <p className="p-2">No Products</p>
          ) : (
            <MerchantProductsTable
              products={products.paginatedProducts[products.pageIndex]}
              productsInfo={products}
              merchantProductsTableHeader={merchantProductsTableHeader}
              handleSetModal={handleSetModal}
              displayDeleteModal={displayDeleteModal}
              handlePagination={handlePagination}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MerchantProducts;
