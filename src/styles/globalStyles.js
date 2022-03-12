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
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  opacity: 0.6;
`;
