import { useCallback, useEffect, useState } from "react";
import Wrapper from "./OrderDetailsGeneralWrapper";
import Header from "./OrderDetailsGeneralHeader";
import axiosInstance from "../../utils/axiosInstance";
import styled from "styled-components";

const OrderMerchantDetails = ({ tableHeader, tableData }) => {
  const [storeData, setStoreData] = useState({ store_address: "" });

  const getMarketName = (storeId) => {
    if (!storeId) return "N/A";
    if (storeId.trim().startsWith("CV")) return "Computer Village";
    if (storeId.trim().startsWith("BM")) return "Eko Market";
    if (storeId.trim().startsWith("EM")) return "Eko Market";
    return "Other Market";
  };

  const getStoreAddress = useCallback(async () => {
    try {
      let {
        data: { data },
      } = await axiosInstance.get(
        `stores/admin/getStoreDetails/${tableData?.store_id}`
      );
      setStoreData(data);
    } catch (error) {
      setStoreData({ store_address: "N/A" });
      throw new Error(error);
    }
  }, [tableData.store_id]);

  useEffect(() => {
    getStoreAddress();
  }, [getStoreAddress]);

  return (
    <Wrapper>
      <Header title={"Merchant's Details"} />
      <SingleOrderTable className="table-wrapper">
        <thead className="body-wrapper">
          {tableHeader.map((item, index) => {
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
            <td>{getMarketName(tableData?.store_id)}</td>
          </tr>
          <tr>
            <td>{tableData?.phone}</td>
          </tr>
          <tr className="capitalize">
            <td>{storeData.store_address}</td>
          </tr>
          <tr>
            <td>{tableData?.store_id}</td>
          </tr>
        </tbody>
      </SingleOrderTable>
    </Wrapper>
  );
};

export default OrderMerchantDetails;

const SingleOrderTable = styled.table`
  .body-wrapper {
    display: grid;
    grid-template-rows: repeat(5, minmax(0, 2.5rem));
    gap: 0.5rem;
  }
`;
