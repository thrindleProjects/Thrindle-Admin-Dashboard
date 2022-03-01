import React from "react";
import styled from "styled-components";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";

const GeneralTable = (props) => {
  return (
    <MainTable className='w-full rounded-md  py-10 mt-5 overflow-auto'>
      <table className='w-full'>
        <thead className='main-table-header  rounded-md flex flex-row'>
          {props.showCheck && <GeneralCheckBox />}

          {props.tableHeaderData?.map((item, index) => (
            <th
              className='table-head-text text-sm font-normal font-Regular text-left text-white-text'
              key={index}
            >
              {item.title}
            </th>
          ))}
        </thead>
        <tbody className='main-table-body'>
          {props.tableData?.map((item, index) => (
            <tr key={index} className='w-full flex flex-row'>
              {props.showCheck && (
                <td>
                  <GeneralCheckBox />
                </td>
              )}

              <td>
                <p className='status text-left text-sm text-white-text font-Regular'>
                  {item.status}
                </p>
              </td>
              <td>
                <p className='orderId text-left text-sm text-white-text font-Regular'>
                  {item.OrderID}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.ProductTitle}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.Price}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.CustomerName}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.PhoneNo}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.Market}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.Store}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.Category}
                </p>
              </td>
              <td>
                <p className='product text-left text-sm text-white-text font-Regular'>
                  {item.OrderDate}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainTable>
  );
};

export default GeneralTable;

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
