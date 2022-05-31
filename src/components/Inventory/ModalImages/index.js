import { toast } from "react-toastify";
import BigImage from "./BigImage";
import ExtraImages from "./ExtraImages";
import UpdateImages from "./UpdateImages";

const ModalImages = ({
  handleImageChange,
  handleOnDragEnd,
  handleImageDelete,
  imagesHandler,
  setImagesHandler,
  handleRestoreImages,
  handleImageUpdate,
  handleCropImageModalVisiblity,
}) => {
  const getListStyle = (isDraggingOver, itemsLength) => ({
    overflowX: "auto",
  });
  // const getListItemStyle = (isDragging, isDraggingOver, isFirstItem) => ({
  //   overflow: "visible",
  // });

  const handleImageUpload = (e) => {
    const image = Array.from(e.target.files);
    let totalImages =
      image.length +
      imagesHandler.oldImages.length +
      imagesHandler.newImages.length;
    let oldTotalItems =
      imagesHandler.oldImages.length + imagesHandler.newImages.length;
    // if image is not an image, show error
    let isImage = image.every((item) => item.type.includes("image"));
    if (!isImage) {
      toast.error("Only image files are allowed");
      return;
    }

    // if image is more than 6, show error
    if (totalImages > 6) {
      toast.error("You can only upload 6 images");
      return;
    }

    // Check if image is already in the list
    let isDuplicate = image.some((newImage) =>
      imagesHandler.newImages.some((item) => newImage.name === item.name)
    );
    if (isDuplicate) {
      toast.error("Cannot have duplicate image");
      return;
    }

    // if image is larger than 1mb, show error
    let passed = image.every((item) => item.size < 1000000);
    if (!passed) {
      toast.error("Image size must be less than 1mb");
      return;
    }
    let newImages = [
      ...imagesHandler.newImages,
      ...image.map((item) => ({
        type: "newImage",
        name: item.name,
        src: item,
      })),
    ];

    // Check if there's any image currently displayed
    if (!oldTotalItems) {
      return setImagesHandler({
        ...imagesHandler,
        activeImage: { type: "newImage", src: newImages[0].src },
        newImages,
      });
    }

    setImagesHandler({
      ...imagesHandler,
      newImages,
    });
  };

  return (
    <div className="flex flex-col justify-center gap-4 w-full">
      {/* Displays Big Image */}
      <BigImage
        handleImageDelete={handleImageDelete}
        handleImageUpload={handleImageUpload}
        imagesHandler={imagesHandler}
        setImagesHandler={setImagesHandler}
        handleCropImageModalVisiblity={handleCropImageModalVisiblity}
      />
      {/* Displays extra images if totalimages (backendimages and uploaded images) is greater than 1 */}
      {imagesHandler?.oldImages?.length + imagesHandler?.newImages?.length >
        1 && (
        <ExtraImages
          handleImageDelete={handleImageDelete}
          handleImageUpload={handleImageUpload}
          handleOnDragEnd={handleOnDragEnd}
          handleImageChange={handleImageChange}
          getListStyle={getListStyle}
          imagesHandler={imagesHandler}
          setImagesHandler={setImagesHandler}
        />
      )}
      <UpdateImages
        handleRestoreImages={handleRestoreImages}
        handleImageUpdate={handleImageUpdate}
      />
    </div>
  );
};

export default ModalImages;
