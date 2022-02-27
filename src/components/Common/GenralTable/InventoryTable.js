import styled from "styled-components";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
import { FaEllipsisH } from "react-icons/fa";
const InventoryTable = (props) => {
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
          {props.tableData?.map((item, index) => (
            <tr key={index} className='w-full flex flex-row'>
              {props.showCheck && (
                <td>
                  <GeneralCheckBox />
                </td>
              )}
              <td>
                <p
                  className={`status text-left text-sm font-Regular capitalize ${
                    item.status === "approved"
                      ? "text-primary-dark"
                      : "text-secondary-yellow"
                  }`}
                >
                  {item.status}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.title}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.category}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  N{item.price.toLocaleString()}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.market}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text capitalize'>
                  {item.store}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text capitalize'>
                  {item.uploadDate}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text capitalize'>
                  <FaEllipsisH className='text-base text-primary-dark' />
                </p>
              </td>
            </tr>
          ))}
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
