import { useEffect, useRef } from "react";
import styled from "styled-components";
import UnPEditModal from "./UnPEditModal";
import UnPCreateModal from "./UnPCreateModal";
import UnPDeleteModal from "./UnPDeleteModal";

const UnPModals = ({ modals, handleSetModal }) => {
  const modalRef = useRef(null);

  // Handle Click Outside useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        document.documentElement.style.overflow = "revert";
        handleSetModal("CLOSE_ALL_MODALS");
      }
      return true;
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleSetModal]);

  return (
    <ModalWrapper className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center">
      <ModalContainer className="rounded-md" ref={modalRef}>
        {modals?.createUser && <UnPCreateModal />}
        {modals?.deleteUser && <UnPDeleteModal />}
        {modals?.editUser && <UnPEditModal />}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default UnPModals;

const ModalWrapper = styled.div`
  z-index: 15;
`;
const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  width: max-content;
  height: fit-content;
  min-height: 10rem;
  max-height: 85vh;
  overflow-y: auto;
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
