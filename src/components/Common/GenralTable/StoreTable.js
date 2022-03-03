import React from "react";
import styled from "styled-components";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
import { FaEllipsisH } from "react-icons/fa";

const StoreTable = (props) => {
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
            <tr key={index} className="w-full flex flex-row">
              {props.showCheck && (
                <td>
                  <GeneralCheckBox />
                </td>
              )}

              <td>
                <p className="status text-left text-sm text-white-text font-Regular">
                  {item.name}
                </p>
              </td>
              <td>
                <p className="orderId text-left text-sm text-white-text font-Regular">
                  {item.phoneNumber}
                </p>
              </td>
              <td>
                <p className="product text-left text-sm text-white-text font-Regular">
                  {item.email}
                </p>
              </td>
              <td>
                <p className="product text-left text-sm text-white-text font-Regular">
                  {item.storeName}
                </p>
              </td>
              <td>
                <p className="product text-left text-sm text-white-text font-Regular">
                  {item.category}
                </p>
              </td>
              <td>
                <p className="product text-left text-sm text-white-text font-Regular">
                  {item.market}
                </p>
              </td>
              <td>
                <p className="product text-left text-sm text-white-text font-Regular">
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
    </MainTable>
  );
};

export default StoreTable;

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
    justify-content: space-between;
  }
  .actionCont {
    align-items: center;
    justify-content: space-between;
  }
  .actionText {
    font-size: 10px;
  }
`;
