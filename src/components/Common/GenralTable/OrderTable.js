import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { numberFormat } from "../../../utils/formatPrice";
// import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
// import { useDispatch } from "react-redux";
// import { setSingleOrder } from "../../../redux/actions/orderActions/actions";

const OrderTable = (props) => {
  const navigate = useNavigate();
  const getMarketName = (text) => {
    if (text?.startsWith("CV") | (text === "Computer Village")) return "CV";
    if (text?.startsWith("BM") | (text === "Balogun Market")) return "EM";
    if (text?.startsWith("EM") | (text === "Eko Market")) return "EM";
    if (text?.startsWith("TM") | (text === "Thrindle Mall")) return "TM";

    return "N/A";
  };

  const getUploadDate = (createdAt) => {
    const date = new Date(createdAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  const handleSetSingleOrder = (item) => {
    return navigate(`/orders/${item.order_no}`);
  };

  const openModal = (e, order_no) => {
    props.setModalType(e.currentTarget.textContent);
    props.setActiveID(order_no);
    props.setOpenModal(true);
  };

  return (
    <MainTable className="w-full rounded-md py-10 mt-5 overflow-auto ">
      <table className="w-max max-w-7xl min-w-min lg:max-w-5xl overflow-y-auto">
        <thead
          className={`main-table-header rounded-md grid grid-flow-row auto-cols-min gap-3 px-6 py-2 ${
            props.activeTab === `Pending Orders`
              ? `grid-cols-15`
              : "grid-cols-13"
          }`}
        >
          {props.tableHeaderData?.map((item, index) => (
            <tr
              key={index}
              className={`text-xs md:text-sm font-normal font-Regular text-center text-white-text  ${
                ["Action", "Product Name", "Order No"].includes(item.title) &&
                "col-span-2"
              } 
              `}
            >
              <th className="text-left">{item.title}</th>
            </tr>
          ))}
        </thead>
        <tbody className="main-table-body text-xs md:text-sm">
          {props.tableData?.map((item, index) => {
            let marketName = getMarketName(item?.seller?.store_id);
            let createdAt = getUploadDate(item.createdAt);
            let productName =
              item.product && item.product.name ? item.product.name : "N/A";
            let serialNumber = (props.pageIndex - 1) * 20 + (index + 1);

            return (
              <tr
                key={index}
                className={`text-xs md:text-xs w-full grid grid-flow-row gap-3 auto-cols-min px-6 py-3 cursor-pointer ${
                  props.activeTab === `Pending Orders`
                    ? `grid-cols-15`
                    : "grid-cols-13"
                }`}
              >
                <td>{serialNumber}</td>
                <td>
                  <p
                    className={`status font-Regular capitalize ${
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
                  onClick={() => handleSetSingleOrder(item)}
                  className="col-span-2"
                >
                  <p className="font-normal font-Regular text-white-text ">
                    {item?.order_no}
                  </p>
                </td>
                <td
                  className="col-span-2"
                  onClick={() => handleSetSingleOrder(item)}
                >
                  <p className="font-normal font-Regular text-white-text truncate ...">
                    {productName}
                  </p>
                </td>
                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="font-normal font-Regular text-white-text">
                    N{numberFormat(item?.total_price)}
                  </p>
                </td>
                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="font-normal font-Regular text-white-text">
                    N{numberFormat(item?.product?.original_price)}
                  </p>
                </td>
                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="font-normal font-Regular text-white-text">
                    N{numberFormat(item?.product?.charge)}
                  </p>
                </td>
                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="font-normal font-Regular text-white-text">
                    N{numberFormat(item?.payment?.shippingFee)}
                  </p>
                </td>
                <td>
                  <p className="font-normal font-Regular text-white-text">
                    {item?.quantity}
                  </p>
                </td>

                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="font-normal font-Regular text-white-text">
                    {marketName}
                  </p>
                </td>
                <td onClick={() => handleSetSingleOrder(item)}>
                  <p className="font-normal font-Regular text-left text-white-text">
                    {createdAt}
                  </p>
                </td>
                {props.activeTab === "Pending Orders" && (
                  <td className="col-span-2">
                    <div className="flex flex-start">
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
    /* height: 65px; */
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
    /* text-align: center; */
  }

  tr {
    /* height: 80px; */
    align-items: center;
  }
`;
