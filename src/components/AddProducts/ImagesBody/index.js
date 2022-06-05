import AddImageContainer from "../../AddImageContainer/AddImageContainer";
import DisplayImages from "../../DisplayImages/DisplayImages";

const ImagesBody = ({
  images,
  deleteImage,
  chooseImage,
  handleOnDragEnd,
  handleCropImageModalVisiblity,
}) => {
  return (
    <div className="w-full lg:w-55">
      <p className="text-white-text pb-4 font-Bold md:text-base text-sm">
        Product Listing
      </p>
      {images.length !== 0 ? (
        <DisplayImages
          imageList={images}
          deleteImage={(val) => deleteImage(val)}
          onChange={chooseImage}
          handleOnDragEnd={handleOnDragEnd}
          handleCropImageModalVisiblity={handleCropImageModalVisiblity}
        />
      ) : (
        <div className="border-0.98 border-dashed border-primary-main rounded-md flex flex-col items-center justify-center md:py-24 py-10 xl:px-10 md:px-10 px-5">
          <AddImageContainer onChange={chooseImage} required={true} />

          <p className="md:text-sm text-xs text-white-lightGray font-Bold pt-5">
            You can attach multiple images (1-6) 500px by 500px
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagesBody;
