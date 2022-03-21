import styled from "styled-components";

const UnPDeleteModal = () => {
  return (
    <DeleteModal className="h-fit px-12 py-9 text-primary-main flex flex-col gap-4 justify-center">
      <h3 className={"font-extrabold text-xl"}>Delete User</h3>
      <p className="font-semibold text-white-text">
        Are you sure you want to delete this user? you will permanently lose all
        the information relating to this user
      </p>
      <div className="w-full flex gap-10 items-center">
        <ButtonWrapper className="close">Close</ButtonWrapper>
        <ButtonWrapper className="delete">Delete Permanently</ButtonWrapper>
      </div>
    </DeleteModal>
  );
};

export default UnPDeleteModal;

const DeleteModal = styled.div`
  width: 40vw;
`;
const ButtonWrapper = styled.button`
  padding: 0.75rem 1.25rem;
  border: 1px solid;
  border-radius: 0.375rem;
  font-weight: 800;
  &.close {
    color: #f69f13;
    border-color: #f69f13;
    background: white;
  }
  &.delete {
    color: white;
    background: #f5000f;
    border-color: #f5000f;
  }
`;
