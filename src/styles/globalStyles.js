import styled from "styled-components";

export const Error = styled.p`
  font-size: 12px;
  color: red;
`;

export const ThrindleNotification = styled.div`
  top: ${(props) => (props.notify ? "2.5rem" : "-24rem")};
  opacity: ${(props) => (props.notify ? "1" : "0")};
`;

export const NewMainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);

  .main-table-header {
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr,
  td,
  th {
    justify-content: center;
    align-items: center;
  }

  tr {
    height: 80px;
    align-items: center;
  }
`;

export const Modal = styled.div`
  background: gray;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 15;
  opacity: 0.6;
`;

export const CircularProgress = styled.span`
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

export const Fieldset = styled.fieldset`
  position: relative;
  border: 0.98px solid #20639b;
  color: #2f3133;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  padding: 0 5px 5px;
`;
