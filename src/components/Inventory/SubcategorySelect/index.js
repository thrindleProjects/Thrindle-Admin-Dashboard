const SubcategorySelect = ({ formData, handleFormChange, categoryHandler }) => {
  return (
    <p className="text-white-text flex flex-col">
      <label htmlFor="subcategory">Sub Categories:</label>
      <select
        name="subcategory"
        id="subcategory"
        value={formData?.subcategory?.name}
        onChange={handleFormChange}
        required
      >
        {categoryHandler?.subcategory?.length > 0 ? (
          <>
            {categoryHandler?.subcategory?.map(({ _id, name }) => {
              return (
                <option key={_id} name={name} value={name}>
                  {name}
                </option>
              );
            })}
          </>
        ) : (
          <option
            name={formData?.subcategory?.name}
            value={formData?.subcategory?.name}
          >
            {formData?.subcategory?.name}
          </option>
        )}
      </select>
    </p>
  );
};

export default SubcategorySelect;
