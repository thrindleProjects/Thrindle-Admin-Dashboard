import styled from 'styled-components';

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

  .table-wrapper {
    display: flex;
    gap: 0.5rem;
    flex-flow: row nowrap;
  }

  .body-wrapper {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.75rem;
    padding: 3rem 2rem;
  }
  tbody.body-wrapper {
    font-weight: 800;
  }
  thead.body-wrapper {
    font-weight: 500;
  }
`;
