import styled from "styled-components";

const OrderDetailsGeneralWrapper = ({ children, ...others }) => {
  return <DetailContainer {...others}>{children}</DetailContainer>;
};

export default OrderDetailsGeneralWrapper;

const DetailContainer = styled.div`
  height: 28rem;
  display: flex;
  flex-flow: column nowrap;
  border-radius: 0.375rem;
  overflow-y: auto;
  box-shadow: 0rem 0.25rem 0.5rem #b2acac;
  max-width: 100%;
  width: 100%;
  
  .table-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    flex-flow: row nowrap;
    width: 100%;
    padding: 3rem 2rem;
    & > * {
      flex-shrink: 0;
    }
  }
  tbody.body-wrapper {
    font-weight: 800;
  }
  thead.body-wrapper {
    font-weight: 500;
  }
  img {
    min-width: 10rem;
  }
`;
