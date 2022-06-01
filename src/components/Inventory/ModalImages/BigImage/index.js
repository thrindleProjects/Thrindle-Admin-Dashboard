import BigAddImageIcon from "./AddImageIcon/BigAddImageIcon";
import SmallAddImageIcon from "./AddImageIcon/SmallAddImageIcon";
import NewBigImage from "./NewBigImage";
import OldBigImage from "./OldBigImage";
const BigImage = ({
  handleImageDelete,
  handleImageUpload,
  imagesHandler,
  setImagesHandler,
  handleCropImageModalVisiblity,
}) => {
  return (
    <div className="h-52 w-max max-w-full mx-auto shadow-lgrounded-md">
      <div className="relative h-full flex flex-wrap justify-center items-center gap-2">
        {/* Show this component if at least one image from the backend is present */}
        {!!imagesHandler.oldImages.length && (
          <>
            {/* Checks if selected "activeImage" is an oldImage or a newImage */}
            {imagesHandler.activeImage.type === "oldImage" && (
              <OldBigImage
                activeImage={imagesHandler.activeImage}
                handleImageDelete={handleImageDelete}
                handleCropImageModalVisiblity={handleCropImageModalVisiblity}
              />
            )}
            {imagesHandler.activeImage.type === "newImage" && (
              <NewBigImage
                activeImage={imagesHandler.activeImage}
                handleImageDelete={handleImageDelete}
                handleCropImageModalVisiblity={handleCropImageModalVisiblity}
              />
            )}
            {/* Show this component if only one image from the backend is present */}
            {/* Allows to upload images */}
            {imagesHandler.oldImages.length + imagesHandler.newImages.length ===
              1 && <SmallAddImageIcon handleImageUpload={handleImageUpload} />}
          </>
        )}

        {/* Show this component if no local images have been uploaded and no images from the backend is to be retained */}
        {/* Basically displays an add product icon */}
        {!imagesHandler.oldImages.length && !imagesHandler.newImages.length && (
          <BigAddImageIcon handleImageUpload={handleImageUpload} />
        )}

        {/* Show this component if no images from the backend is to be retained and at least one local image is to be uploaded */}
        {/* Displays big image of freshly added image */}
        {!imagesHandler.oldImages.length && !!imagesHandler.newImages.length && (
          <>
            <NewBigImage
              activeImage={imagesHandler.activeImage}
              handleImageDelete={handleImageDelete}
              handleCropImageModalVisiblity={handleCropImageModalVisiblity}
            />
            {/* Show this component if only one image is to be uploaded */}
            {/* Allows for further addition of images */}
            {imagesHandler.newImages.length === 1 && (
              <SmallAddImageIcon handleImageUpload={handleImageUpload} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BigImage;
