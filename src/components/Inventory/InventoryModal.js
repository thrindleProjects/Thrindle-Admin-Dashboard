import { useEffect, useRef } from "react";
import styled from "styled-components";
import PendingOrder from "../../assets/images/image.jpg";

const InventoryModal = (props) => {
  const modalRef = useRef(null);

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

  return (
    <ModalWrapper className='fixed w-full inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full  h-full z-50 flex items-center justify-center'>
      <ModalContainer
        ref={modalRef}
        className='lg:w-3/5 rounded-md p-4 flex flex-col items-center'
      >
        <div className='h-fit w-56 overflow-hidden'>
          <img
            className='object-scale-down'
            src={PendingOrder}
            alt='Pending Item'
          />
        </div>
        <div>
          <p>
            Category: <span>{props.modalItem.category}</span>
          </p>
          <p>
            Product Title: <span>{props.modalItem.title}</span>
          </p>
          <p>
            Price: <span>N{props.modalItem.price.toLocaleString()}</span>
          </p>
          <p>
            Stock: <span>20</span>
          </p>
          <p>
            Upload Date: <span>{props.modalItem.uploadDate}</span>
          </p>
          <p>
            Status:{" "}
            <span
              className={`${
                props.modalItem.status === "approved"
                  ? "text-primary-dark"
                  : "text-secondary-yellow"
              }`}
            >
              {props.modalItem.status}
            </span>
          </p>
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};

const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;

const ModalWrapper = styled.div`
  z-index: 110;
`;

export default InventoryModal;
