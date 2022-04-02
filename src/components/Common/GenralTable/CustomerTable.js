import React from "react";
import styled from "styled-components";

const CustomerTable = (props) => {
  const getMarketName = (storeId = "NA") => {
    if (storeId) {
      if (storeId.startsWith("CV")) return "Computer Village";
      if (storeId.startsWith("BM")) return "Balogun Market";
      if (storeId.startsWith("EM")) return "Eko Market";
    }
    return "Other Market";
  };
  const getUploadDate = (updatedAt) => {
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  return (
    <MainTable className="w-full rounded-md py-10 mt-5 overflow-auto">
      <table className="w-full min-w-min max-w-full">
        <thead>
          <tr className="main-table-header rounded-md grid grid-flow-row grid-cols-6 auto-cols-min gap-8 px-6">
            {props.showCheck && <th></th>}
            {props.tableHeaderData?.map((item, index) => (
              <th key={index}>
                <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                  {item.title}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="main-table-body">
          {props.tableData?.map((item, index) => {
            let marktetName = getMarketName(item.store_id);
            let uploadDate = getUploadDate(item.updatedAt);
            let serialNumber = props.pageIndex * 20 + (index + 1);

            return (
              <tr
                key={item._id}
                className="w-full grid grid-flow-row grid-cols-6 gap-8 auto-cols-min px-6 py-3 "
              >
                {props.showCheck && <td>{serialNumber}</td>}

                <td>
                  <p className="capitalize status text-left text-sm text-white-text font-Regular">
                    {item.name}
                  </p>
                </td>
                <td>
                  <p className="orderId text-left text-sm text-white-text font-Regular">
                    {item.phone}
                  </p>
                </td>
                <td>
                  <p className="product text-left text-sm text-white-text font-Regular">
                    {item.name}
                  </p>
                </td>

                <td>
                  <p className="product text-left text-sm text-white-text font-Regular">
                    {marktetName}
                  </p>
                </td>
                <td>
                  <p className="product text-left text-sm text-white-text font-Regular">
                    {uploadDate}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MainTable>
  );
};

export default CustomerTable;

const MainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  .main-table-header {
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }
  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }
  tr td {
    padding: 0px !important;
    text-align: center;
  }
  tr {
    height: max-content;
    align-items: center;
    justify-content: space-between;
  }
`;
