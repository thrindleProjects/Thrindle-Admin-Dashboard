import { useEffect, useState } from "react";
import styled from "styled-components";
import { CgChevronDoubleRight, CgChevronDoubleLeft } from "react-icons/cg";

const ApprovedProductPagination = ({
  pageInfo,
  pageIndex,
  handlePagination,
  pageLength,
}) => {
  const [pagData, setPageInfo] = useState({
    startNumber: 0,
    endNumber: 0,
    totalNumber: 0,
    displayPages: [],
  });

  useEffect(() => {
    let startNumber = (pageIndex - 1) * 20 + 1;
    let endNumber = (pageIndex - 1) * 20 + pageLength;
    let totalNumber = pageInfo?.totalProducts;
    return setPageInfo({ startNumber, endNumber, totalNumber });
  }, [pageIndex, pageInfo?.totalProducts, pageLength]);

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
            onClick={() => handlePagination("FIRST_PAGE")}
            className={`single-controls first-page flex flex-row w-8 h-8 p-2 rounded-full focus:outline-none outline-none`}
          >
            <CgChevronDoubleLeft className="text-base single-control-icon text-center text-white-main" />
          </button>
          {pageInfo?.displayPages?.map((item) => (
            <button
              key={item.page}
              className={`text-sm ${
                pageInfo?.currentPage === item.page
                  ? "text-primary-main font-black underline"
                  : "text-gray-700"
              }`}
              onClick={(e) => {
                if (pageInfo?.currentPage === item.page) return;
                handlePagination("GO_TO_PAGE", item.page);
              }}
            >
              {item.page}
            </button>
          ))}
          <button
            onClick={() => handlePagination("LAST_PAGE")}
            className={`single-controls last-page flex flex-row w-8 h-8 p-2 rounded-full focus:outline-none outline-none`}
          >
            <CgChevronDoubleRight className="text-base single-control-icon text-center text-white-main" />
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
    border: 1px solid #20639b;
    &:hover {
      background: #20639b;
      .single-control-icon {
        color: #fff;
      }
    }
  }
  .single-controls.possible {
    background: #20639b;
    .single-control-icon {
      color: #fff;
    }
  }
  .single-control-icon {
    color: #20639b;
  }
`;
