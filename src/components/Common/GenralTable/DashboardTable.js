import React from "react";
import styled from "styled-components";
import { numberFormat } from "../../../utils/formatPrice";
import getMarketName from "../../../utils/getMarketName";
import formatDate from "../../../utils/formatDate";

const DashboardTable = (props) => {
  const longerColumns = ["Product Title", "Category", "Sub Category"];
  return (
    <MainTable className="w-full mt-2 overflow-auto">
      <table className="w-full">
        <thead className="main-table-header rounded-md grid grid-cols-11">
          {props.tableHeaderData.map((item, index) => (
            <tr
              key={index}
              className={`block mx-auto ${
                longerColumns.includes(item.title) ? "col-span-2" : ""
              }`}
            >
              <th className="text-sm font-normal font-Regular text-center text-white-text">
                {item.title}
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="main-table-body">
          {props.tableData.map((item, index) => (
            <tr key={index} className="tableRowBottom w-full grid grid-cols-11">
              <td>
                <img
                  src={
                    "https://thrindleservices.herokuapp.com/api/thrindle/images/" +
                    item?.images[0]
                  }
                  className="w-12 h-12 mx-auto rounded-sm"
                  loading="eager"
                  alt={`product${index + 1}`}
                />
              </td>
              <td className="col-span-2">
                <p className="product text-left lg:text-sm text-xs text-white-text font-Regular ">
                  {item?.name}
                </p>
              </td>
              <td>
                <p className="product text-left lg:text-sm text-xs text-white-text font-Regular">
                  N{numberFormat(item?.price)}
                </p>
              </td>
              <td>
                <p className="product text-left lg:text-sm text-xs text-white-text font-Regular">
                  {item?.no_in_stock}
                </p>
              </td>
              <td>
                <p className="product text-left lg:text-sm text-xs text-white-text font-Regular">
                  {getMarketName(item?.store_id)}
                </p>
              </td>
              <td className=" col-span-2">
                <p className="product text-left lg:text-sm text-xs text-white-text font-Regular">
                  {item?.category?.name || "N/A"}
                </p>
              </td>
              <td className="col-span-2">
                <p className="product text-left lg:text-sm text-xs text-white-text font-Regular">
                  {item?.subcategory?.name || "N/A"}
                </p>
              </td>
              <td>
                <p className="product text-left lg:text-sm text-xs text-white-text font-Regular">
                  {formatDate(item?.createdAt)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainTable>
  );
};

export default DashboardTable;

const MainTable = styled.div`
  //   box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  .main-table-header {
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  .tableRowBottom {
    height: 80px;
    align-items: center;
    justify-content: space-evenly;
  }

  .tableRowBottom > td {
    margin: 0 auto;
  }
`;
