import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import './SingleNavItem.css'

const SingleNavItem = (props) => {
  return (
    <MainNav
    exact
      to={props.path}
      className="w-full px-2 flex flex-row text-white-text  mb-1 pl-5 font-Medium"
      activeClassName="active-nav"
    >
      <img src={props.icon} alt="nav-icons" className="block mr-3 " />
      <p className="text-base font-Heavy ">{props.title}</p>
    </MainNav>
  );
};

export default SingleNavItem;

const MainNav = styled(NavLink)`
  height: 50px;
  align-items: center;

`;
