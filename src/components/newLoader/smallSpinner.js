import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// const Container = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

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
  border: 2px solid #20639b;
  border-color: #20639b #20639b transparent transparent;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }
`;

const SmallSpinner = () => {
  const [networkFailure, setNetworkFailure] = useState(false);
  const history = useHistory();

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
          <Spin></Spin>
        </LoaderBox>
      ) : (
        <button
          className="cursor-pointer bg-primary-main text-white-main px-1 py-0.5 rounded-md text-sm"
          onClick={() => history.go(0)}
        >
          Retry
        </button>
      )}
    </LoaderContainer>
  );
};

export default SmallSpinner;
