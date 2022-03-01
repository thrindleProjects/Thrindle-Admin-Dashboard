import React from "react";
import { CancelImage } from "../../assets/svg/cancelImage";
import { PlusImage } from "../../assets/svg/plusImage";

function DisplayImages({ imageList, onChange, deleteImage }) {
  return (
    <div className="flex justify-between gap-2 w-full overflow-x-scroll pb-4 lg:grid lg:rounded-md lg:grid-cols-3 lg:grid-rows-2 lg:overflow-x-visible">
      {imageList?.map((image, index) => (
        <div
          className="relative min-w-[48%] h-[150px] border-[0.98px] border-primary-main bg-white-main px-4 py-5 rounded-xl md:h-[300px] md:py-8 lg:min-w-0 lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px]"
          key={index}
        >
          <span
            className="absolute right-0.5 top-1 md:top-2.5 md:right-1.5 cursor-pointer"
            onClick={() => deleteImage(index)}
          >
            {CancelImage}
          </span>
          <img
            src={URL.createObjectURL(image)}
            onLoad={URL.revokeObjectURL(image)}
            key={index}
            className="w-[90%] h-[100%] mx-auto rounded-xl"
            alt="uploads"
          />
        </div>
      ))}

      {imageList.length < 6 ? (
        <div className="relative min-w-[48%] shadow-md rounded-2xl lg:min-w-0 lg:w-[150px] xl:w-[200px] xl:h-[200px]">
          <span className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
            {PlusImage}
          </span>
          <input
            type="file"
            className="relative top-[50%] -translate-y-2/4 w-full z-10 opacity-0 w-full h-full"
            onChange={onChange}
          />
        </div>
      ) : null}
    </div>
  );
}

export default DisplayImages;
