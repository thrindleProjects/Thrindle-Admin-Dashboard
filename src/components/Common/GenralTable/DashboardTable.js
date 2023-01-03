import React from "react";
import styled from "styled-components";
import { numberFormat } from "../../../utils/formatPrice";
import getMarketName from "../../../utils/getMarketName";
import formatDate from "../../../utils/formatDate";

const DashboardTable = (props) => {
  const longerColumns = ["Product Title"];
  const centerHeader = ["Image"];
  const hiddenMobile = ["Uploaded", "Sub Category", "Stock"];
  const tableDataExtraStyles = "text-xs lg:text-sm";
  return (
    <MainTable className="w-full mt-2 overflow-auto">
      <table className="w-max max-w-5xl">
        <thead className="main-table-header rounded-md grid grid-cols-6 md:grid-cols-9">
          {props.tableHeaderData.map((item, index) => (
            <tr
              key={index}
              className={`h-full ${
                hiddenMobile.includes(item.title)
                  ? "hidden md:flex md:items-center"
                  : "flex items-center"
              } ${longerColumns.includes(item.title) ? "col-span-2" : ""} ${
                centerHeader.includes(item.title) ? "justify-center" : ""
              }`}
            >
              <th className="text-xs lg:text-sm font-normal font-Regular text-left text-white-text px-2">
                {item.title}
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="main-table-body">
          {props.tableData.map((item, index) => (
            <tr
              key={index}
              className="tableRowBottom w-full grid grid-cols-6 md:grid-cols-9 py-2"
            >
              <td>
                <img
                  src={
                    "http://store-staging-api.thrindle.com/api/thrindle/images/" +
                    item?.images[0]
                  }
                  className="h-6 md:h-9 lg:h-12 mr-auto rounded-sm mx-auto"
                  loading="eager"
                  alt={`product${index + 1}`}
                />
              </td>
              <td
                className={`table-data-wrapper col-span-2 ${tableDataExtraStyles}`}
              >
                <p className="table-data-container">{item?.name}</p>
              </td>
              <td className={`table-data-wrapper ${tableDataExtraStyles}`}>
                <p className="table-data-container">
                  N{numberFormat(item?.price)}
                </p>
              </td>
              <td
                className={`table-data-wrapper mobile-hidden ${tableDataExtraStyles}`}
              >
                <p className="table-data-container">{item?.no_in_stock}</p>
              </td>
              <td className={`table-data-wrapper ${tableDataExtraStyles}`}>
                <p className="table-data-container">
                  {getMarketName(item?.store_id)}
                </p>
              </td>
              <td className={`table-data-wrapper ${tableDataExtraStyles}`}>
                <p className="table-data-container">
                  {item?.category?.name || "N/A"}
                </p>
              </td>
              <td
                className={`table-data-wrapper mobile-hidden ${tableDataExtraStyles}`}
              >
                <p className="table-data-container">
                  {item?.subcategory?.name || "N/A"}
                </p>
              </td>
              <td
                className={`table-data-wrapper mobile-hidden ${tableDataExtraStyles}`}
              >
                <p className="table-data-container">
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
    height: max-content;
  }

  .table-data-wrapper {
    display: flex;
    align-items: center;
    padding-left: 0.5rem /* 8px */;
    padding-right: 0.5rem /* 8px */;
    &.mobile-hidden {
      display: none;
    }
  }

  td,
  th {
    /* display: flex;
    align-items: center;
    justify-content: center; */
    text-align: left;
  }

  @media (min-width: 768px) {
    .table-data-wrapper {
      &.mobile-hidden {
        display: flex;
      }
    }
  }

  @media (min-width: 1024px) {
    .table-data-wrapper {
      .table-data-container {
        --tw-text-opacity: 1;
        color: rgba(70, 79, 84, var(--tw-text-opacity));
        font-family: "Avenir-Regular";
      }
    }
  }
`;
