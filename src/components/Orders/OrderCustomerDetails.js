import { useCallback, useEffect, useState } from "react";
import Wrapper from "./OrderDetailsGeneralWrapper";
import Header from "./OrderDetailsGeneralHeader";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInstance";

const OrderCustomerDetails = ({ tableHeader, tableData, orderInfo }) => {
  const [buyerData, setBuyerData] = useState({ address: "" });

  const getBuyerData = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(
        `delivery/admin/getDeliveries/${orderInfo.delivery._id}`
      );
      console.log(data);
      setBuyerData(data.shipping);
    } catch (error) {
      setBuyerData({ address: "N/A" });
      throw new Error(error);
    }
  }, [orderInfo.delivery._id]);

  useEffect(() => {
    getBuyerData();
  }, [getBuyerData]);

  return (
    <Wrapper>
      <Header title="Customer's Details" />
      <SingleOrderTable className="table-wrapper">
        <thead className="body-wrapper">
          {tableHeader?.map((item, index) => {
            return (
              <tr key={index} className={`font-medium`}>
                <th>{item?.title}</th>
              </tr>
            );
          })}
        </thead>
        <tbody className="body-wrapper">
          <tr>
            <td>{tableData?.name}</td>
          </tr>
          <tr>
            <td>{tableData?.email}</td>
          </tr>
          <tr>
            <td>{tableData?.phone}</td>
          </tr>
          <tr>
            <td>{buyerData.address}</td>
          </tr>
        </tbody>
      </SingleOrderTable>
    </Wrapper>
  );
};

export default OrderCustomerDetails;

const SingleOrderTable = styled.table`
  .body-wrapper {
    display: grid;
    grid-template-rows: repeat(4, minmax(0, 2.5rem));
    gap: 0.5rem;
  }
`;
