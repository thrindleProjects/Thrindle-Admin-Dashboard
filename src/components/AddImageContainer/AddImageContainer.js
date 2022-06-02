import React from "react";
import styled from "styled-components";

const AddImageContainer = ({ onChange, id, name, required }) => {
  return (
    <div className="relative w-11/12 mx-auto">
      <MainContainer className="w-full cursor-pointer h-16 border border-white-border rounded-md flex flex-row relative items-center justify-between px-1 py-1 ">
        <p className="md:text-base text-sm text-white-text xl:pl-5 pl-2">
          Add Image
        </p>
        <div className="custom-file-upload xl:w-1/5 lg:w-2/6 md:w-2/5 w-1/2 flex flex-row items-center justify-center rounded-md">
          Browse
        </div>
      </MainContainer>
      <Input
        type="file"
        className="cursor-pointer"
        multiple
        id={id}
        name={name}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default AddImageContainer;

const MainContainer = styled.div`
  .custom-file-upload {
    border: 1px solid #f69f13;
    cursor: pointer;
    background-color: #f69f13;
    height: 90%;
    font-size: 14px;
    color: #464f54;
  }
`;

const Input = styled.input`
  opacity: 0;
  top: 0;
  right: 0;
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: 50;
`;
