import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const GeneralPagination = (props) => {
  const [pageInfo, setPageInfo] = useState({
    startNumber: 0,
    endNumber: 0,
    totalNumber: 0,
  });

  useEffect(() => {
    if (props.itemsNumber) {
      if (props.itemsNumber?.length > 0) {
        let startNumber = 1 + 20 * props.pageNumber;
        let endNumber =
          startNumber - 1 + props.itemsNumber[props.pageNumber]?.length;
        let totalNumber = props.totalNumber;
        return setPageInfo({ startNumber, endNumber, totalNumber });
      } else {
        return setPageInfo({ startNumber: 0, endNumber: 0, totalNumber: 0 });
      }
    }
    return;
  }, [props.itemsNumber, props.pageNumber, props.totalNumber]);

  return (
    <MainPagination className="w-full flex flex-row flex-wrap mt-14">
      {props.showButtons === false ? (
        <></>
      ) : (
        <div className="pagination-btn-cont flex flex-row flex-wrap">
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
      )}

      {props.pag ? (
        <div className="ml-auto pagination flex flex-row ">
          <div className="num-cont flex flex-row mr-10">
            <span className="text-white-text font-Bold text-sm">
              {pageInfo?.startNumber}
            </span>
            <span className="text-white-text font-Bold text-sm mb-1">-</span>
            <span className="text-white-text font-Bold text-sm">
              {pageInfo?.endNumber}
            </span>
            <span className="text-white-text font-Bold text-sm">&nbsp;of</span>
            <span className="text-white-text font-Bold text-sm">
              &nbsp;{pageInfo?.totalNumber}
            </span>
          </div>
          {/* CONTROLS */}
          <div className="controls flex flex-row gap-4">
            <button
              onClick={() => props.handlePagination("PREVIOUS_PAGE")}
              className="single-controls flex flex-row w-12 h-12 p-3 rounded-md focus:outline-none outline-none"
            >
              <FaAngleLeft className="text-base single-control-icon text-center text-white-main" />
            </button>
            <button
              onClick={() => props.handlePagination("NEXT_PAGE")}
              className="single-controls flex flex-row w-12 h-12 p-3 rounded-md focus:outline-none outline-none "
            >
              <FaAngleRight className="text-base single-control-icon text-center text-white-main" />
            </button>
          </div>
        </div>
      ) : (
        <></>
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
  }
  .single-control-icon {
    color: #2f3133;
  }
`;
