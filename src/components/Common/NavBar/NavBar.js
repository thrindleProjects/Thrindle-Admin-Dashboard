import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Header = styled.header`
  position: -webkit-sticky;
  position: ${(props) => (props.fixed ? "static" : "sticky")};
  top: 0px;
  z-index: 5;
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  padding-left: 1.5em;
  padding-right: 1.5em;

  @media (min-width: 768px) {
    padding-left: 3em;
    padding-right: 3em;
  }

  @media (min-width: 1024px) {
    padding-left: 5em;
    padding-right: 5em;
  }
  @media (min-width: 2560px) {
    padding-left: 20em;
    padding-right: 20em;
  }
`;

const ThrindleLogo = styled(Link)`
  width: 114.31px;
  height: 28.99px;
`;


function NavBar() {
  return (
    <Header>
      <div className="w-full py-4 lg:py-6" id="navbar">
        <ThrindleLogo to="/">
          <img
            src="https://res.cloudinary.com/codeinstd/image/upload/v1627459268/Logo_Identity_iskwsm.png"
            alt="thrindle logo"
            loading="eager"
          />
        </ThrindleLogo>
      </div>
    </Header>
  );
}

export default NavBar;
