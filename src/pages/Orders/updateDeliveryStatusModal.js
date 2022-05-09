import React, { useEffect, useState } from "react";
import { CircularProgress, Modal } from "../../styles/globalStyles";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

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

const Text = styled.p`
  opacity: ${(props) => (props.none ? 0 : 1)};
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.modalType === "Complete" ? "#009E52" : "#F5000F"};
`;

function UpdateDeliveryStatusModal({
  modalType,
  setOpenModal,
  activeID,
  openModal,
  getOrders,
}) {
  const [updating, setUpdating] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    document.documentElement.style.overflow = "scroll";
  };

  const updateStatus = async (id, modalType) => {
    setUpdating(true);
    try {
      let res = await axiosInstance.put(`/orders/admin/updateorder/${id}`, {
        delivery_status: modalType === "Complete" ? "completed" : "cancelled",
        status: modalType === "Complete" ? "completed" : "cancelled",
      });

      if (res.status === 200) {
        setUpdating(false);
        toast.success("Updated Successfully");
        getOrders();
        setOpenModal(false);
        document.documentElement.style.overflow = "scroll";
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
      setUpdating(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (openModal) {
        document.documentElement.style.overflow = "hidden";
        console.log("reveal");
      } else {
        document.documentElement.style.overflow = "revert";
        console.log("hide");
      }
    }

    return () => {
      mounted = false;
    };
  }, [openModal]);

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

        <h1 className="text-primary-dark font-Bold text-lg">
          Update Delivery Status
        </h1>
        <p className="text-white-text text-sm my-2">
          Are you sure you want to update the delivery status?
        </p>

        <div className="mt-6">
          <button
            className="border border-primary-grey6 text-primary-grey6 py-2 px-6 rounded-md cursor-pointer"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <Button
            className="border border-transparent ml-6 bg-secondary-error text-white-main py-2 px-6 rounded-md cursor-pointer"
            onClick={() => updateStatus(activeID, modalType)}
            modalType={modalType}
          >
            {updating ? (
              <div>
                <CircularProgress />
                <Text none>
                  {" "}
                  {modalType === "Complete" && "Complete Order"}
                  {modalType === "Cancel" && "Cancel Order"}
                </Text>
              </div>
            ) : (
              <Text>
                {modalType === "Complete" && "Complete Order"}
                {modalType === "Cancel" && "Cancel Order"}
              </Text>
            )}
          </Button>
        </div>
      </ModalContainer>
    </>
  );
}

export default UpdateDeliveryStatusModal;
