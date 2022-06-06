import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoCropSharp } from "react-icons/io5";
import styled from "styled-components";
import { CancelImage } from "../../assets/svg/cancelImage";
import { PlusImage } from "../../assets/svg/plusImage";

const Label = styled.label`
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

function DisplayImages({
  imageList,
  onChange,
  deleteImage,
  handleOnDragEnd,
  handleCropImageModalVisiblity,
}) {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* lg:grid-cols-3 lg:grid-rows-2 lg:overflow-x-visible */}
      <Droppable droppableId="new_product" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className="flex gap-2 w-full overflow-x-auto pb-4 lg:flex lg:rounded-md"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {imageList?.map((image, index) => (
              <Draggable
                key={index}
                index={index}
                draggableId={`new_product_img_${index}`}
              >
                {(provided, snapshot) => (
                  <div
                    className="relative w-max max-w-20 h-32 border-0.98 border-primary-main bg-white-main rounded-md flex-shrink-0"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <span
                      className="absolute right-0.5 top-1 md:top-2.5 md:right-1.5 cursor-pointer"
                      onClick={() => deleteImage(index)}
                    >
                      {CancelImage}
                    </span>
                    <span
                      className="absolute left-0.5 top-1 md:top-2.5 md:left-1.5 cursor-pointer w-max h-max bg-black p-1 rounded-full"
                      onClick={(e) =>
                        handleCropImageModalVisiblity(
                          "SHOW_CROP_IMAGE_MODAL",
                          image
                        )
                      }
                    >
                      <IoCropSharp className="text-white-main" />
                    </span>
                    <img
                      src={URL.createObjectURL(image.src)}
                      onLoad={URL.revokeObjectURL(image.src)}
                      key={index}
                      className="h-full max-w-full mx-auto rounded-md"
                      alt="uploads"
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {imageList.length < 6 && (
              <div className="relative shadow-md rounded-2xl w-28 h-32 overflow-hidden flex-shrink-0">
                <Label
                  className="w-full h-full flex items-center justify-center"
                  htmlFor="add-image"
                >
                  {PlusImage}
                </Label>
                <input
                  type="file"
                  id="add-image"
                  className="hidden"
                  onChange={onChange}
                  multiple
                />
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DisplayImages;
