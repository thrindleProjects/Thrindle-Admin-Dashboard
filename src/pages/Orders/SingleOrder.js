// import { useParams } from 'react-router-dom';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import SingleOrderHeader from '../../components/Orders/SingleOrderHeader';
import OrderDetails from '../../components/Orders/OrderDetails';
import OrderCustomerDetails from '../../components/Orders/OrderCustomerDetails';
import OrderMerchantDetails from '../../components/Orders/OrderMerchantDetails';
import {
  orderDetailsTableHeader,
  orderDetailsTableData,
  orderCustomerDetailsTableHeader,
  orderCustomerDetailsTableData,
  orderMerchantDetailsTableHeader,
  orderMerchantDetailsTableData,
} from '../../data/data';

const SingleOrder = () => {
  // let { orderId } = useParams();

  return (
    <MainContainer>
      <div className='flex flex-col gap-12'>
        <SingleOrderHeader />
        <div className='grid grid-cols-2 gap-x-24 gap-y-7'>
          <OrderDetails
            tableHeader={orderDetailsTableHeader}
            tableData={orderDetailsTableData}
          />
          <OrderCustomerDetails
            tableHeader={orderCustomerDetailsTableHeader}
            tableData={orderCustomerDetailsTableData}
          />
          <OrderMerchantDetails
            tableHeader={orderMerchantDetailsTableHeader}
            tableData={orderMerchantDetailsTableData}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default SingleOrder;
