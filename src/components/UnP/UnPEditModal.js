import styled from "styled-components";

const UnPEditModal = () => {
    const handleFormSubmit = (e) => {
      e.preventDefault();
    };

    return (
      <EditModal className="h-fit px-6 py-9 text-primary-main flex flex-col gap-6 justify-center">
        <h3 className={"font-extrabold text-xl"}>Edit</h3>
        <form onSubmit={handleFormSubmit} className={`flex flex-col gap-5`}>
          <div className="grid grid-cols-2 gap-4">
            <InputWrapper>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" placeholder="Name" />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="email">E-mail Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="tel">Phone Number</label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Phone Number"
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="role">Role</label>
              <select name="role" id="role">
                <option>Role</option>
              </select>
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="permissions">Permissions</label>
              <select name="permissions" id="permissions">
                <option>Permissions</option>
              </select>
            </InputWrapper>
          </div>
          <div className="w-full flex justify-end gap-4">
            <ButtonWrapper className="cancel">Cancel</ButtonWrapper>
            <ButtonWrapper className="approve">Save Changes</ButtonWrapper>
          </div>
        </form>
      </EditModal>
    );
};

export default UnPEditModal;

const EditModal = styled.div`
  width: 70vw;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  gap: 0.375rem;
  width: 100%;

  input,
  select {
    width: 100%;
    border-radius: 0.5rem;
    &::placeholder {
      color: #20639b;
    }
  }
`;

const ButtonWrapper = styled.button`
  padding: 0.75rem 1.25rem;
  border: 1px solid;
  border-radius: 0.375rem;
  font-weight: 800;
  &.cancel {
    color: #c2c2c2;
    border-color: #c2c2c2;
    background: white;
  }
  &.approve {
    color: white;
    background: #16588f;
    border-color: #16588f;
  }
`;
