import React from "react";
import styled from "styled-components";

const ProfileBtn = (props) => {
  return (
    <MainPagination className="w-full flex flex-row flex-wrap mt-14">
      <div className="pagination-btn-cont flex flex-row flex-wrap">
        {/* Single Btn */}
        <button className="flex flex-row cancel rounded-md border border-secondary-yellow text-secondary-yellow outline-none focus:outline-none mr-5 lg:mb-0 mb-5 hover:opacity-80">
          <p className="text-base font-Regular text-center capitalize">
            {props.cancelText}
          </p>
        </button>
        <button className="flex flex-row cancel rounded-md border border-secondary-yellow text-white-main outline-none focus:outline-none mr-5 lg:mb-0 mb-5 bg-secondary-yellow hover:opacity-80">
          <p className="text-base font-Regular text-center capitalize">
            {props.deleteText}
          </p>
        </button>
      </div>
    </MainPagination>
  );
};

export default ProfileBtn;

const MainPagination = styled.div`
  align-items: center;
  justify-content: space-between;
  .pagination-btn-cont {
    align-items: center;
  }
  .cancel {
    height: 45px;
    align-items: center;
    justify-content: center;
    width: 150px;
    transition: all 0.3s ease-in-out;
  }
  .pagination {
    align-items: center;
  }
  .num-cont,
  .controls {
    align-items: center;
  }
  .single-controls {
    align-items: center;
    justify-content: center;
    background: #fafafa;
    width: 35px;
    height: 35px;
  }
  .single-control-icon {
    color: #2f3133;
  }
`;
