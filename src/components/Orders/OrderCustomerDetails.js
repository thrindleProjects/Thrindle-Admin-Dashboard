import Wrapper from "./OrderDetailsGeneralWrapper";
import Header from "./OrderDetailsGeneralHeader";
import styled from "styled-components";

const OrderCustomerDetails = ({ tableHeader, tableData }) => {
  return (
    <Wrapper>
      <Header title="Customer's Details" />
      <SingleOrderTable className="table-wrapper">
        <thead className="body-wrapper">
          {tableHeader?.map((item, index) => {
            return (
              <tr key={index} className={`font-medium`}>
                <th>{item?.title}</th>
              </tr>
            );
          })}
        </thead>
        <tbody className="body-wrapper">
          <tr>
            <td>{tableData?.name}</td>
          </tr>
          <tr>
            <td>{tableData?.email}</td>
          </tr>
          <tr>
            <td>{tableData?.phone}</td>
          </tr>
          <tr>
            <td>{tableData?.location ? tableData?.location : "N/A"}</td>
          </tr>
        </tbody>
      </SingleOrderTable>
    </Wrapper>
  );
};

export default OrderCustomerDetails;

const SingleOrderTable = styled.table`
  .body-wrapper {
    display: grid;
    grid-template-rows: repeat(4, minmax(0, 2.5rem));
    gap: 0.5rem;
  }
`;
