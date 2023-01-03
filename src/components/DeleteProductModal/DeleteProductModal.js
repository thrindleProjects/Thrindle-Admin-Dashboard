import React, { useEffect, useState } from "react";
import { CircularProgress, Modal } from "../../styles/globalStyles";
// import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/formatPrice";

const ModalContainer = styled.div`
  background: white;
  color: #20639b;
  width: 90%;
  padding: 2em;
  position: fixed;
  top: 50%;
  left: 50%;
  opacity: 1;
  z-index: 15;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }

  @media (min-width: 1400px) {
    width: 35%;
  }
`;

const ProductView = styled.div`
  .product-image {
    width: 70px;
    height: 70px;
    border-radius: 10px;
  }
`;

const Text = styled.p`
  opacity: ${(props) => (props.none ? 0 : 1)};
`;

function DeleteProductModal({
  setOpenDeleteModal,
  activeID,
  activeDeleteProduct,
  getAllProducts,
  openDeleteModal,
}) {
  const [deleting, setDeleting] = useState(false);
  // const history = useHistory();

  const handleCloseModal = () => {
    document.documentElement.style.overflow = "scroll";
    setOpenDeleteModal(false);
  };

  const deleteProduct = async (id) => {
    setDeleting(true);
    try {
      let res = await axiosInstance.delete(`/products/deleteproduct/${id}`);
      if (res.status === 200) {
        setDeleting(false);
        toast.success("Product was successfully deleted");
        getAllProducts();
        document.documentElement.style.overflow = "scroll";
        setOpenDeleteModal(false);
      }
    } catch (error) {
      if (error.response) {
        toast.warning(`${error.response.data.message}`);
        throw new Error(error);
      } else {
        toast.error(`${error}`);
        throw new Error(error);
      }
    } finally {
      setDeleting(false);
      // document.documentElement.style.overflow = "revert";
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (openDeleteModal) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "revert";
      }
    }

    return () => {
      mounted = false;
    };
  }, [openDeleteModal]);

  return (
    <>
      <Modal onClick={handleCloseModal}></Modal>
      <ModalContainer>
        <div className="flex justify-end" onClick={handleCloseModal}>
          <svg
            className="mb-3 cursor-pointer w-6 h-6"
            fill="none"
            stroke="black"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-primary-dark font-Bold text-lg">Delete Product</h1>
        <p className="text-white-text text-sm my-2">
          Are you sure you want to delete this product? You will permanently
          lose this data.
        </p>
        <ProductView className="w-full my-3 flex flex-row">
          <div className="product-image">
            <img
              src={`https://store-staging-api.thrindle.com/api/thrindle/images/${activeDeleteProduct?.images[0]}`}
              className="w-full h-full rounded-xl"
              alt="Product"
              loading="eager"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-white-text">
              {activeDeleteProduct?.name}
            </p>
            <p> N{numberFormat(activeDeleteProduct?.price)}</p>
          </div>
        </ProductView>

        <div className="mt-6">
          <button
            className="border border-secondary-yellow text-secondary-yellow py-2 px-6 rounded-md cursor-pointer"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            className="border border-transparent ml-6 bg-secondary-error text-white-main py-2 px-6 rounded-md cursor-pointer"
            onClick={() => deleteProduct(activeID)}
          >
            {deleting ? (
              <div>
                <CircularProgress />
                <Text none>Delet Permanently</Text>
              </div>
            ) : (
              <Text>Delete Permanently</Text>
            )}
          </button>
        </div>
      </ModalContainer>
    </>
  );
}

export default DeleteProductModal;
