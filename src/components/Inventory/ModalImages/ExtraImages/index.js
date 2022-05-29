import { DragDropContext } from "react-beautiful-dnd";
import NewExtraImages from "./NewExtraImages";
import OldExtraImages from "./OldExtraImages";

const ExtraImages = ({
  handleImageDelete,
  handleImageChange,
  handleOnDragEnd,
  getListStyle,
  handleImageUpload,
  imagesHandler,
}) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* Show a list of small images */}
      {/* Will display old images and new images */}
      {!!imagesHandler.oldImages.length && (
        <OldExtraImages
          getListStyle={getListStyle}
          imagesHandler={imagesHandler}
          handleImageUpload={handleImageUpload}
          handleImageChange={handleImageChange}
          handleImageDelete={handleImageDelete}
        />
      )}
      {!imagesHandler.oldImages.length && !!imagesHandler.newImages.length && (
        <NewExtraImages
          getListStyle={getListStyle}
          imagesHandler={imagesHandler}
          handleImageUpload={handleImageUpload}
          handleImageChange={handleImageChange}
          handleImageDelete={handleImageDelete}
        />
      )}
    </DragDropContext>
  );
};

export default ExtraImages;
