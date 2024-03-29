import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import SingleOrderHeader from "../../components/Orders/SingleOrderHeader";
import OrderDetails from "../../components/Orders/OrderDetails";
import OrderCustomerDetails from "../../components/Orders/OrderCustomerDetails";
import OrderMerchantDetails from "../../components/Orders/OrderMerchantDetails";
import {
  orderDetailsTableHeader,
  orderCustomerDetailsTableHeader,
} from "../../data/data";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";
import axios from "axios";

const SingleOrder = () => {
  const { orderId } = useParams();
  const [singleOrder, setSingleOrder] = useState({});
  const [status, setStatus] = useState({
    isLoading: true,
    isError: false,
    isEmpty: true,
  });

  const getSingleOrder = useCallback(async () => {
    setStatus({ isLoading: true, isEmpty: true, isError: false });
    let url = `orders/getOrder/${orderId}`;

    try {
      const {
        data: { data },
      } = await axiosInstance.get(url);

      const [currentOrder] = data;

      let nextUrls = [
        `delivery/admin/getDeliveries/${currentOrder?.delivery?._id}`,
        `stores/admin/getStoreDetails/${currentOrder?.seller?.store_id}`,
      ];
      let [buyerData, storeData] = await axios.all(
        nextUrls.map(async (endpoint) => {
          try {
            let {
              data: { data },
            } = await axiosInstance.get(endpoint);
            return data;
          } catch (error) {
            if (error.message) {
              throw new Error(error.message);
            } else {
              throw new Error(error);
            }
          }
        })
      );

      setSingleOrder({ ...currentOrder, buyerData, storeData });
      return setStatus({ isLoading: false, isEmpty: false, isError: false });
    } catch (error) {
      setStatus({ isEmpty: false, isLoading: false, isError: true });
      if (error.message) {
        toast.error(error.message);
        throw new Error(error.message);
      } else {
        toast.error("Something went wrong");
        throw new Error(error);
      }
    }
  }, [orderId]);

  useEffect(() => {
    getSingleOrder();
  }, [getSingleOrder]);

  return (
    <MainContainer>
      {status.isError && (
        <div className="text-secondary-error flex justify-center items-center py-16 w-full font-bold text-2xl uppercase">
          Error! Please Reload the Page
        </div>
      )}
      {!status.isError && status.isLoading && (
        <div className="w-full mt-32">
          <NewLoader />
        </div>
      )}
      {!status.isLoading && status.isEmpty && (
        <div className="text-secondary-yellow flex justify-center items-center py-16 w-full font-bold text-2xl ">
          {`ORDER WITH ID OF "${orderId}" DOES NOT EXIST`}
        </div>
      )}
      {!status.isError && !status.isLoading && !status.isEmpty && (
        <div className="flex flex-col gap-12">
          <SingleOrderHeader />
          <div className="grid lg:grid-cols-2 gap-x-24 gap-y-7">
            <OrderDetails
              tableHeader={orderDetailsTableHeader}
              tableData={singleOrder?.product}
              orderInfo={singleOrder}
            />
            <OrderCustomerDetails
              tableHeader={orderCustomerDetailsTableHeader}
              tableData={singleOrder?.buyer}
              buyerData={singleOrder?.buyerData}
            />
            <OrderMerchantDetails storeData={singleOrder?.storeData} />
          </div>
        </div>
      )}
    </MainContainer>
  );
};

export default SingleOrder;
