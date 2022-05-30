import CustomColorDropdown from "../CustomColorInventoryDropdown";
import CustomInventoryDropdown from "../CustomInventoryDropdown";
import SelectedColors from "../SelectedColors";
import SelectedSizes from "../SelectedSizes";

const SizeAndColorEdit = ({
  formData,
  handleRemoveSize,
  categoryHandler,
  handleFormChange,
  handleRemoveColor,
}) => {
  return (
    <>
      <div className="text-white-text flex flex-col">
        Size:
        <span className="font-medium text-primary-dark custom-input">
          {formData?.details?.size?.length > 0 ? (
            <SelectedSizes
              sizes={formData.details.size}
              removeSize={handleRemoveSize}
            />
          ) : (
            "No Value Chosen Yet"
          )}
        </span>
        <CustomInventoryDropdown
          fieldset={"Choose Sizes"}
          list1={categoryHandler.size[0]}
          list2={categoryHandler.size[1]}
          emptyState1="e.g Small"
          emptyState2={"e.g 30"}
          onChange={handleFormChange}
          inputValue={formData.details.size}
        />
      </div>
      <div className="text-white-text flex flex-col">
        Color:
        <span className="font-medium text-primary-dark custom-input">
          {formData?.details?.color?.length > 0 ? (
            <SelectedColors
              colors={formData.details.color}
              removeColor={handleRemoveColor}
            />
          ) : (
            "No Value Chosen Yet"
          )}
        </span>
        <CustomColorDropdown
          fieldset={"Choose Colors"}
          list={categoryHandler.color}
          emptyState={"Select Color"}
          onChange={handleFormChange}
          inputValue={formData.details.color}
        />
      </div>
    </>
  );
};

export default SizeAndColorEdit;
