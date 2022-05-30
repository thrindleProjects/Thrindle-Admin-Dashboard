import { Draggable, Droppable } from "react-beautiful-dnd";
import { IoAddSharp, IoCloseCircleOutline } from "react-icons/io5";
import styled from "styled-components";

const NewExtraImages = ({
  getListStyle,
  imagesHandler,
  handleImageUpload,
  handleImageChange,
  handleImageDelete,
}) => {
  return (
    <Droppable droppableId="new_extra_images" direction="horizontal">
      {(provided, snapshot) => (
        <ExtraImagesWrapper
          className="flex flex-row items-center gap-2 h-24 w-full pb-4"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(
            snapshot.isDraggingOver,
            imagesHandler.newImages.length
          )}
        >
          {imagesHandler.newImages.map((image, index) => {
            return (
              <Draggable
                key={index}
                draggableId={`new-extra-image-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="h-full rounded-md shadow-md flex-shrink-0 relative"
                    onClick={(e) => handleImageChange(e, image.src, image.type)}
                  >
                    <div
                      className="bg-primary-main rounded-full cursor-pointer absolute top-0 right-0 w-max"
                      onClick={(e) =>
                        handleImageDelete(e, image.src, image.type)
                      }
                    >
                      <IoCloseCircleOutline className="text-white-main" />
                    </div>
                    <img
                      className="object-contain h-full rounded-md flex-shrink-0"
                      src={URL.createObjectURL(image.src)}
                      onLoad={() => URL.revokeObjectURL(image.src)}
                      alt={`${image.name}`}
                    />
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
          {imagesHandler.newImages.length < 6 && (
            <li className="h-full w-12 text-white-main text-3xl bg-primary-main rounded-md flex-shrink-0">
              <input
                type="file"
                name="image"
                id="image"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer h-full w-full flex items-center justify-center"
              >
                <IoAddSharp />
              </label>
            </li>
          )}
        </ExtraImagesWrapper>
      )}
    </Droppable>
  );
};

export default NewExtraImages;

const ExtraImagesWrapper = styled.ul`
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f0f4f9;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #166cb4;
  }
`;
