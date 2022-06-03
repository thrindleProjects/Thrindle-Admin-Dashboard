import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const ApprovedProductPagination = ({
  pageInfo,
  pageIndex,
  handlePagination,
}) => {
  const [pagData, setPageInfo] = useState({
    startNumber: 0,
    endNumber: 0,
    totalNumber: 0,
  });

  useEffect(() => {
    let startNumber = (pageIndex - 1) * 20 + 1;
    let endNumber = startNumber + 19;
    let totalNumber = pageInfo?.totalProducts;
    return setPageInfo({ startNumber, endNumber, totalNumber });
  }, [pageIndex, pageInfo?.totalProducts]);

  return (
    <MainPagination className={`w-full flex flex-row flex-wrap mt-14`}>
      <div className="ml-auto pagination flex flex-row ">
        <div className="num-cont flex flex-row mr-10">
          <span className="text-white-text font-Bold text-sm">
            {pagData?.startNumber}
          </span>
          <span className="text-white-text font-Bold text-sm mb-1">-</span>
          <span className="text-white-text font-Bold text-sm">
            {pagData?.endNumber}
          </span>
          <span className="text-white-text font-Bold text-sm">&nbsp;of</span>
          <span className="text-white-text font-Bold text-sm">
            &nbsp;{pagData?.totalNumber}
          </span>
        </div>
        {/* CONTROLS */}
        <div className="controls flex flex-row gap-4">
          <button
            onClick={() => handlePagination("PREVIOUS_PAGE")}
            className={`single-controls flex flex-row w-12 h-12 p-3 rounded-md focus:outline-none outline-none ${
              pageInfo?.previous ? "possible" : ""
            }`}
          >
            <FaAngleLeft className="text-base single-control-icon text-center text-white-main" />
          </button>
          <button
            onClick={() => handlePagination("NEXT_PAGE")}
            className={`single-controls flex flex-row w-12 h-12 p-3 rounded-md focus:outline-none outline-none ${
              pageInfo?.next ? "possible" : ""
            }`}
          >
            <FaAngleRight className="text-base single-control-icon text-center text-white-main" />
          </button>
        </div>
      </div>
    </MainPagination>
  );
};

export default ApprovedProductPagination;

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
  .single-controls.possible {
    background: #20639b;
    .single-control-icon {
      color: #fff;
    }
  }
  .single-control-icon {
    color: #2f3133;
  }
`;
