import styled from "styled-components";
import getMarketName from "../../../utils/getMarketName";
import ApprovedFilter from "../GeneralFilterTab/ApprovedProductsFilter";
import Pagination from "../GeneralPagination/ApprovedProductPagination";
// import { MdEdit } from "react-icons/md";
// import { AiFillCloseCircle } from "react-icons/ai";

const InventoryTable = (props) => {
  const hiddenMobile = ["Uploaded"];
  const doubleColumn = ["Category", "Product Title"];

  const handleModal = (action, id, verified) => {
    return props.setModal(action, id);
  };

  const getUploadDate = (updatedAt) => {
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  console.log(props.pageInfo);

  return (
    <>
      {/* <GeneralFilterTab
        filter={props.filterValue}
        filterData={props.products?.categories}
        products={props.products}
        setProducts={props.setProducts}
        changeFilter={(val) => props.setFilterValue(val)}
      /> */}
      <ApprovedFilter setProducts={props.setProducts} />
      <Pagination
        pageIndex={props.pageIndex}
        pageInfo={props.pageInfo}
        handlePagination={props.changePage}
        pageLength={props.tableData.length}
      />
      <MainTable className="w-full rounded-md pt-10 mt-5 overflow-auto">
        <table className="w-max min-w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
          <>
            {!props.status.isError &&
              !props.status.isLoading &&
              props.tableData && (
                <>
                  <thead>
                    <tr className="main-table-header rounded-md grid grid-flow-row grid-cols-9 md:grid-cols-10 auto-cols-min gap-3 px-6">
                      {props.tableHeaderData?.map((item, index) => (
                        <th
                          key={index}
                          className={`text-left  ${
                            hiddenMobile.includes(item.title)
                              ? "hidden md:block"
                              : "block"
                          } ${
                            doubleColumn.includes(item.title) &&
                            "col-span-2 text-left"
                          }`}
                        >
                          <p className="text-xs md:text-sm font-normal font-Regular text-white-text w-full">
                            {item.title}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="main-table-body">
                    {props.tableData?.map((item, index) => {
                      let marketName = getMarketName(item.store_id);
                      let uploadDate = getUploadDate(item.createdAt);
                      let serialNumber =
                        (props.pageIndex - 1) * 20 + (index + 1);

                      return (
                        <tr
                          key={item._id}
                          className="w-full grid grid-flow-row grid-cols-9 md:grid-cols-10 gap-3 auto-cols-min px-6 py-3 cursor-pointer"
                        >
                          <td
                            onClick={() =>
                              handleModal("SHOW_EDIT_MODAL", item._id)
                            }
                            className="text-left text-xs md:text-sm"
                          >
                            {serialNumber}
                          </td>

                          <td
                            onClick={() =>
                              handleModal("SHOW_EDIT_MODAL", item._id)
                            }
                            className="col-span-2"
                          >
                            <p className="text-xs md:text-sm font-normal font-Regular text-left text-white-text break-all">
                              {item.name}
                            </p>
                          </td>
                          <td
                            onClick={() =>
                              handleModal("SHOW_EDIT_MODAL", item._id)
                            }
                            className="col-span-2"
                          >
                            <p className="text-xs md:text-sm font-normal font-Regular text-left text-white-text">
                              {item.category?.name}
                            </p>
                          </td>
                          <td
                            onClick={() =>
                              handleModal("SHOW_EDIT_MODAL", item._id)
                            }
                          >
                            <p className="text-xs md:text-sm font-normal font-Regular text-left text-white-text">
                              N{item.price.toLocaleString()}
                            </p>
                          </td>
                          <td
                            onClick={() =>
                              handleModal("SHOW_EDIT_MODAL", item._id)
                            }
                            className=""
                          >
                            <p className="text-xs md:text-sm font-normal font-Regular text-left text-white-text">
                              {marketName}
                            </p>
                          </td>
                          <td
                            onClick={() =>
                              handleModal("SHOW_EDIT_MODAL", item._id)
                            }
                          >
                            <p className="text-xs md:text-sm font-normal font-Regular text-left text-white-text capitalize">
                              {item.store_id}
                            </p>
                          </td>
                          <td
                            onClick={() =>
                              handleModal("SHOW_EDIT_MODAL", item._id)
                            }
                            className="hidden md:block"
                          >
                            <p className="text-xs md:text-sm font-normal font-Regular text-left text-white-text capitalize">
                              {uploadDate}
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
                                onClick={() =>
                                  props.displayDeleteModal(item._id, item)
                                }
                              >
                                {/* <AiFillCloseCircle className="text-2xl text-secondary-error" />{" "} */}
                                Delete
                              </button>
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              )}
          </>
        </table>
      </MainTable>
    </>
  );
};

export default InventoryTable;

const MainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);

  .grid-cols-13 {
    grid-template-columns: repeat(13, minmax(0, 1fr));
  }

  .main-table-header {
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr {
    min-height: 80px;
    height: fit-content;
    align-items: center;
    justify-content: space-between;
  }
`;
