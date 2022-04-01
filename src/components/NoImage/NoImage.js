import React from "react";
import styled from "styled-components";
import StoreIcon from "../../assets/images/storeIcon.svg";

const StoreCardContainer = styled.div`
  position: relative;
  min-width: 10em !important;
  min-height: 10em !important;
  border-radius: 50% !important;
  margin-right: 15px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  .store-name {
    min-height: 40px;
    max-height: 45px;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease-in-out;
  }
  .store-name-card {
    min-height: 40px;
    max-height: 45px;
  }
`;

const StoreCardImage = styled.div`
  position: relative;
  min-width: 10em !important;
  min-height: 10em !important;
  border-radius: 50% !important;
  background: #16588f;
  color: white;
`;

const NoImage = ({ store_name }) => {
  const placeHolder = store_name.trim().toUpperCase().split(" ");

  return (
    <StoreCardContainer>
      <StoreCardImage className="flex flex-col items-center justify-center">
        <img src={StoreIcon} alt="Store" className="block w-12 mx-auto h-12" />
        {/* <Placeholdername name={store_name} /> */}
        <div className="text-4xl  text-white font-bold">
          {placeHolder.length > 1
            ? `${placeHolder[0][0]}${
                placeHolder[1][0] ? placeHolder[1][0] : ""
              }`
            : `${placeHolder[0][0]}`}
        </div>
      </StoreCardImage>
    </StoreCardContainer>
  );
};

export default NoImage;
