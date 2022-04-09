import React from "react";
import styled from "styled-components";

const TableFilter = (props) => {
  return (
    <MainCont
      color={props.color}
      className="w-full md:flex md:flex-row flex-wrap px-3 md:mb-0 mb-14"
    >
      <div className="filter-title">
        <h4 className="text-white-text text-xl font-ExtraBold">
          {props.title}
        </h4>
        {props.show && (
          <div className="w-full  mt-2 flex flex-row tab-flex">
            <div className="single-tab  rounded-md mr-2 flex flex-row">
              <div className="circle1 mr-2"></div>
              <p className="text-xs sm:text-sm text-white-text font-Regular">
                Desktop
              </p>
            </div>
            <div className="single-tab  rounded-md mr-2 flex flex-row">
              <div className="circle2 mr-2"></div>
              <p className="text-xs sm:text-sm text-white-text font-Regular">
                Mobile
              </p>
            </div>
          </div>
        )}
      </div>
      {/* <div className="filter-tab-cont rounded-md flex flex-row px-1 ">
        {props.data.map((item, index) => (
          <div
            key={index}
            className={
              item.title === props.value
                ? "single-tab rounded-md flex flex-row cursor-pointer  activeTab"
                : "single-tab rounded-md flex flex-row cursor-pointer "
            }
            onClick={() => props.changeTab(item.title)}
          >
            <p
              className={
                item.title === props.value
                  ? "text-white-text tex-sm tab-text activeColor"
                  : "text-white-text tex-sm tab-text "
              }
            >
              {item.title}
            </p>
          </div>
        ))}
      </div> */}
    </MainCont>
  );
};

export default TableFilter;

const MainCont = styled.div`
  height: 50px;
  align-items: center;
  justify-content: space-between;

  .filter-tab-cont {
    width: 40%;
    height: 90%;
    align-items: center;
    background: #fafafa;
  }
  .single-tab {
    /* width: ${({ length }) => (length ? `${100 / length}%` : "50%")}; */
    align-items: center;
    justify-content: center;
    height: 80%;
    transition: all 0.3s ease-in-out;
  }
  .activeTab {
    background: #fff;
    font-family: "Avenir-Heavy";
  }
  .activeColor {
    color: ${({ color }) => (color ? `${color}` : `${color}`)};
  }
  .tab-flex {
    align-items: center;
  }
  .single-tab {
    width: 100px;
    height: 30px;
    border: 1px solid #e7edf2;
    align-items: center;
  }
  .circle1 {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #20639b;
  }
  .circle2 {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #4bc7ea;
  }

  @media (max-width: 500px) {
    .filter-tab-cont {
      width: 100%;
      margin-top: 20px;
    }
    .single-tab {
      /* width: ${({ length }) => (length ? `${100 / length}%` : "50%")}; */
      align-items: center;
      justify-content: center;
      height: 90%;
      transition: all 0.3s ease-in-out;
    }
  }
`;
