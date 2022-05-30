import React from "react";
import CloseModalButton from "../../CloseModalButton";

const CloseCropImageModalButton = ({ handleCropImageModalVisiblity }) => {
  return (
    <div className="w-max h-max ml-auto">
      <CloseModalButton
        handleFormCancel={() =>
          handleCropImageModalVisiblity("CLOSE_CROP_IMAGE_MODAL")
        }
      />
    </div>
  );
};

export default CloseCropImageModalButton;
