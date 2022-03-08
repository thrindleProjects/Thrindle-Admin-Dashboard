import React from "react";
import { NewMainTable } from "../../../styles/globalStyles";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";

const ShipmentTable = (props) => {
  return (
    <NewMainTable className="w-full rounded-md py-10 mt-5 overflow-auto">
      <table className="w-full">
        <thead className="main-table-header rounded-md ">
          <tr className="grid grid-cols-9">
            <th>
              <GeneralCheckBox />
            </th>

            {props.tableHeaderData?.map((item, index) => (
              <th
                key={index}
                className="table-head-text text-sm font-normal font-Regular text-center text-white-text"
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="main-table-body">
          {props.tableData?.map((item, index) => (
            <tr key={index} className="w-full grid grid-cols-9">
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
    </NewMainTable>
  );
};

export default ShipmentTable;

