import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseCropImageModalButton from "./CloseCropImageModalButton";
import { aspectRatios } from "./aspectratios";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
// import ReactCrop from "react-image-crop";

const CropImageModal = ({
  handleCropImageModalVisiblity,
  activeImage,
  handleSetCropImage,
}) => {
  const modalRef = useRef();
  const [src, setSrc] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [possibleAspectRatios, setPossibleAspectRatios] =
    useState(aspectRatios);
  const [aspect, setAspect] = useState(aspectRatios[0]);
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
  const readFile = (file) => {
    // get aspect ratio of image
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        let result = reader.result;
        // Get aspect ratio of image
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
              return [{ name: aspectRatioName, value: aspectRatio }, ...old];
            });
            setAspect({ name: aspectRatioName, value: aspectRatio });
          } else {
            setAspect(newPossibleAspectRatios[0]);
          }
        };
        return resolve(result);
      };

      reader.readAsDataURL(file);
    });
  };

  const onFileChange = useCallback(async (file) => {
    let imageDataUrl = await readFile(file);

    setSrc(imageDataUrl);
  }, []);

  const handleCrop = async (e) => {
    // e.preventDefault();
    const croppedImage = await getCroppedImg(src, croppedAreaPixels);
    handleSetCropImage(croppedImage);
  };

  useEffect(() => {
    if (activeImage) {
      let sourceImage = activeImage.original
        ? activeImage.original
        : activeImage.src;
      onFileChange(sourceImage);
    }
  }, [activeImage, onFileChange]);

  return (
    <ModalWrapper className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center">
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
            onMediaLoaded={URL.revokeObjectURL(activeImage.src)}
            zoom={zoom}
            crop={crop}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-full flex items-center justify-center gap-2">
            <input
              className="w-1/2 flex-shrink-0"
              type="range"
              name="range"
              id="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onInput={(e) => onZoomChange(e.target.value)}
            />
            <select
              className="rounded-md flex-shrink-0"
              name="aspect"
              id="aspect"
              value={aspect.name}
              onChange={onAspectChange}
            >
              {possibleAspectRatios.map((ratio, index) => (
                <option
                  key={ratio.name}
                  value={ratio.name}
                  // selected={ratio.value === aspect.value}
                >
                  {ratio.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <ModalButton
              className="bg-secondary-error text-white-main"
              onClick={(e) => {
                e.preventDefault();
                handleCropImageModalVisiblity("CLOSE_CROP_IMAGE_MODAL");
              }}
            >
              Cancel
            </ModalButton>
            <ModalButton className="bg-secondary-yellow text-white-main">
              Reset
            </ModalButton>
            <ModalButton
              className="bg-primary-main text-white-main"
              onClick={handleCrop}
            >
              Crop
            </ModalButton>
          </div>
        </div>
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
  width: 50%;
  min-height: 35rem;
  height: 70vh;
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
`;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
`;
