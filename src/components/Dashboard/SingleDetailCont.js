import React from "react";
import styled from "styled-components";
import Image from "../../assets/images/dash-store.svg";
import Image2 from "../../assets/images/Y.png";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const SingleDetailCont = (props) => {
  return (
    <MainCont className="w-full bg-white-main rounded-md pb-10  px-5">
      <div className="w-full flex flex-row single-header  pb-2">
        <div className="flex flex-row icon-header">
          <img src={Image} alt="icon" className="block" />
          <p className="text-white-text font-Bold text-base ml-5">
           {props.title}
          </p>
        </div>
        <NavLink
          to="#"
          exact
          className="flex flex-row align-middle justify-end text-primary-light  view-cont"
        >
          <p className="text-xs view-btn font-Medium text-right text-priamry-main">
            See All
          </p>
          <FaAngleRight className="text-xs view-icon text-priamry-main ml-1" />
        </NavLink>
      </div>
      {/* CONTENT header*/}
      <div className="w-full grid grid-cols-3 mt-3 mb-3">
        <div className="col-span-1 cont1">
          <h6 className="text-xs font-Bold text-white-text text-left">
            Stores
          </h6>
        </div>
        <div className="col-span-1 cont1">
          <h6 className="text-xs font-Bold text-white-text text-left">Visit</h6>
        </div>
      </div>
      {/* SINGLE CONTENT */}
      <div className="single-content w-full grid grid-cols-3 rounded-md mb-3">
        {/* cols1 */}
        <div className="store-cont flex flex-row w-full px-2 col-span-1">
          <img src={Image2} alt="store-logo" className="block store-logo" />
          <p className="text-sm font-Bold text-left ml-2 text-white-text capitalize">
            Yinka's store
          </p>
        </div>
        {/* COLS2 */}
        <div className="visit-cont flex flex-row w-full  col-span-2">
          <p className="text-sm font-Bold text-white-text text-left">5K</p>
          <p className="text-sm font-Bold text-secondary-success text-left ml-4">
            +12%
          </p>
          <div className="bar-cont ml-4 bg-primary-light rounded-md"></div>
        </div>
      </div>
      {/* SINGLE CONTENT */}
      <div className="single-content w-full grid grid-cols-3 rounded-md mb-3">
        {/* cols1 */}
        <div className="store-cont flex flex-row w-full px-2 col-span-1">
          <img src={Image2} alt="store-logo" className="block store-logo" />
          <p className="text-sm font-Bold text-left ml-2 text-white-text capitalize">
            Yinka's store
          </p>
        </div>
        {/* COLS2 */}
        <div className="visit-cont flex flex-row w-full  col-span-2">
          <p className="text-sm font-Bold text-white-text text-left">5K</p>
          <p className="text-sm font-Bold text-secondary-success text-left ml-4">
            +12%
          </p>
          <div className="bar-cont ml-4 bg-primary-light rounded-md"></div>
        </div>
      </div>
      {/* SINGLE CONTENT */}
      <div className="single-content w-full grid grid-cols-3 rounded-md mb-3">
        {/* cols1 */}
        <div className="store-cont flex flex-row w-full px-2 col-span-1">
          <img src={Image2} alt="store-logo" className="block store-logo" />
          <p className="text-sm font-Bold text-left ml-2 text-white-text capitalize">
            Yinka's store
          </p>
        </div>
        {/* COLS2 */}
        <div className="visit-cont flex flex-row w-full  col-span-2">
          <p className="text-sm font-Bold text-white-text text-left">5K</p>
          <p className="text-sm font-Bold text-secondary-success text-left ml-4">
            +12%
          </p>
          <div className="bar-cont ml-4 bg-primary-light rounded-md"></div>
        </div>
      </div>
    </MainCont>
  );
};

export default SingleDetailCont;

const MainCont = styled.div`
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
  .single-header {
    align-items: center;
    justify-content: space-between;
    header: 60px;
    border-bottom: 1px solid #dadada;
  }
  .view-cont {
    align-items: center;
  }
  .store-logo {
    width: 15px;
    height: 15px;
  }
  .store-cont,
  .visit-cont {
    align-items: center;
  }
  .single-content {
    height: 50px;
    background: #fafafa;
  }
  .bar-cont {
    height: 20px;
    width: 30%;
  }
  @media (min-width: 2000px) {
    .single-title {
      font-size: 16px;
    }
    .single-value {
      font-size: 36px;
    }
    .view-btn {
      font-size: 14px;
    }
    .view-icon {
      font-size: 14px;
    }
  }
`;
