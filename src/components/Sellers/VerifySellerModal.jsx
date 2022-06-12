import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInstance";

const VerifySellerModal = ({ handleModal, modalData, handleGetCustomers }) => {
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef();

  const triggerTableUpdate = useCallback(() => {
    handleGetCustomers();
    handleModal("HIDE_MODAL");
  }, [handleGetCustomers, handleModal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // document.documentElement.style.overflow = "revert";

        if (updated) {
          triggerTableUpdate();
        }

        handleModal("HIDE_MODAL");
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleModal, modalData, updated, triggerTableUpdate]);

  const handleVerify = async (id) => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/users/admin/sellers/verify/${id}`);
      setUpdated(true);
      setIsLoading(false);
      triggerTableUpdate();
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.error("Something went wrong");
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center">
      <ModalContainer
        className="rounded-md py-12 px-8 overflow-y-auto flex flex-col gap-2"
        ref={modalRef}
      >
        <h2 className="text-xl text-primary-main font-bold">Verify Seller</h2>
        <h3>
          Are you sure you want to verify{" "}
          <span className="capitalize font-bold text-secondary-yellow">
            {modalData.name}
          </span>
        </h3>
        <div className="flex gap-2 justify-end items-center">
          <button
            onClick={() => handleModal("HIDE_MODAL")}
            className="py-1 px-4 rounded-md bg-secondary-error text-white-main"
          >
            Cancel
          </button>
          {isLoading ? (
            <div className="animate-bounce py-1 px-4 rounded-md bg-primary-main text-white-main">
              Loading...
            </div>
          ) : (
            <button
              className="py-1 px-4 rounded-md bg-primary-main text-white-main"
              onClick={() => handleVerify(modalData._id)}
            >
              Verify
            </button>
          )}
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default VerifySellerModal;

const ModalWrapper = styled.div`
  z-index: 15;
`;

const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  width: 80%;
  min-height: 10rem;
  max-height: 85vh;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1024px) {
    width: 30%;
  }
  p {
    display: flex;
    gap: 0.75rem;
    font-weight: 300;
    font-size: 0.875;
  }
  input,
  select,
  textarea,
  .custom-input {
    padding: 0.5rem 1rem;
    border: 1px solid #16588f;
  }
`;
