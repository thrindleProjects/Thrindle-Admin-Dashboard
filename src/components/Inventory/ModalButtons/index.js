import styled from "styled-components";

const ModalButtons = ({ handleFormSubmit, handleVerifyProduct, item }) => {
  return (
    <div className="w-full flex flex-row gap-4 justify-end">
      <ModalButton
        className="border border-primary-dark bg-primary-dark text-white-main cursor-pointer"
        type="submit"
        onClick={handleFormSubmit}
      >
        Update
      </ModalButton>
      {!item?.verified && (
        <ModalButton
          className="border text-white-main bg-secondary-success cursor-pointer"
          onClick={(e) => handleVerifyProduct(e, item._id)}
        >
          Approve
        </ModalButton>
      )}
    </div>
  );
};

export default ModalButtons;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
`;
