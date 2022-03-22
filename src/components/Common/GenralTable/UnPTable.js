import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

const UnPTable = (props) => {
  return (
    <MainTable className='w-full rounded-md py-10 mt-5 overflow-auto'>
      <table className='w-full min-w-min max-w-full'>
        <thead className='main-table-header rounded-md grid grid-flow-row grid-cols-10 auto-cols-min gap-3 px-6'>
          {props.tableHeaderData?.map((item, index) => (
            <tr
              key={index}
              className={`${
                ["Name", "E-mail Address", "Action"].includes(item.title) &&
                "col-span-2"
              }`}
            >
              <th>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.title}
                </p>
              </th>
            </tr>
          ))}
        </thead>
        <tbody className='main-table-body'>
          {props.tableData?.map((item, index) => (
            <tr
              key={index}
              className='w-full grid grid-flow-row grid-cols-10 gap-3 auto-cols-10 px-6 py-3'
            >
              <td className='col-span-2'>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.name}
                </p>
              </td>
              <td className={`col-span-2`}>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.email}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.role}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.permission}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.phoneNumber}
                </p>
              </td>
              <td>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text'>
                  {item.status}
                </p>
              </td>
              <td className='col-span-2'>
                <p className='table-head-text text-sm font-normal font-Regular text-left text-white-text flex flex-row gap-8'>
                  <button className='cursor-pointer flex flex-row gap-2 items-center' onClick={() => props.handleSetModal(`SHOW_EDIT_USER`)}>
                    <MdEdit className='text-2xl text-primary-dark' /> Edit
                  </button>
                  <button className='cursor-pointer flex flex-row gap-2 items-center' onClick={() => props.handleSetModal(`SHOW_DELETE_USER`)}>
                    <AiFillCloseCircle className='text-2xl text-secondary-error' />{" "}
                    Delete
                  </button>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainTable>
  );
};

export default UnPTable;

const MainTable = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  .main-table-header {
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f4f4f4;
    border-top: 1.5px solid #f4f4f4;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }
  tr td {
    padding: 0px !important;
    text-align: center;
  }
  tr {
    height: max-content;
    align-items: center;
    justify-content: space-between;
  }
`;
