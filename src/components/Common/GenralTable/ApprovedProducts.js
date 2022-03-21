import React from "react";
import formatDate from "../../../utils/formatDate";
import { numberFormat } from "../../../utils/formatPrice";
import { NewMainTable } from "../../../styles/globalStyles";

function ApprovedProducts({
  tableHeaderData,
  tableData,
  displayDeleteModal,
  pageIndex,
}) {
  return (
    <>
      <NewMainTable className="w-full rounded-md  py-10 mt-5 overflow-auto">
        <table className="w-full">
          <thead className="main-table-header rounded-md">
            <tr className="grid grid-cols-9">
              <th>
                <></>
              </th>

              {tableHeaderData?.map((item, index) => (
                <th
                  key={index}
                  className={
                    item === "Product Name"
                      ? "table-head-text text-sm font-normal font-Regular text-center text-white-text col-span-2"
                      : "table-head-text text-sm font-normal font-Regular text-center text-white-text"
                  }
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="main-table-body">
            {tableData?.map((item, index) => (
              <tr
                key={index}
                className="w-full grid grid-cols-9 cursor-pointer"
              >
                <td>
                  <p className="status text-center text-sm text-white-text font-Regular capitalize">
                    {pageIndex * 20 + (index + 1)}
                  </p>
                </td>

                <td className="col-span-2">
                  <p className="status text-center text-sm text-white-text font-Regular capitalize ">
                    {item.name}
                  </p>
                </td>

                <td>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    {item.category.name}
                  </p>
                </td>

                <td>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    N{numberFormat(item.price)}
                  </p>
                </td>

                <td>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    {item.store_id}
                  </p>
                </td>

                <td>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    {item.store_id.startsWith("EM") && <span>Eko Market</span>}
                    {item.store_id.startsWith("BM") && (
                      <span>Balogun Market</span>
                    )}
                    {item.store_id.startsWith("CV") && (
                      <span>Computer Village</span>
                    )}
                  </p>
                </td>

                <td>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    {formatDate(item.createdAt)}
                  </p>
                </td>

                <td>
                  <div
                    className="w-full flex justify-center"
                    onClick={(e) =>
                      displayDeleteModal(e.currentTarget.id, item)
                    }
                    id={item._id}
                  >
                    <p>
                      <svg
                        className="w-6 h-5"
                        fill="none"
                        stroke="red"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </NewMainTable>
    </>
  );
}

export default ApprovedProducts;
