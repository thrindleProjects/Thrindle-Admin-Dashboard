import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VerifySellerModal from "../../Sellers/VerifySellerModal";
import formatDate from "../../../utils/formatDate";

const SellerTable = (props) => {
  const [modal, setModal] = useState({ isActive: false, modalData: {} });
  console.log(props.tableData);
  const handleModal = (action, payload) => {
    switch (action) {
      case "SHOW_MODAL":
        setModal({ ...modal, isActive: true, modalData: payload });
        break;
      case "HIDE_MODAL":
        setModal({ ...modal, isActive: false });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {modal.isActive && (
        <VerifySellerModal
          modalData={modal.modalData}
          handleModal={handleModal}
          handleGetCustomers={props.handleGetCustomers}
        />
      )}
      <MainTable className="w-full rounded-md py-10 mt-5 overflow-auto">
        <table className="w-full min-w-min max-w-full">
          <thead>
            <tr className="main-table-header rounded-md grid gap-3 grid-cols-9 px-6">
              {props.tableHeaderData?.map((item, index) => (
                <th
                  key={index}
                  className={`${
                    ["Seller's Name"].includes(item.title) ? "col-span-2" : ""
                  }`}
                >
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {item.title}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="main-table-body">
            {props.tableData?.map((item, index) => {
              let serialNumber = props.pageIndex * 20 + (index + 1);

              return (
                <tr
                  key={item._id}
                  className="w-full grid grid-flow-row grid-cols-9 gap-3 px-6 py-3 "
                >
                  <td>
                    <p className="capitalize status text-left text-sm text-white-text font-Regular">
                      {serialNumber}
                    </p>
                  </td>

                  <td className="col-span-2">
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
                    <p
                      className={`product text-left text-sm ${
                        item.status === "verified"
                          ? "text-secondary-success"
                          : "text-secondary-error"
                      } font-Regular`}
                    >
                      {item.status === "verified" ? "Verified" : "Unverified"}
                    </p>
                  </td>
                  <td>
                    <p className="product text-left text-sm text-white-text font-Regular">
                      {item.store_id ? (
                        <Link to={`/store-details/${item.store_id}`}>
                          {item.store_id}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </td>
                  <td>
                    <p className="product text-left text-sm text-white-text font-Regular">
                      {formatDate(item.createdAt)}
                    </p>
                  </td>
                  <td>
                    <p className="product text-left text-sm text-white-text font-Regular">
                      {formatDate(item.updatedAt)}
                    </p>
                  </td>
                  <td>
                    <p className="product text-center text-sm text-white-text font-Regular">
                      {!item.phone_verified || item.status === "unverified" ? (
                        <button
                          className="verify-btn bg-primary-main py-2 px-4 rounded-md text-white-main"
                          onClick={() => handleModal("SHOW_MODAL", item)}
                        >
                          Verify
                        </button>
                      ) : (
                        <span className="text-secondary-success">
                          No Actions Available
                        </span>
                      )}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </MainTable>
    </>
  );
};

export default SellerTable;

const MainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);

  .main-table-header {
    width: 100%;
    height: 50px;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  td {
    height: 50px;
  }

  td,
  th {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
