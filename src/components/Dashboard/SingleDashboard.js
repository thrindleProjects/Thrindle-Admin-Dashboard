import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import SmallSpinner from "../newLoader/smallSpinner";

const SingleDashboard = (props) => {
  return (
    <MainCont
      color={props.color}
      className="w-full rounded-xl bg-white-main px-4 pt-5 pb-2 lg:mb-0 mb-10"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={`${props.index * 300}`}
    >
      <div className="w-full flex flex-row align-middle justify-between mb-4">
        <div className="w-full flex flex-row align-middle">
          <img src={props.img} alt="icon" className="block  mr-2" />
          <span className="text-white-text font-Medium single-title text-sm mt-1">
            {props.title}
          </span>
        </div>
        {/* <p className="percent mt-1 font-Medium">+12%</p> */}
      </div>
      {props.loading ? (
        <div className="h-9">
          <SmallSpinner />
        </div>
      ) : (
        <p className="text-3xl single-value font-ExtraBold text-left single-text">
          {props.value}
        </p>
      )}

      {props.path && (
        <NavLink
          to={props.path}
          exact
          className="flex flex-row align-middle justify-end w-full mt-1 view-cont"
        >
          <p className="text-xs view-btn font-Medium text-right text-white-text">
            View All
          </p>
          <FaAngleRight className="text-xs view-icon text-white-text ml-1" />
        </NavLink>
      )}
    </MainCont>
  );
};

export default SingleDashboard;

const MainCont = styled.div`
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
  height: 130px;
  .single-text {
    color: ${({ color }) => (color ? `${color}` : "#16588F")};
  }
  .percent {
    color: ${({ color }) => (color ? `${color}` : "#16588F")};
    font-size: 10px;
  }
  .view-cont {
    align-items: center;
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
