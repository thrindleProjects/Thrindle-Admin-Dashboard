import React from "react";
import styled, { css } from "styled-components";

const ButtonElement = styled.button`
  background: ${(props) =>
    props.blueBg ? "rgba(32, 99, 155, 0.95)" : "rgb(243, 158, 40, 0.95)"};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: max-content;
  font-weight: 600;
  padding: 0.5em 2em;
  border-radius: 8px;
  box-shadow: ${(props) => (props.blueBg ? "" : "2px 5px 3px #f7ead5")};
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.smallButton &&
    css`
      width: max-content;
      padding: 0.4em 1em;
    `}

  &:hover {
    background: ${(props) =>
      props.blueBg ? "rgba(32, 99, 155, 1)" : "rgb(243, 158, 40, 1)"};
    ${(props) =>
      props.scale &&
      css`
        transform: scale(1.1);
      `}
  }

  @media (min-width: 768px) {
    width: 100%;
    border-radius: 12px;

    ${(props) =>
      props.shortButton &&
      css`
        width: max-content;
        padding: 0.7em 2em;
      `}
  }

  ${(props) =>
    props.longButton &&
    css`
      width: 100%;
      padding: 0.7em 2em;
    `}
`;

const Span = styled.span`
  position: relative;
  display: block;

  &::after {
    content: "";
    position: absolute;
    width: 1em;
    height: 1em;
    top: 4px;
    left: 40%;
    border-top: 2.5px solid white;
    border-right: 2.5px solid white;
    border-radius: 50%;

    animation: spin 2s ease-in-out infinite;

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
  }
`;

const Text = styled.p`
  opacity: ${(props) => (props.none ? 0 : 1)};
`;

const CircularProgress = () => {
  return <Span></Span>;
};

const AddProductBtn = ({
  text,
  right,
  processing,
  onClick,
  type,
  landingPage,
  scale,
  disabled,
  longButton,
  shortButton,
  smallButton,
  blueBg,
}) => {
  return (
    <ButtonElement
      disabled={disabled}
      right={right}
      onClick={onClick ? () => onClick() : null}
      type={type}
      landingPage={landingPage}
      processing={processing}
      scale={scale}
      longButton={longButton}
      shortButton={shortButton}
      smallButton={smallButton}
      blueBg={blueBg}
    >
      {processing ? (
        <div>
          <CircularProgress />
          <Text none>{text}</Text>
        </div>
      ) : (
        <>
          <Text>{text}</Text>{" "}
        </>
      )}
    </ButtonElement>
  );
};

export default AddProductBtn;
