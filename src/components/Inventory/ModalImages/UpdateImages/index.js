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
        Update
      </ModalButton>
    </div>
  );
};

export default UpdateImages;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.75rem /* 12px */;
  line-height: 1rem /* 16px */;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
  }
`;
