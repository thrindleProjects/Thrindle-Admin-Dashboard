import React from "react";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
// import { FaEllipsisH } from "react-icons/fa";
import { NewMainTable } from "../../../styles/globalStyles";
import { useHistory } from "react-router-dom";

const StoreTable = (props) => {
  const history = useHistory();
  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = date.slice(0, 4);
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    return `${months[month - 1]} ${day}, ${year}`;
  };

  return (
    <NewMainTable className="w-full rounded-md  py-10 mt-5 overflow-auto">
      <table className="w-full">
        <thead className="main-table-header rounded-md">
          <tr className="grid grid-cols-7">
            <th>
              <></>
            </th>

            {props.tableHeaderData?.map((item, index) => (
              <th
                key={index}
                className="table-head-text text-sm font-normal font-Regular text-center text-white-text"
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="main-table-body">
          {props.tableData?.map((item, index) => (
            <tr
              key={index}
              className="w-full grid grid-cols-7 cursor-pointer"
              onClick={() => history.push("/store-details")}
            >
              {props.showCheck && (
                <td>
                  <GeneralCheckBox />
                </td>
              )}
              <td>
                <p className="status text-center text-sm text-white-text font-Regular capitalize">
                  {index + 1}
                </p>
              </td>
              <td>
                <p className="status text-center text-sm text-white-text font-Regular capitalize">
                  {item.store_name}
                </p>
              </td>

              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.store_categories[0]?.name || (
                    <span className="text-sm text-secondary-error font-Regular cursor-pointer">
                      Not specified
                    </span>
                  )}
                </p>
              </td>

              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {item.store_id.startsWith("EM") && <span>Eko Market</span>}
                  {item.store_id.startsWith("BM") && (
                    <span>Balogun Market</span>
                  )}
                  {item.store_id.startsWith("CV") && (
                    <span>Computer Village</span>
                  )}
                </p>
              </td>

              <td>
                <p className="product text-center text-sm text-white-text font-Regular">
                  {formatDate(item.createdAt)}
                </p>
              </td>

              <td>
                <div className="w-full flex justify-center">
                  <p className="product text-xs actionText text-secondary-success font-Regular cursor-pointer">
                    Approve
                  </p>
                  <p className="product text-xs actionText text-secondary-error font-Regular cursor-pointer pl-2">
                    Decline
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </NewMainTable>
  );
};

export default StoreTable;
