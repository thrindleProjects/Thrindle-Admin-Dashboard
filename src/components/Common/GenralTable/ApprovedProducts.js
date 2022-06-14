import React from "react";
import formatDate from "../../../utils/formatDate";
import { numberFormat } from "../../../utils/formatPrice";
import { NewMainTable } from "../../../styles/globalStyles";
import ApprovedProductPagination from "../GeneralPagination/ApprovedProductPagination";
import ApprovedFilter from "../GeneralFilterTab/ApprovedProductsFilter";
import getMarketName from "../../../utils/getMarketName";

// import { AiFillCloseCircle } from "react-icons/ai";
// import { MdEdit } from "react-icons/md";

function ApprovedProducts({
  tableHeaderData,
  tableData,
  displayDeleteModal,
  pageIndex,
  setModal,
  status,
  pageInfo,
  changePage,
  setProducts,
}) {
  const hiddenMobile = ["Uploaded"];
  const doubleColumn = ["Category", "Product Name", "Uploaded"];

  const handleModal = (action, id, verified) => {
    return setModal(action, id, verified);
  };

  return (
    <>
      <ApprovedFilter setProducts={setProducts} />
      <ApprovedProductPagination
        pageIndex={pageIndex}
        pageInfo={pageInfo}
        handlePagination={changePage}
        pageLength={tableData.length}
      />
      <NewMainTable className="w-full rounded-md pt-10 mt-5 overflow-auto">
        <table className="w-max min-w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
          {!status.isError && !status.isLoading && tableData && (
            <>
              <thead className="">
                <tr className="main-table-header rounded-md grid grid-flow-row grid-cols-9 md:grid-cols-11 auto-cols-min gap-3 px-6">
                  {tableHeaderData?.map((item, index) => (
                    <th
                      key={index}
                      className={`table-head-text text-xs md:text-sm font-normal font-Regular text-left text-white-text ${
                        hiddenMobile.includes(item)
                          ? "hidden md:block"
                          : "block"
                      } ${
                        doubleColumn.includes(item) && "col-span-2 text-left"
                      }`}
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
                    className="w-full grid grid-flow-row grid-cols-9 md:grid-cols-11 gap-3 auto-cols-min px-6 py-3 cursor-pointer"
                  >
                    <td>
                      <p className="status text-left text-xs md:text-sm text-white-text font-Regular capitalize">
                        {(pageIndex - 1) * 20 + (index + 1)}
                      </p>
                    </td>
                    <td className="col-span-2">
                      <p className="status text-left text-xs md:text-sm text-white-text font-Regular capitalize ">
                        {item.name}
                      </p>
                    </td>
                    <td className="col-span-2">
                      <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                        {item.category.name}
                      </p>
                    </td>
                    <td>
                      <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                        N{numberFormat(item.price)}
                      </p>
                    </td>
                    <td>
                      <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                        {item.store_id}
                      </p>
                    </td>
                    <td className="">
                      <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                        {getMarketName(item.store_id)}
                      </p>
                    </td>
                    <td className="col-span-2 hidden md:block">
                      <p className="product text-left text-xs md:text-sm text-white-text font-Regular">
                        {formatDate(item.createdAt)}
                      </p>
                    </td>
                    <td className="">
                      <p className="text-xs md:text-sm font-normal font-Regular text-left text-white-text flex flex-row gap-3">
                        <button
                          onClick={() =>
                            handleModal(
                              "SHOW_EDIT_MODAL",
                              item._id,
                              item.verified
                            )
                          }
                          className="cursor-pointer flex flex-row gap-1 items-center text-primary-dark"
                        >
                          {/* <MdEdit className="text-2xl text-primary-dark" />{" "} */}
                          Edit
                        </button>
                        <button
                          className="cursor-pointer flex flex-row gap-2 items-center text-secondary-error"
                          onClick={() => displayDeleteModal(item._id, item)}
                        >
                          {/* <AiFillCloseCircle className="text-2xl text-secondary-error" />{" "} */}
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
