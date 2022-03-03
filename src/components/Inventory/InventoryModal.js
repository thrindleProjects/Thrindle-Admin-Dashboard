import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../Common/Loader/Loader";
import axios from "axios";
import styled from "styled-components";

const InventoryModal = (props) => {
  const modalRef = useRef(null);
  const [modalData, setModalData] = useState([]);
  const [statusModal, setStatusModal] = useState({
    show: false,
    success: false,
  });

  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

  console.log(modalData.length);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        props.setModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [props]);

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

  useEffect(() => {
    getSingleProduct(props.modalId);
  }, [props.modalId, getSingleProduct]);

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
        return setStatusModal({ show: true, success: true });
      }
      return setStatusModal({ show: true, success: false });
    } catch (error) {
      console.error(error);
      return setStatusModal({ show: true, success: false });
    } finally {
      setTimeout(() => {
        setStatusModal({ show: false, success: false });
      }, 2000);
    }
  };

  return (
    <ModalWrapper className='fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center'>
      <ModalContainer
        ref={modalRef}
        className='lg:w-3/12 rounded-md py-12 px-8'
      >
        {statusModal.show && (
          <div
            className={`fixed right-0 top-16 p-4 pr-6 lg:pr-24 font-bold text-xl rounded-md ${
              statusModal.success
                ? "bg-primary-dark text-white-main"
                : "bg-secondary-yellow"
            }`}
          >
            {statusModal.success ? "Success!" : "Try Again :("}
          </div>
        )}
        {modalData.length > 0 ? (
          modalData.map((item) => {
            const uploadDate = getUploadDate(item.updatedAt);
            return (
              <div
                key={item._id}
                className='flex flex-col items-center flex flex-col gap-8'
              >
                <div className='h-48 max-w-full overflow-hidden shadow rounded-md'>
                  <img
                    className='object-contain h-full'
                    src={`https://thrindleservices.herokuapp.com/api/thrindle/images/${item.images[0]}`}
                    alt='Pending Item'
                  />
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <p className='text-white-text'>
                    Category:{" "}
                    <span className='font-medium text-primary-dark'>
                      {item.category.name}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Product Title:{" "}
                    <span className='font-medium text-primary-dark'>
                      {item.name}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Price:{" "}
                    <span className='font-medium text-primary-dark'>
                      N{item.price.toLocaleString()}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Stock:{" "}
                    <span className='font-medium text-primary-dark'>
                      {item.no_in_stock}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Upload Date:{" "}
                    <span className='font-medium text-primary-dark'>
                      {uploadDate}
                    </span>
                  </p>
                  <p className='text-white-text'>
                    Status:{" "}
                    <span
                      className={`capitalize font-medium ${
                        item.verified
                          ? "text-primary-dark"
                          : "text-secondary-yellow"
                      }`}
                    >
                      {item.verified ? "Approved" : "Pending"}
                    </span>
                  </p>
                </div>
                <div className='w-full flex flex-row gap-4 justify-end'>
                  <ModalButton
                    className='border border-inventory-gray text-inventory-gray'
                    onClick={() => props.setModal(false)}
                  >
                    Cancel
                  </ModalButton>
                  <ModalButton
                    className='border border-primary-dark bg-primary-dark text-white-main'
                    onClick={() => handleVerifyProduct(item._id)}
                  >
                    Approve
                  </ModalButton>
                </div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </ModalContainer>
    </ModalWrapper>
  );
};

const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  p {
    display: flex;
    gap: 0.75rem;
    weight: 300;
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
