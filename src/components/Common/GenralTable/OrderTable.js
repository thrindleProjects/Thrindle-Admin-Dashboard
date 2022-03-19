import { useHistory } from "react-router-dom";
import styled from "styled-components";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";

const OrderTable = (props) => {
  const history = useHistory();

  const getMarketName = (storeId) => {
    if (storeId.startsWith("CV")) return "Computer Village";
    if (storeId.startsWith("BM")) return "Eko Market";
    if (storeId.startsWith("EM")) return "Eko Market";
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
    <MainTable className="w-full rounded-md py-10 mt-5 overflow-auto ">
      <table className="w-full min-w-min max-w-full">
        <thead className="main-table-header rounded-md grid grid-flow-row grid-cols-9 auto-cols-min gap-3 px-6">
          {props.tableHeaderData?.map((item, index) => (
            <tr
              key={index}
              className={`${["Action"].includes(item.title) && "col-span-2"} ${
                index === 0 && "col-start-2"
              }`}
            >
              <th>
                <p className="table-head-text text-sm font-normal font-Regular text-center text-white-text">
                  {item.title}
                </p>
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="main-table-body">
          {props.tableData?.map((item, index) => {
            let storeId =
              item.product && item.product.store_id
                ? item.product.store_id
                : "N/A";
            let marketName = getMarketName(storeId);
            let updatedAt = getUploadDate(item.updatedAt);
            let productName =
              item.product && item.product.name ? item.product.name : "N/A";

            console.log(item);

            return (
              <tr
                key={index}
                className="w-full grid grid-flow-row grid-cols-9 gap-3 auto-cols-min px-6 py-3 cursor-pointer"
                onClick={() => history.push(`/orders/${item._id}`)}
              >
                <td>
                  <GeneralCheckBox />
                </td>
                <td>
                  <p
                    className={`status text-left text-sm font-Regular capitalize ${
                      props.activeTab === "Pending Orders" &&
                      "text-secondary-yellow"
                    } ${
                      props.activeTab === "Cancelled Orders" &&
                      "text-secondary-error"
                    } ${
                      props.activeTab === "Delivered Orders" &&
                      "text-secondary-success"
                    }`}
                  >
                    {item.status}
                  </p>
                </td>
                <td>
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {item._id.substring(0, 5)}...
                  </p>
                </td>
                <td>
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {productName}
                  </p>
                </td>
                <td>
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {item.product && item.product.price
                      ? item.product.price
                      : "N/A"}
                  </p>
                </td>
                <td>
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {item.quantity}
                  </p>
                </td>
                <td>
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {item.total_price}
                  </p>
                </td>
                <td>
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {marketName}
                  </p>
                </td>
                <td>
                  <p className="table-head-text text-sm font-normal font-Regular text-left text-white-text">
                    {updatedAt}
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

export default OrderTable;

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
