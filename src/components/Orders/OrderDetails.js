import Wrapper from './OrderDetailsGeneralWrapper';
import Header from './OrderDetailsGeneralHeader';

const OrderDetails = ({ tableHeader, tableData }) => {
  return (
    <Wrapper>
      <Header title={'Order'} />
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
            <td>{tableData._id}</td>
          </tr>
          <tr>
            <td>{tableData.title}</td>
          </tr>
          <tr>
            <td>{tableData.total_price}</td>
          </tr>
          <tr>
            <td>{tableData.created_at}</td>
          </tr>
          <tr>
            <td>{tableData.method}</td>
          </tr>
          <tr>
            <td
              className={`${
                tableData.status === 'Pending' && 'text-secondary-yellow'
              } ${tableData.status === 'Cancelled' && 'text-secondary-error'} ${
                tableData.status === 'Delivered Orders' &&
                'text-secondary-success'
              }`}
            >
              {tableData.status}
            </td>
          </tr>
          <tr>
            <td>{tableData.pay_status}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default OrderDetails;
