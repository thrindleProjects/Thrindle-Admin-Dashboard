import styled from "styled-components";

const UpdateImages = ({ handleRestoreImages, handleImageUpdate }) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-end">
      <ModalButton
        className="border border-inventory-gray text-inventory-gray"
        onClick={handleRestoreImages}
      >
        Restore
      </ModalButton>
      <ModalButton
        className="border border-primary-dark bg-primary-dark text-white-main cursor-pointer"
        onClick={handleImageUpdate}
      >
        Update Images
      </ModalButton>
    </div>
  );
};

export default UpdateImages;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
`;
