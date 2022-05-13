import React from "react";
import formatDate from "../../../utils/formatDate";
import { numberFormat } from "../../../utils/formatPrice";
import { NewMainTable } from "../../../styles/globalStyles";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

function ApprovedProducts({
  tableHeaderData,
  tableData,
  displayDeleteModal,
  pageIndex,
  setModal,
  status,
}) {
  const handleModal = (action, id) => {
    return setModal(action, id);
  };
  return (
    <>
      <NewMainTable className="w-full rounded-md  py-10 mt-5 overflow-auto">
        <table className="w-full">
          {!status.isError && !status.isLoading && tableData && (
            <>
              <thead className="main-table-header rounded-md">
                <tr className="grid grid-cols-12 gap-4 px-6">
                  {tableHeaderData?.map((item, index) => (
                    <th
                      key={index}
                      className={`table-head-text text-sm font-normal font-Regular text-left text-white-text ${
                        [
                          "Product Name",
                          "Action",
                          "Category",
                          "Market",
                        ].includes(item)
                          ? "col-span-2"
                          : ""
                      } ${["Action"].includes(item) ? "text-center" : ""}`}
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
                    className="w-full grid grid-cols-12 gap-4 cursor-pointer px-6"
                  >
                    <td>
                      <p className="status text-left text-sm text-white-text font-Regular capitalize">
                        {pageIndex * 20 + (index + 1)}
                      </p>
                    </td>

                    <td className="col-span-2">
                      <p className="status text-left text-sm text-white-text font-Regular capitalize ">
                        {item.name}
                      </p>
                    </td>

                    <td className="col-span-2">
                      <p className="product text-left text-sm text-white-text font-Regular">
                        {item.category.name}
                      </p>
                    </td>

                    <td>
                      <p className="product text-left text-sm text-white-text font-Regular">
                        N{numberFormat(item.price)}
                      </p>
                    </td>

                    <td>
                      <p className="product text-left text-sm text-white-text font-Regular">
                        {item.store_id}
                      </p>
                    </td>

                    <td className="col-span-2">
                      <p className="product text-left text-sm text-white-text font-Regular">
                        {item.store_id.startsWith("EM") && (
                          <span>Eko Market</span>
                        )}
                        {item.store_id.startsWith("BM") && (
                          <span>Balogun Market</span>
                        )}
                        {item.store_id.startsWith("CV") && (
                          <span>Computer Village</span>
                        )}
                      </p>
                    </td>

                    <td>
                      <p className="product text-left text-sm text-white-text font-Regular">
                        {formatDate(item.createdAt)}
                      </p>
                    </td>

                    <td className="col-span-2">
                      <p className="table-head-text text-small font-normal font-Regular text-left text-white-text flex flex-row gap-8">
                        <button
                          onClick={() =>
                            handleModal("SHOW_VERIFIED_EDIT_MODAL", item._id)
                          }
                          className="cursor-pointer flex flex-row gap-2 items-center"
                        >
                          <MdEdit className="text-2xl text-primary-dark" /> Edit
                        </button>
                        <button
                          className="cursor-pointer flex flex-row gap-2 items-center"
                          onClick={() => displayDeleteModal(item._id, item)}
                        >
                          <AiFillCloseCircle className="text-2xl text-secondary-error" />{" "}
                          Delete
                        </button>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </NewMainTable>
    </>
  );
}

export default ApprovedProducts;
