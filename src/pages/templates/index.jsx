import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import NavBar from "../../components/Common/NavBar/NavBar";
import CropImageModal from "../../components/Inventory/CropImageModal";

const Templates = () => {
  const [cropModal, setCropModal] = useState({
    activeImage: { src: "", type: "" },
    isActive: false,
  });
  const [images, setImages] = useState([]);

  // open and close crop modal
  const handleCropImageModalVisiblity = (action, payload) => {
    switch (action) {
      case "SHOW_CROP_IMAGE_MODAL":
        setCropModal((old) => ({
          ...old,
          isActive: true,
          activeImage: payload,
        }));
        // setModalId(modalId);
        break;
      case "CLOSE_CROP_IMAGE_MODAL":
        setCropModal((old) => ({ ...old, isActive: false, activeImage: null }));
        break;
      default:
        console.log("Invalid action");
        break;
    }
  };

  const handleSetCropImage = async (
    image,
    zoom = 1,
    crop = { x: 0, y: 0 },
    aspect = 1
  ) => {
    const config = { responseType: "blob" };
    let something = await axios.get(image, config);
    let fileName = image.split("/").pop();
    let res = new File([something.data], `${fileName}`, {
      type: "image/jpeg",
    });
    let croppedImage = {
      type: "newImage",
      src: res,
      name: fileName,
      original: cropModal.activeImage?.original
        ? { ...cropModal.activeImage?.original, zoom, crop, aspect }
        : { ...cropModal.activeImage, zoom, crop, aspect },
    };

    if (croppedImage.original.type === "newImage") {
      let newImages = [...images];
      // Find index of active image in newImages array
      let index = newImages.findIndex(
        (item) => item.src === cropModal.activeImage.src
      );
      [newImages[index]] = [croppedImage];
      setImages(newImages);
      setCropModal((old) => ({ ...old, activeImage: croppedImage }));
    }
    toast.success("Image cropped successfully");
  };

  // reset crop on single image
  const handleResetCrop = (image) => {
    let newImages = [...images];
    let index = newImages.findIndex(
      (item) => item.src === cropModal.activeImage.src
    );
    [newImages[index]] = [
      { ...image.original, zoom: null, crop: null, aspect: null },
    ];
    setImages(newImages);
    setCropModal((old) => ({
      ...old,
      activeImage: {
        ...image.original,
        zoom: null,
        crop: null,
        aspect: null,
      },
    }));
    return toast.success("Image reset successfully");
  };

  return (
    <>
      <NavBar />
      <div className="w-11/12 pt-10 mx-auto font-Regular">
        {cropModal.isActive && (
          <CropImageModal
            handleCropImageModalVisiblity={handleCropImageModalVisiblity}
            activeImage={cropModal.activeImage}
            handleSetCropImage={handleSetCropImage}
            cropInit={cropModal.activeImage?.original?.crop}
            aspectInit={cropModal.activeImage?.original?.aspect}
            zoomInit={cropModal.activeImage?.original?.zoom}
            handleResetCrop={handleResetCrop}
          />
        )}
      </div>
    </>
  );
};

export default Templates;
