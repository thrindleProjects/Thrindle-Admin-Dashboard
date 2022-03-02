import styled from "styled-components";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
import { FaEllipsisH } from "react-icons/fa";

const InventoryTable = (props) => {
  const handleModal = (id) => {
    return props.setModal(true, id);
  };

  const getMarketName = (storeId) => {
    if (storeId.startsWith("CV")) return "Computer Village";
    if (storeId.startsWith("BM")) return "Balogun Market";
    if (storeId.startsWith("EM")) return "Eko Market";
    return "Other Market";
  };

  const getUploadDate = (updatedAt) => {
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  return (
    <MainTable className='w-full rounded-md  py-10 mt-5 overflow-auto'>
      <table className='w-full'>
        <thead className='main-table-header  rounded-md flex flex-row'>
          {props.showCheck && (
            <th>
              <GeneralCheckBox />
            </th>
          )}
          {props.tableHeaderData?.map((item, index) => (
            <th key={index}>
              <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                {item.title}
              </p>
            </th>
          ))}
        </thead>
        <tbody className='main-table-body'>
          {props.tableData?.map((item) => {
            let marketName = getMarketName(item.store_id);
            let uploadDate = getUploadDate(item.updatedAt);
            return (
              <tr key={item._id} className='w-full flex flex-row'>
                {props.showCheck && (
                  <td>
                    <GeneralCheckBox />
                  </td>
                )}
                <td>
                  <p
                    className={`status text-left text-sm font-Regular capitalize ${
                      item.verified
                        ? "text-primary-dark"
                        : "text-secondary-yellow"
                    }`}
                  >
                    {item.verified ? "Approved" : "Pending"}
                  </p>
                </td>
                <td>
                  <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                    {item.name}
                  </p>
                </td>
                <td>
                  <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                    {item.category?.name}
                  </p>
                </td>
                <td>
                  <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                    N{item.price.toLocaleString()}
                  </p>
                </td>
                <td>
                  <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                    {marketName}
                  </p>
                </td>
                <td>
                  <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text capitalize'>
                    {item.store_id}
                  </p>
                </td>
                <td>
                  <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text capitalize'>
                    {uploadDate}
                  </p>
                </td>
                <td onClick={() => handleModal(item._id)}>
                  <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text capitalize cursor-pointer'>
                    <FaEllipsisH className='text-base text-primary-dark' />
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MainTable>
  );
};

export default InventoryTable;

const MainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  .main-table-header {
    width: 100%;
    padding: 0px 15px !important;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }
  tr:nth-child(even) {
    background-color: #fafafa;
  }
  tr td {
    padding: 0px 15px !important;
    text-align: left;
  }
  tr {
    height: 50px;
    align-items: center;
    justify-content: space-between;
  }
`;
