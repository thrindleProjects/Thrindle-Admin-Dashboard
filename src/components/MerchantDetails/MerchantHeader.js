import React from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";

function MerchantHeader({ text, backBtn }) {
  const history = useHistory();
  return (
    <div className="flex items-center bg-secondary-header text-white-main my-2 py-2 pl-2 rounded-t-md">
      {backBtn && (
        <button
          className="border border-white-main px-3 py-2 rounded-sm cursor-pointer"
          onClick={() => history.go(-1)}
        >
          <HiOutlineArrowNarrowLeft className="inline mr-1 align-middle" />
          <span className="align-middle">Back</span>
        </button>
      )}
      <p className="ml-4">{text}</p>
    </div>
  );
}

export default MerchantHeader;
// border-radius: 5px 5px 0px 0px;
