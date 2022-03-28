import Wrapper from "./OrderDetailsGeneralWrapper";
import Header from "./OrderDetailsGeneralHeader";
import styled from "styled-components";

const OrderCustomerDetails = ({ tableHeader, tableData, buyerData }) => {
  return (
    <Wrapper>
      <Header title="Customer's Details" />
      <SingleOrderTable className="table-wrapper">
        <thead className="body-wrapper">
          {tableHeader?.map((item, index) => {
            return (
              <tr
                key={index}
                className={`font-medium ${
                  item?.title === "Address" ? "row-span-2" : ""
                }`}
              >
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
            <td>{buyerData?.shipping?.city}</td>
          </tr>
          <tr>
            <td>{buyerData?.shipping?.state}</td>
          </tr>
          <tr className="capitalize row-span-2">
            <td>{buyerData?.shipping?.address}</td>
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
    grid-template-rows: repeat(7, 1.5rem);
    gap: 0.5rem;
  }
`;
