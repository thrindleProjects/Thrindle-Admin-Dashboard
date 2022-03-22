import Wrapper from './OrderDetailsGeneralWrapper';
import Header from './OrderDetailsGeneralHeader';

const OrderCustomerDetails = ({ tableHeader, tableData }) => {
  
  return (
    <Wrapper>
      <Header title="Customer's Details" />
      <table className='table-wrapper'>
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
            <td>{tableData.email}</td>
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
            <td>{tableData.postal_code}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default OrderCustomerDetails;
