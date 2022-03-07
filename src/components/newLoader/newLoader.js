import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoNetwork from "../emptyStates/noNetwork";

const Container = styled.div``;

const LoaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
`;

const LoaderBox = styled.div`
  position: absolute;
  top: 50%;
  left: 45%;
  width: 3em;
  height: 3em;
  transform: translate(-50%, -50%);
`;

const Spin = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #20639b;
  border-color: #20639b transparent #20639b transparent;
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

const NewLoader = () => {
  const [networkFailure, setNetworkFailure] = useState(false);
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setTimeout(() => setNetworkFailure(true), 30000);
    }

    return () => {
      mounted = false;
    };
  });

  return (
    <>
      <LoaderContainer>
        {!networkFailure ? (
          <LoaderBox>
            <Spin></Spin>
          </LoaderBox>
        ) : (
          <>
            <Container>
              <NoNetwork />
            </Container>
          </>
        )}
      </LoaderContainer>
    </>
  );
};

export default NewLoader;
