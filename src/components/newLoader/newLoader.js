import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoNetwork from "../emptyStates/noNetwork";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: inherit;
`;

const LoaderBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2em;
  height: 2em;
  transform: translate(-50%, -50%);
`;

const Spin = styled.div`
  width: 100%;
  height: 100%;
  border: ${(props) => (props.login ? "2px solid white" : "2px solid #20639b")};
  border-color: ${(props) =>
    props.login
      ? "white white transparent  transparent"
      : "#20639b #20639b transparent  transparent"};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const NewLoader = ({ login }) => {
  const [networkFailure, setNetworkFailure] = useState(false);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      setNetworkFailure(true);
    }, 30000);

    return () => {
      clearTimeout(timeoutID);
    };
  });

  return (
    <LoaderContainer>
      {!networkFailure ? (
        <LoaderBox>
          <Spin login={login}></Spin>
        </LoaderBox>
      ) : (
        <Container>
          <NoNetwork />
        </Container>
      )}
    </LoaderContainer>
  );
};

export default NewLoader;
