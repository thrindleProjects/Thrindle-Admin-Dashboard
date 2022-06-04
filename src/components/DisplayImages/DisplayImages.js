import React from "react";
import styled from "styled-components";
import { CancelImage } from "../../assets/svg/cancelImage";
import { PlusImage } from "../../assets/svg/plusImage";

const Span = styled.label`
  /* position: absolute; */
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
`;

function DisplayImages({ imageList, onChange, deleteImage }) {
  return (
    <div className="flex justify-between gap-2 w-full overflow-x-scroll pb-4 lg:grid lg:rounded-md lg:grid-cols-3 lg:grid-rows-2 lg:overflow-x-visible">
      {imageList?.map((image, index) => (
        <div
          className="relative min-w-48 h-40 border-0.98 border-primary-main bg-white-main px-4 py-5 rounded-xl md:h-72 md:py-8 lg:min-w-0 lg:w-40 lg:h-40 xl:w-52 xl:h-52"
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
            className="w-11/12 h-full mx-auto rounded-xl"
            alt="uploads"
          />
        </div>
      ))}

      {imageList.length < 6 ? (
        <div className="relative min-w-48 shadow-md rounded-2xl lg:min-w-0 lg:w-40 xl:w-52 xl:h-52">
          <Span
            className="w-full h-full flex items-center justify-center"
            htmlFor="add-image"
          >
            {PlusImage}
          </Span>
          <input
            type="file"
            id="add-image"
            className="hidden"
            onChange={onChange}
          />
        </div>
      ) : null}
    </div>
  );
}

export default DisplayImages;
