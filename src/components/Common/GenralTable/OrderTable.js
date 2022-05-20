import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { numberFormat } from "../../../utils/formatPrice";
// import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
// import { useDispatch } from "react-redux";
// import { setSingleOrder } from "../../../redux/actions/orderActions/actions";

const OrderTable = (props) => {
  const history = useHistory();
  const getMarketName = (storeId) => {
    if (storeId.startsWith("CV")) return "Computer Village";
    if (storeId.startsWith("BM")) return "Eko Market";
    if (storeId.startsWith("EM")) return "Eko Market";
    if (storeId.startsWith("TM")) return "Thrindle Mall";
    return "Other Market";
  };

  const getUploadDate = (updatedAt) => {
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  const handleSetSingleOrder = (item) => {
    return history.push(`/orders/${item._id}`);
  };

  const openModal = (e, order_no) => {
    props.setModalType(e.currentTarget.textContent);
    props.setActiveID(order_no);
    props.setOpenModal(true);
  };

  return (
    <MainTable className="w-full rounded-md py-10 mt-5 overflow-auto ">
      <table className="w-max lg:w-full min-w-min lg:max-w-full overflow-y-auto">
        <thead>
          <tr
            className={`main-table-header rounded-md lg:grid lg:grid-flow-row lg:grid-cols-11 auto-cols-min gap-3 px-6 ${
              props.activeTab === `Pending Orders` && `lg:grid-cols-13`
            }`}
          >
            {props.tableHeaderData?.map((item, index) => (
              <th
                key={index}
                className={`text-sm font-normal font-Regular text-center text-white-text  ${
                  ["Action", "Order No", "Product Name", "Market"].includes(
                    item.title
                  ) && "col-span-2"
                } 
              `}
              >
                {item.title}
              </th>
            ))}
          </tr>
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
            let serialNumber = props.pageIndex * 20 + (index + 1);

            return (
              <tr
                key={index}
                className={`min-w-full w-max lg:w-full flex shrink-0 lg:grid lg:grid-flow-row grid-cols-11 gap-3 auto-cols-min px-6 py-3 cursor-pointer ${
                  props.activeTab === `Pending Orders` && `grid-cols-13`
                }`}
              >
                <td>{serialNumber}</td>
                <td>
                  <p
                    className={`status text-sm font-Regular capitalize ${
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
                    {item?.status}
                  </p>
                </td>
                <td
                  className="col-span-2"
                  onClick={() => handleSetSingleOrder(item)}
                >
                  <p className="text-sm font-normal font-Regular text-white-text ">
                    {item?.order_no}
                  </p>
                </td>
                <td
                  className="col-span-2"
                  onClick={() => handleSetSingleOrder(item)}
                >
                  <p className="text-sm font-normal font-Regular text-white-text">
                    {productName}
                  </p>
                </td>

                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="text-sm font-normal font-Regular text-white-text">
                    N{numberFormat(item?.total_price)}
                  </p>
                </td>
                <td>
                  <p className="text-sm font-normal font-Regular text-white-text">
                    {item?.quantity}
                  </p>
                </td>

                <td
                  className="col-span-2"
                  onClick={() => handleSetSingleOrder(item)}
                >
                  <p className="text-sm font-normal font-Regular text-white-text">
                    {marketName}
                  </p>
                </td>
                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="text-sm font-normal font-Regular text-left text-white-text">
                    {updatedAt}
                  </p>
                </td>
                {props.activeTab === "Pending Orders" && (
                  <td className="col-span-2">
                    <div className="flex justify-center">
                      <p
                        className="product text-xs actionText text-secondary-success font-Regular cursor-pointer"
                        onClick={(e) => openModal(e, item?.order_no)}
                      >
                        Complete
                      </p>
                      <p
                        className="product text-xs actionText text-secondary-error font-Regular cursor-pointer pl-2"
                        onClick={openModal}
                      >
                        Cancel
                      </p>
                    </div>
                  </td>
                )}
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
    height: 65px;
    align-items: center;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  td,
  th {
    padding: 0px !important;
    text-align: center;
  }

  tr {
    height: 80px;
    align-items: center;
  }
`;
