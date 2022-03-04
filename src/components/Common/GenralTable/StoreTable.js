import React from "react";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
import { FaEllipsisH } from "react-icons/fa";
import { NewMainTable } from "../../../styles/globalStyles";

const StoreTable = (props) => {
  return (
    <NewMainTable className="w-full rounded-md  py-10 mt-5 overflow-auto">
      <table className="w-full">
        <thead className="main-table-header rounded-md">
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

              <td>
                <p className="status text-center text-sm text-white-text font-Regular">
                  {item.name}
                </p>
              </td>
              <td>
                <p className="orderId text-center text-sm text-white-text font-Regular">
                  {item.phoneNumber}
                </p>
              </td>
              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.email}
                </p>
              </td>
              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.storeName}
                </p>
              </td>
              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.category}
                </p>
              </td>
              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.market}
                </p>
              </td>
              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.joined}
                </p>
              </td>
              <td className="pl-3">
                <FaEllipsisH className="text-base text-primary-dark" />
                {/* <div className="w-full flex flex-row actionCont">
                  <p className="product text-left text-xs actionText text-secondary-success font-Regular">
                    {item.action.approve}
                  </p>
                  <p className="product text-left text-xs actionText text-secondary-error font-Regular">
                    {item.action.decline}
                  </p>
                </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </NewMainTable>
  );
};

export default StoreTable;
