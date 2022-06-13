import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseCropImageModalButton from "./CloseCropImageModalButton";
import { aspectRatios } from "./aspectratios";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import ModalControls from "./ModalControls";
// import ReactCrop from "react-image-crop";

const CropImageModal = ({
  handleCropImageModalVisiblity,
  activeImage,
  handleSetCropImage,
  zoomInit,
  cropInit,
  aspectInit,
  handleResetCrop,
}) => {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  const modalRef = useRef();
  const [src, setSrc] = useState(null);
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [possibleAspectRatios, setPossibleAspectRatios] =
    useState(aspectRatios);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // document.documentElement.style.overflow = "revert";
        handleCropImageModalVisiblity("CLOSE_CROP_IMAGE_MODAL");
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleCropImageModalVisiblity]);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onAspectChange = (e) => {
    const value = e.target.value;
    let ratio = possibleAspectRatios.find((ratio) => ratio.name === value);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  const readFile = useCallback(
    (file) => {
      // get aspect ratio of image
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          let result = reader.result;
          // Get aspect ratio of image
          if (!activeImage.original?.aspect) {
            const image = new Image();
            image.src = result;
            image.onload = () => {
              const aspectRatioName = `${image.naturalWidth}:${image.naturalHeight}`;
              const aspectRatio = image.width / image.height;
              const newPossibleAspectRatios = possibleAspectRatios.filter(
                (ratio) => roundToTwo(ratio.value) === roundToTwo(aspectRatio)
              );
              if (!newPossibleAspectRatios.length) {
                setPossibleAspectRatios((old) => {
                  return [
                    { name: aspectRatioName, value: aspectRatio },
                    ...old,
                  ];
                });
              } else {
                setAspect(newPossibleAspectRatios[0]);
              }
            };
          }
          return resolve(result);
        };

        reader.readAsDataURL(file);
      });
    },
    [possibleAspectRatios, activeImage?.original?.aspect]
  );

  const handleReset = () => {
    handleResetCrop(activeImage);
  };

  const onFileChange = useCallback(
    async (file) => {
      let imageDataUrl = await readFile(file);

      setSrc(imageDataUrl);
    },
    [readFile]
  );

  const handleCrop = async (e) => {
    // e.preventDefault();
    const croppedImage = await getCroppedImg(src, croppedAreaPixels);
    handleSetCropImage(croppedImage, zoom, crop, aspect);
  };

  useEffect(() => {
    if (!!activeImage) {
      let sourceImage = activeImage.original
        ? activeImage.original.src
        : activeImage.src;
      if (typeof sourceImage === "string") {
        return setSrc(sourceImage);
      } else {
        return onFileChange(sourceImage);
      }
    }
  }, [activeImage, onFileChange]);

  return (
    <ModalWrapper className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center text-xs md:text-sm">
      <ModalContainer
        ref={modalRef}
        className="relative rounded-md py-4 px-2 overflow-y-auto overflow-x-hidden flex flex-col gap-4 items-center justify-center"
      >
        <CloseCropImageModalButton
          handleCropImageModalVisiblity={handleCropImageModalVisiblity}
        />
        <div className="h-3/4 w-full relative">
          <Cropper
            image={src}
            zoom={zoom}
            crop={crop}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <ModalControls
          onZoomChange={onZoomChange}
          handleReset={handleReset}
          handleCrop={handleCrop}
          zoom={zoom}
          aspect={aspect}
          onAspectChange={onAspectChange}
          possibleAspectRatios={possibleAspectRatios}
          activeImage={activeImage}
        />
      </ModalContainer>
    </ModalWrapper>
  );
};

export default CropImageModal;

const ModalWrapper = styled.div`
  z-index: 20;
`;

const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  width: 95%;
  height: 35rem;
  max-height: 85vh;
  p {
    display: flex;
    gap: 0.75rem;
    font-weight: 300;
    font-size: 0.875;
  }
  input,
  select,
  textarea,
  .custom-input {
    padding: 0.5rem 1rem;
    border: 1px solid #16588f;
  }
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;
