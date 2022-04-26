import React from "react";

const SelectedSizes = ({ sizes, removeSize }) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {sizes.map((item, index) => {
        return (
          <span
            key={index}
            className="bg-primary-light mr-1 px-1 py-0.5 rounded-lg text-xs text-white-main flex flex-nowrap items-center"
          >
            <span className="align-middle border-r pr-1 py-1 pl-1">{item}</span>
            <svg
              className="inline-block align-middle w-4 h-4 pl-1 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => removeSize(item)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
};

export default SelectedSizes;
