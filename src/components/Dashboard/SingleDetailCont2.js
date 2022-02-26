import React from "react";
import styled from "styled-components";
import Image from "../../assests/images/das-product.svg";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const SingleDetailCont2 = (props) => {
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
      <div className="w-full grid grid-cols-4 mt-3 gap-3 mb-3">
        <h6 className="text-xs text-white-text font-Bold text-left">
          Customer Name
        </h6>
        <h6 className="text-xs text-white-text font-Bold text-left">
          Product Title
        </h6>
        <h6 className="text-xs text-white-text font-Bold text-left">Price</h6>
        <h6 className="text-xs text-white-text font-Bold text-left">Date</h6>
      </div>

      {/* PRODUCT CONTENT */}
      <div className="w-full grid grid-cols-4 rounded-md single-details mb-3 pl-2">
        <p className="text-xs text-white-text font-Bold text-left capitalize">
          David code
        </p>
        <p className="text-xs text-white-text font-Bold text-left">Chinox</p>
        <p className="text-xs text-white-text font-Bold text-left">N4,500.00</p>
        <p className="text-xs text-white-text font-Bold text-left">
          2 mins ago
        </p>
      </div>
      {/* PRODUCT CONTENT */}
      <div className="w-full grid grid-cols-4 rounded-md single-details mb-3 pl-2">
        <p className="text-xs text-white-text font-Bold text-left capitalize">
          David code
        </p>
        <p className="text-xs text-white-text font-Bold text-left">Chinox</p>
        <p className="text-xs text-white-text font-Bold text-left">N4,500.00</p>
        <p className="text-xs text-white-text font-Bold text-left">
          2 mins ago
        </p>
      </div>
      {/* PRODUCT CONTENT */}
      <div className="w-full grid grid-cols-4 rounded-md single-details mb-3 pl-2">
        <p className="text-xs text-white-text font-Bold text-left capitalize">
          David code
        </p>
        <p className="text-xs text-white-text font-Bold text-left">Chinox</p>
        <p className="text-xs text-white-text font-Bold text-left">N4,500.00</p>
        <p className="text-xs text-white-text font-Bold text-left">
          2 mins ago
        </p>
      </div>
    </MainCont>
  );
};

export default SingleDetailCont2;

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
  .single-details {
    height: 50px;
    background: #fafafa;
    align-items: center;
  }
`;
