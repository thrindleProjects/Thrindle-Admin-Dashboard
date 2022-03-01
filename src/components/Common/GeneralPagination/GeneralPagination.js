import React from "react";
import styled from "styled-components";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const GeneralPagination = (props) => {
  return (
    <MainPagination className="w-full flex flex-row flex-wrap mt-14">
      <div className="pagination-btn-cont flex flex-row flex-wrap">
        {/* Single Btn */}
        {props.onlyDelete ? (
          <button className="flex flex-row cancel rounded-md border border-secondary-error text-white-main outline-none focus:outline-none mr-5 lg:mb-0 mb-5 bg-secondary-error hover:opacity-80">
            <p className="text-base font-Regular text-center capitalize">
              {props.deleteText}
            </p>
          </button>
        ) : (
          <>
            <button className="flex flex-row cancel rounded-md border border-secondary-yellow text-secondary-yellow outline-none focus:outline-none mr-5 lg:mb-0 mb-5 hover:opacity-80">
              <p className="text-base font-Regular text-center capitalize">
                {props.cancelText}
              </p>
            </button>
            <button className="flex flex-row cancel rounded-md border border-secondary-error text-white-main outline-none focus:outline-none mr-5 lg:mb-0 mb-5 bg-secondary-error hover:opacity-80">
              <p className="text-base font-Regular text-center capitalize">
                {props.deleteText}
              </p>
            </button>
          </>
        )}
      </div>
      {props.noPag ? (
        ""
      ) : (
        <div className="pagination flex flex-row ">
          <div className="num-cont flex flex-row mr-10">
            <span className="text-white-text font-Bold text-sm">01</span>
            <span className="text-white-text font-Bold text-sm mb-1">-</span>
            <span className="text-white-text font-Bold text-sm">10</span>
            <span className="text-white-text font-Bold text-sm">&nbsp;of</span>
            <span className="text-white-text font-Bold text-sm">&nbsp;08</span>
          </div>
          {/* CONTROLS */}
          <div className="controls flex flex-row">
            <button className="single-controls flex flex-row rounded-md focus:outline-none outline-none">
              <FaAngleLeft className="text-base single-control-icon text-center text-white-main" />
            </button>
            <button className="single-controls flex flex-row rounded-md focus:outline-none outline-none ">
              <FaAngleRight className="text-base single-control-icon text-center text-white-main" />
            </button>
          </div>
        </div>
      )}
    </MainPagination>
  );
};

export default GeneralPagination;

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
