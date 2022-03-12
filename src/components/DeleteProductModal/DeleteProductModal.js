import React from "react";
import { Modal } from "../../styles/globalStyles";
import styled from "styled-components";

const ModalContainer = styled.div`
  background: white;
  color: #20639b;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 1;
  z-index: 11;
  transform: translate(-50%, -50%);
  border: 1px solid #20639b;
  border-radius: 12px;

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

function DeleteProductModal({ setOpenDeleteModal, activeID }) {
  return (
    <>
      <Modal onClick={() => setOpenDeleteModal(false)}></Modal>
      <ModalContainer>
        <h1>Delete Product</h1>
        <p>
          Are you sure you want to delete this product? You will permanently
          lose this data.
        </p>
        <p>{activeID}</p>
        <div>
          <button>Close</button>
          <button>Delete Permanently</button>
        </div>
      </ModalContainer>
    </>
  );
}

export default DeleteProductModal;
