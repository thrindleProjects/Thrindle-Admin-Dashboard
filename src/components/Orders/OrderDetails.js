import Wrapper from "./OrderDetailsGeneralWrapper";
import Header from "./OrderDetailsGeneralHeader";

const OrderDetails = ({ tableHeader, tableData, orderInfo }) => {
  const getUploadDate = (updatedAt) => {
    if (!updatedAt) return "N/A";
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  console.log(orderInfo);

  return (
    <Wrapper>
      <Header title={"Order"} />
      <table className="table-wrapper">
        <thead className="body-wrapper">
          {tableHeader.map((item, index) => {
            return (
              <tr key={index} className={`font-medium`}>
                <th>{item.title}</th>
              </tr>
            );
          })}
        </thead>
        <tbody className="body-wrapper">
          <tr>
            <td>{orderInfo?._id}</td>
          </tr>
          <tr>
            <td>{orderInfo.order_no ? orderInfo.order_no : "N/A"}</td>
          </tr>
          <tr>
            <td>{tableData.name ? tableData.name : "N/A"} </td>
          </tr>
          <tr>
            <td>{tableData.description ? tableData.description : "N/A"}</td>
          </tr>
          <tr>
            <td>{tableData.price ? tableData.price : "N/A"}</td>
          </tr>
          <tr>
            <td>{orderInfo.quantity ? orderInfo.quantity : "N/A"}</td>
          </tr>
          <tr>
            <td>{orderInfo.weight ? orderInfo.weight : "N/A"}</td>
          </tr>
          <tr>
            <td>{getUploadDate(orderInfo.createdAt)}</td>
          </tr>
          <tr>
            <td>{orderInfo?.payment?.verifiedTransaction?.card?.type}</td>
          </tr>
          <tr>
            <td
              className={`capitalize ${
                orderInfo.status === "pending" && "text-secondary-yellow"
              } ${orderInfo.status === "cancelled" && "text-secondary-error"} ${
                orderInfo.status === "completed" && "text-secondary-success"
              }`}
            >
              {orderInfo?.status}
            </td>
          </tr>
          <tr>
            <td
              className={`capitalize ${
                orderInfo?.payment?.status === "pending" &&
                "text-secondary-yellow"
              } ${
                orderInfo?.payment?.status === "failed" &&
                "text-secondary-error"
              } ${
                orderInfo?.payment?.status === "success" &&
                "text-secondary-success"
              }`}
            >
              {orderInfo?.payment?.status}
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default OrderDetails;
