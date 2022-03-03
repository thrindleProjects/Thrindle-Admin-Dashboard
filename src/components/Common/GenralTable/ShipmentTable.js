import React from "react";
import styled from "styled-components";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";

const ShipmentTable = (props) => {
  return (
    <MainTable className="w-full rounded-md  py-10 mt-5 overflow-auto">
      <table className="w-full">
        <thead className="main-table-header  rounded-md flex flex-row">
          {props.showCheck && <GeneralCheckBox />}

          {props.tableHeaderData?.map((item, index) => (
            <tr key={index}>
              <th className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                {item.title}
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="main-table-body">
          {props.tableData?.map((item, index) => (
            <tr key={index} className="w-full flex flex-row text-center">
              {props.showCheck && (
                <td>
                  <GeneralCheckBox />
                </td>
              )}

              <td className="text-center">
                <p className="status text-center text-sm text-white-text font-Regular">
                  {item.customerName}
                </p>
              </td>
              <td className="text-center">
                <p className="orderId text-center text-sm text-white-text font-Regular">
                  {item.orderID}
                </p>
              </td>
              <td className="text-center">
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.carrier}
                </p>
              </td>
              <td className="text-center">
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.orderDate}
                </p>
              </td>
              <td className="text-center">
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.shippingDate}
                </p>
              </td>
              <td className="text-center">
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.expected}
                </p>
              </td>
              <td className="text-center">
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.carrierStatus}
                </p>
              </td>
              <td className="text-center">
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.paymentStatus}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainTable>
  );
};

export default ShipmentTable;

const MainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  .main-table-header {
    width: 100%;
    padding: 0px 12px !important;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }
  tr:nth-child(even) {
    background-color: #fafafa;
  }
  tr td {
    padding: 0px 10px !important;
    text-align: left;
  }
  tr {
    height: 50px;
    align-items: center;
    justify-content: space-evenly;
  }
`;
