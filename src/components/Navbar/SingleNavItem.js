import React from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import "./SingleNavItem.css";

const SingleNavItem = (props) => {
  const location = useLocation();

  const { pathname: routeName } = location;
  // console.log(props);
  return (
    // <></>

    <MainNav
      to={props?.path}
      className="w-full px-2 flex flex-row text-white-text  mb-1 pl-5 font-Medium"
      style={({ isActive }) =>
        isActive && {
          background: "#20639b",
          color: "#fff",
          fontFamily: "Avenir-Heavy",
        }
      }
    >
      <img
        src={props.path === routeName ? props.icon2 : props.icon}
        alt="nav-icons"
        className="block mr-3 "
      />
      <p className="text-base font-Heavy ">{props.title}</p>
    </MainNav>
  );
};

export default SingleNavItem;

const MainNav = styled(NavLink)`
  height: 50px;
  align-items: center;
`;
