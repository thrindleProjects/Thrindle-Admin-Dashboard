import React from "react";
// import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
import { Link } from "react-router-dom";
import { NewMainTable } from "../../../styles/globalStyles";
import formatDate from "../../../utils/formatDate";
import getMarketName from "../../../utils/getMarketName";

const StoreTable = (props) => {
  const hiddenMobile = ["Joined", "Last Update"];
  return (
    <NewMainTable className="w-full rounded-md pt-10 mt-5 overflow-auto">
      <table className="w-max min-w-full max-w-2xl md:max-w-6xl">
        <thead className="main-table-header rounded-md flex w-full">
          <tr className="w-full grid grid-cols-5 md:grid-cols-7 px-6">
            {props.tableHeaderData?.map((item, index) => (
              <th
                key={index}
                className={`table-head-text text-xs md:text-sm font-normal font-Regular text-left text-white-text px-2 ${
                  ["Store Name"].includes(item.title) ? "col-span-2" : ""
                } ${
                  hiddenMobile.includes(item.title)
                    ? "hidden md:block"
                    : "block"
                }`}
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="main-table-body text-xs md:text-sm">
          {props?.tableData?.reverse().map((item, index) => (
            <tr
              key={index}
              className="w-full grid grid-cols-5 md:grid-cols-7 cursor-pointer py-3 px-6"
            >
              <td className="flex items-center px-2">
                <Link to={`/store-details/${item.owner_id?.store_id}`}>
                  <p className="status text-left text-xs md:text-sm text-white-text font-Regular capitalize">
                    {props.pageIndex * 20 + (index + 1)}
                  </p>
                </Link>
              </td>
              <td className="flex items-center px-2 col-span-2">
                <Link to={`/store-details/${item.owner_id?.store_id}`}>
                  <p className="status text-left text-xs md:text-sm text-white-text font-Regular capitalize">
                    {item.store_name}
                  </p>
                </Link>
              </td>
              <td className="flex items-center px-2">
                <Link to={`/store-details/${item.owner_id?.store_id}`}>
                  <p className="status text-left text-xs md:text-sm text-white-text font-Regular capitalize">
                    {item?.owner_id?.store_id || "N/A"}
                  </p>
                </Link>
              </td>
              <td className="flex items-center px-2">
                <Link to={`/store-details/${item.owner_id?.store_id}`}>
                  <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                    {getMarketName(item?.owner_id?.store_id)}
                  </p>
                </Link>
              </td>

              <td className="hidden md:flex items-center px-2">
                <Link to={`/store-details/${item.owner_id?.store_id}`}>
                  <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                    {formatDate(item?.owner_id?.createdAt)}
                  </p>
                </Link>
              </td>
              <td className="hidden md:flex items-center px-2">
                <Link to={`/store-details/${item.owner_id?.store_id}`}>
                  <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                    {formatDate(item?.owner_id?.updatedAt)}
                  </p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </NewMainTable>
  );
};

export default StoreTable;
