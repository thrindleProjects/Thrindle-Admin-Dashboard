import React from "react";

const SelectedSizes = ({ sizes, removeSize }) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {sizes.map((item, index) => {
        return (
          <div
            key={index}
            className="w-fit bg-white-dim rounded-md p-3 cursor-pointer"
            onClick={() => removeSize(item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default SelectedSizes;
