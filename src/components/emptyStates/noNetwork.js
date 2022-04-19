import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import noNetworkImage from "../../assets/images/noNetwork.svg";

const Image = styled.img`
  width: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled.button`
  display: block;
  border: 1px solid #f39e28;
  color: #f39e28;
  padding: 0.5em 1em;
  border-radius: 8px;
  width: max-content;
  margin: 2em auto;
  transition: all 0.5s ease-in-out;
  font-size: 14px;

  &:hover {
    color: white;
    background: #f39e28;
  }
`;

function NoNetwork() {
  let history = useHistory();

  return (
    <>
      <Image src={noNetworkImage} loading="eager" alt="no-network" />
      <Button onClick={() => history.go(0)}>Refresh</Button>
    </>
  );
}

export default NoNetwork;
