// import { useParams } from 'react-router-dom';
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import SingleOrderHeader from "../../components/Orders/SingleOrderHeader";
import OrderDetails from "../../components/Orders/OrderDetails";
import OrderCustomerDetails from "../../components/Orders/OrderCustomerDetails";
import OrderMerchantDetails from "../../components/Orders/OrderMerchantDetails";
import {
  orderDetailsTableHeader,
  orderCustomerDetailsTableHeader,
  orderMerchantDetailsTableHeader,
} from "../../data/data";
import { useSelector } from "react-redux";

const SingleOrder = () => {
  const { singleOrder } = useSelector((state) => state.orders);

  let { buyer, seller, product } = singleOrder;

  return (
    <MainContainer>
      <div className="flex flex-col gap-12">
        <SingleOrderHeader />
        <div className="grid lg:grid-cols-2 gap-x-24 gap-y-7">
          <OrderDetails
            tableHeader={orderDetailsTableHeader}
            tableData={product}
            orderInfo={singleOrder}
          />
          <OrderCustomerDetails
            tableHeader={orderCustomerDetailsTableHeader}
            tableData={buyer}
            orderInfo={singleOrder}
          />
          <OrderMerchantDetails
            tableHeader={orderMerchantDetailsTableHeader}
            tableData={seller}
            orderInfo={singleOrder}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default SingleOrder;
