import { useEffect, useState } from "react";
import Wrapper from "./OrderDetailsGeneralWrapper";
import Header from "./OrderDetailsGeneralHeader";
import styled from "styled-components";

const OrderDetails = ({ tableHeader, tableData, orderInfo }) => {
  const [orderDetails, setOrderDetails] = useState({ size: "", color: "" });
  const [activeImage, setActiveImage] = useState("");

  const getUploadDate = (updatedAt) => {
    if (!updatedAt) return "N/A";
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  useEffect(() => {
    if (orderInfo && orderInfo?.payment && orderInfo?.payment?.priceDetails) {
      let newDetails = orderInfo.payment.priceDetails.find(
        (item) => item?.productId === tableData?._id
      );
      let size =
        newDetails?.size && newDetails.size.length > 0
          ? newDetails.size
          : "N/A";
      let color =
        newDetails?.color && newDetails.color.length > 0
          ? newDetails.color
          : "N/A";
      // set active image as the first item in the array of tableData?.images
      setActiveImage(tableData?.images[0]);
      return setOrderDetails({ size, color });
    }
    return setOrderDetails({ size: "N/A", color: "N/A" });
  }, [orderInfo, tableData]);

  return (
    <Wrapper>
      <Header title={"Order"} />

      <div className="flex items-center justify-center h-40 mt-4">
        <img
          src={`https://api.thrindle.com/api/thrindle/images/${activeImage}`}
          alt="Product"
          className="big-img h-full shadow rounded-md"
        />
      </div>
      {tableData?.images?.length > 1 && (
        <div className="w-full px-2 mt-2 flex flex-row justify-center">
          <div className="w-full px-4 flex gap-2 pb-4 overflow-x-auto">
            {tableData.images.map((image, index) => (
              <div
                key={index}
                className="h-20 flex-shrink-0 overflow-hidden rounded-md shadow-md cursor-pointer"
                onClick={() => setActiveImage(image)}
              >
                <img
                  src={`https://api.thrindle.com/api/thrindle/images/${image}`}
                  alt="Product"
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <SingleOrderTable className="table-wrapper">
        <thead className="body-wrapper">
          {tableHeader.map((item, index) => {
            return (
              <tr
                key={index}
                className={`font-medium ${
                  item?.title === "Description" ? "row-span-2" : ""
                }`}
              >
                <th>{item?.title}</th>
              </tr>
            );
          })}
        </thead>
        <tbody className="body-wrapper">
          <tr>
            <td>{orderInfo?.order_no ? orderInfo?.order_no : "N/A"}</td>
          </tr>
          <tr>
            <td>{tableData?.name ? tableData?.name : "N/A"} </td>
          </tr>
          <tr className="row-span-2 h-full overflow-y-auto">
            <td>{tableData?.description ? tableData?.description : "N/A"}</td>
          </tr>
          <tr>
            <td>
              {tableData?.price
                ? `N${tableData?.price?.toLocaleString()}`
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              {tableData?.price
                ? `N${orderInfo?.product?.original_price?.toLocaleString()}`
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              {tableData?.price
                ? `N${orderInfo?.product?.charge?.toLocaleString()}`
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>
              {tableData?.price
                ? `N${orderInfo?.payment?.shippingFee?.toLocaleString()}`
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td>{orderInfo?.quantity ? orderInfo?.quantity : "N/A"}</td>
          </tr>
          <tr>
            <td>{orderDetails.size}</td>
          </tr>
          <tr>
            <td>{orderDetails.color}</td>
          </tr>
          <tr>
            <td>{orderInfo?.weight ? orderInfo?.weight : "N/A"}</td>
          </tr>
          <tr>
            <td>{getUploadDate(orderInfo?.createdAt)}</td>
          </tr>
          <tr className="capitalize">
            <td>
              {orderInfo?.payment?.verifiedTransaction?.data?.payment_type
                ? orderInfo?.payment?.verifiedTransaction?.data?.payment_type
                : "N/A"}
            </td>
          </tr>
          <tr>
            <td
              className={`capitalize ${
                orderInfo?.status === "pending" && "text-secondary-yellow"
              } ${
                orderInfo?.status === "cancelled" && "text-secondary-error"
              } ${
                orderInfo?.status === "completed" && "text-secondary-success"
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
      </SingleOrderTable>
    </Wrapper>
  );
};

export default OrderDetails;

const SingleOrderTable = styled.table`
  .body-wrapper {
    display: grid;
    grid-template-rows: repeat(5, 2rem);
    gap: 0.5rem;
  }
`;
