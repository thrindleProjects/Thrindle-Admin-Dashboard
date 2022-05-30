import React from "react";
import { IoAddSharp } from "react-icons/io5";

const BigAddImageIcon = ({ handleImageUpload }) => {
  return (
    <div className="w-24 h-full bg-primary-main text-white-main text-4xl font-black rounded-md">
      <input
        type="file"
        name="image"
        id="image"
        onChange={handleImageUpload}
        multiple
        className="hidden"
      />
      <label
        htmlFor="image"
        className="cursor-pointer h-full w-full flex items-center justify-center"
      >
        <IoAddSharp />
      </label>
    </div>
  );
};

export default BigAddImageIcon;
