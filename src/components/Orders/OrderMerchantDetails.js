import Wrapper from './OrderDetailsGeneralWrapper';
import Header from './OrderDetailsGeneralHeader';
const OrderMerchantDetails = ({ tableHeader, tableData }) => {
  return (
    <Wrapper>
      <Header title={"Merchant's Details"} />
      <tbody className='table-wrapper'>
        <thead className='body-wrapper'>
          {tableHeader.map((item, index) => {
            return (
              <tr key={index} className={`font-medium`}>
                <th>{item.title}</th>
              </tr>
            );
          })}
        </thead>
        <tbody className='body-wrapper'>
          <tr>
            <td>{tableData.name}</td>
          </tr>
          <tr>
            <td>{tableData.market}</td>
          </tr>
          <tr>
            <td>{tableData.phone}</td>
          </tr>
          <tr>
            <td>{tableData.address}</td>
          </tr>
          <tr>
            <td>{tableData.country}</td>
          </tr>
          <tr>
            <td>{tableData.city}</td>
          </tr>
          <tr>
            <td>{tableData.store_id}</td>
          </tr>
        </tbody>
      </tbody>
    </Wrapper>
  );
};

export default OrderMerchantDetails;
