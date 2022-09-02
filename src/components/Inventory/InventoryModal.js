import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import NewLoader from "../newLoader/newLoader";

const InventoryModal = (props) => {
  const modalRef = useRef(null);
  const [modalData, setModalData] = useState([]);

  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

  const { handleSetModal, getAllUnverifiedProducts } = props;

  const triggerTableUpdate = useCallback(() => {
    getAllUnverifiedProducts();
    handleSetModal("CLOSE_ALL_MODALS");
  }, [getAllUnverifiedProducts, handleSetModal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (modalData.length > 0 && modalData[0].verified) {
          triggerTableUpdate();
        }
        handleSetModal("CLOSE_ALL_MODALS");
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleSetModal, triggerTableUpdate, modalData]);

  const getSingleProduct = useCallback(async (id) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${url}/products/unverifiedproduct/${id}`);
      setModalData(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getUploadDate = (updatedAt) => {
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  const handleVerifyProduct = async (id) => {
    try {
      let { status } = await axios.put(
        `${url}/products/updateunverifedproduct/${id}`
      );
      if (status < 399) {
        setModalData([{ ...modalData[0], verified: true }]);
        return toast.success("Success");
      }
      toast.error("Oops! Something went wrong...");
    } catch (error) {
      console.error(error);
      return toast.error("Oops! Something went wrong...");
    }
  };

  useEffect(() => {
    getSingleProduct(props.modalId);
  }, [props.modalId, getSingleProduct]);

  return (
    <ModalWrapper className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center">
      <ModalContainer ref={modalRef} className="rounded-md py-12 px-8">
        {modalData.length > 0 ? (
          modalData.map((item) => {
            const uploadDate = getUploadDate(item.updatedAt);
            return (
              <div key={item._id} className="items-center flex flex-col gap-8">
                <div className="h-52 overflow-hidden shadow rounded-md">
                  <img
                    className="object-contain h-full"
                    src={`https://thrindleservices.herokuapp.com/api/thrindle/images/${item.images[0]}`}
                    alt="Pending Item"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-white-text">
                    Category:{" "}
                    <span className="font-medium text-primary-dark">
                      {item.category.name}
                    </span>
                  </p>
                  <p className="text-white-text">
                    Product Title:{" "}
                    <span className="font-medium text-primary-dark">
                      {item.name}
                    </span>
                  </p>
                  <p className="text-white-text">
                    Description:{" "}
                    <span className="font-medium text-primary-dark">
                      {item.description}
                    </span>
                  </p>
                  <p className="text-white-text">
                    Price:{" "}
                    <span className="font-medium text-primary-dark">
                      N{item.price.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-white-text">
                    Stock:{" "}
                    <span className="font-medium text-primary-dark">
                      {item.no_in_stock}
                    </span>
                  </p>
                  <p className="text-white-text">
                    Upload Date:{" "}
                    <span className="font-medium text-primary-dark">
                      {uploadDate}
                    </span>
                  </p>
                  <p className="text-white-text">
                    Product Type:{" "}
                    <span className="font-medium text-primary-dark">
                      {item.new ? "New" : "Used"}
                    </span>
                  </p>
                  <p className="text-white-text">
                    Status:{" "}
                    <span
                      className={`capitalize font-medium ${
                        item.verified
                          ? "text-secondary-success"
                          : "text-secondary-yellow"
                      }`}
                    >
                      {item.verified ? "Approved" : "Pending"}
                    </span>
                  </p>
                </div>
                <div className="w-full flex flex-row gap-4 justify-end">
                  {item.verified ? (
                    <ModalButton
                      className="border border-primary-dark bg-primary-dark text-white-main"
                      onClick={() => triggerTableUpdate()}
                    >
                      Close
                    </ModalButton>
                  ) : (
                    <>
                      <ModalButton
                        className="border border-inventory-gray text-inventory-gray"
                        onClick={() => handleSetModal("CLOSE_ALL_MODALS")}
                      >
                        Cancel
                      </ModalButton>
                      <ModalButton
                        className="border border-primary-dark bg-primary-dark text-white-main"
                        onClick={() => handleVerifyProduct(item._id)}
                      >
                        Approve
                      </ModalButton>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <NewLoader />
        )}
      </ModalContainer>
    </ModalWrapper>
  );
};

const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  width: 30%;
  p {
    display: flex;
    gap: 0.75rem;
    font-weight: 300;
    font-size: 0.875;
  }
`;

const ModalWrapper = styled.div`
  z-index: 110;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
`;

export default InventoryModal;
