import CategoriesSelect from "../CategoriesSelect.js";
import CloseModalButton from "../CloseModalButton";
import ModalImages from "../ModalImages";
import PriceEditInput from "../PriceEditInput/index.js";
import ProductDescriptionInput from "../ProductDescriptionInput/index.js";
import ProductStatusEdit from "../ProductStatusEdit/index.js";
import ProductStockInput from "../ProductStockInput/index.js";
import ProductTitleInput from "../ProductTitleInput/index.js";
import SizeAndColorEdit from "../SizeAndColorEdit/index.js";
import SubcategorySelect from "../SubcategorySelect/index.js";
import Timestamps from "../TimeStamps/index.js";
import WeightSelect from "../WeightSelect/index.js";
import ModalButtons from "../ModalButtons";
import CropImageModal from "../CropImageModal/index.js";

const ModalInfo = ({
  handleFormCancel,
  item,
  formData,
  handleFormChange,
  categoryHandler,
  handleImageChange,
  handleRemoveSize,
  handleRemoveColor,
  modalData,
  uploadDate,
  handleVerifyProduct,
  handleFormSubmit,
  handleOnDragEnd,
  handleImageDelete,
  imagesHandler,
  setImagesHandler,
  handleRestoreImages,
  handleImageUpdate,
  cropModal,
  handleCropImageModalVisiblity,
  handleSetCropImage,
  handleResetCrop,
}) => {
  return (
    <>
      <div className="flex justify-end mb-6 cursor-pointer">
        <CloseModalButton handleFormCancel={handleFormCancel} />
      </div>
      {cropModal.isActive && (
        <CropImageModal
          handleCropImageModalVisiblity={handleCropImageModalVisiblity}
          activeImage={imagesHandler.activeImage}
          handleSetCropImage={handleSetCropImage}
          cropInit={imagesHandler.activeImage?.original?.crop}
          aspectInit={imagesHandler.activeImage?.original?.aspect}
          zoomInit={imagesHandler.activeImage?.original?.zoom}
          handleResetCrop={handleResetCrop}
        />
      )}
      <form key={item._id} className="items-center flex flex-col gap-8 text-xs md:text-sm">
        <ModalImages
          imagesHandler={imagesHandler}
          setImagesHandler={setImagesHandler}
          handleImageChange={handleImageChange}
          handleOnDragEnd={handleOnDragEnd}
          handleImageDelete={handleImageDelete}
          handleRestoreImages={handleRestoreImages}
          handleImageUpdate={handleImageUpdate}
          handleCropImageModalVisiblity={handleCropImageModalVisiblity}
        />
        <div className="w-full flex flex-col gap-2">
          <CategoriesSelect
            formData={formData}
            handleFormChange={handleFormChange}
            categoryHandler={categoryHandler}
          />
          <SubcategorySelect
            formData={formData}
            handleFormChange={handleFormChange}
            categoryHandler={categoryHandler}
          />
          <WeightSelect
            formData={formData}
            handleFormChange={handleFormChange}
            categoryHandler={categoryHandler}
          />
          <ProductTitleInput
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <ProductDescriptionInput
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <SizeAndColorEdit
            formData={formData}
            handleRemoveSize={handleRemoveSize}
            handleRemoveColor={handleRemoveColor}
            handleFormChange={handleFormChange}
            categoryHandler={categoryHandler}
          />
          <PriceEditInput
            formData={formData}
            handleFormChange={handleFormChange}
            modalData={modalData}
          />
          <ProductStockInput
            formData={formData}
            handleFormChange={handleFormChange}
          />
          <Timestamps uploadDate={uploadDate} />
          <ProductStatusEdit
            formData={formData}
            handleFormChange={handleFormChange}
            item={item}
          />
        </div>
        <ModalButtons
          handleVerifyProduct={handleVerifyProduct}
          handleFormSubmit={handleFormSubmit}
          item={item}
        />
      </form>
    </>
  );
};

export default ModalInfo;
