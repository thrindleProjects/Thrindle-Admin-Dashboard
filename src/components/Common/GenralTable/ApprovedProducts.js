import React from "react";
import { Link } from "react-router-dom";
import GeneralCheckBox from "../GeneralCheck/GeneralCheckBox";
import formatDate from "../../../utils/formatDate";
import { NewMainTable } from "../../../styles/globalStyles";

function ApprovedProducts(props) {
  return (
    <NewMainTable className="w-full rounded-md  py-10 mt-5 overflow-auto">
      <table className="w-full">
        <thead className="main-table-header rounded-md">
          <tr className="grid grid-cols-9">
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
          {props.tableData?.map((item, index) =>  (
            <tr key={index} className="w-full grid grid-cols-9 cursor-pointer">
              {props.showCheck && (
                <td>
                  <GeneralCheckBox />
                </td>
              )}
              <td>
                <Link>
                  <p className="status text-center text-sm text-white-text font-Regular capitalize">
                    {index + 1}
                  </p>
                </Link>
              </td>
              <td>
                <Link>
                  <p className="status text-center text-sm text-white-text font-Regular capitalize">
                    {item.store_name}
                  </p>
                </Link>
              </td>

              <td>
                <Link>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    {item.store_categories[0]?.name || (
                      <span className="text-sm text-secondary-error font-Regular cursor-pointer">
                        Not specified
                      </span>
                    )}
                  </p>
                </Link>
              </td>

              <td>
                <Link>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    {item.store_id.startsWith("EM") && <span>Eko Market</span>}
                    {item.store_id.startsWith("BM") && (
                      <span>Balogun Market</span>
                    )}
                    {item.store_id.startsWith("CV") && (
                      <span>Computer Village</span>
                    )}
                  </p>
                </Link>
              </td>

              <td>
                <Link>
                  <p className="product text-center text-sm text-white-text font-Regular">
                    {formatDate(item.createdAt)}
                  </p>
                </Link>
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
}

export default ApprovedProducts;
