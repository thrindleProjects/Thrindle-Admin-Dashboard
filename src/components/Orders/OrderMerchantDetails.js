import Wrapper from "./OrderDetailsGeneralWrapper";
import Header from "./OrderDetailsGeneralHeader";

const OrderMerchantDetails = ({ storeData }) => {
  const getMarketName = (storeId) => {
    if (!storeId) return "N/A";
    if (storeId.trim().startsWith("CV")) return "Computer Village";
    if (storeId.trim().startsWith("BM")) return "Eko Market";
    if (storeId.trim().startsWith("EM")) return "Eko Market";
    return "Other Market";
  };

  return (
    <Wrapper>
      <Header title={"Merchant's Details"} />

      <div className="w-4/5 mx-auto my-4">
        <div className="flex gap-2 justify-between my-2">
          <div> Name</div>
          <div>{storeData?.owner_id?.name}</div>
        </div>
        <div className="flex gap-2 justify-between my-2">
          <div> Market</div>
          <div>{getMarketName(storeData?.store_id)}</div>
        </div>
        <div className="flex gap-2 justify-between my-2">
          <div>Phone</div>
          <div>{storeData?.owner_id?.phone}</div>
        </div>
        <div className="flex gap-2 justify-between my-2">
          <div>Store Address</div>
          <div className="capitalize text-right">{storeData.store_address}</div>
        </div>
        <div className="flex gap-2 justify-between my-2">
          <div>Store Name</div>
          <div>{storeData.store_name}</div>
        </div>
        <div className="flex gap-2 justify-between my-2">
          <div>Store ID</div>
          <div>{storeData?.store_id}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderMerchantDetails;

// const SingleOrderTable = styled.div`
//   .body-wrapper {
//     /* display: grid;
//     gap: 0.5rem; */
//   }
// `;

/* <div>
          {tableHeader.map((item, index) => {
            return (
              <div
                key={index}
                // className={`font-medium ${
                //   item?.title === "Address" ? "row-span-2" : ""
                // }`}
              >
                {item?.title}
              </div>
            );
          })}
        </div> */
