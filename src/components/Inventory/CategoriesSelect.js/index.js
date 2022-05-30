const CategoriesSelect = ({ formData, handleFormChange, categoryHandler }) => {
  return (
    <p className="text-white-text flex flex-col">
      <label htmlFor="category">Category: </label>
      <select
        className="font-medium text-primary-dark"
        name="category"
        id="category"
        value={formData.category.name}
        onChange={handleFormChange}
        required
      >
        {categoryHandler?.category?.length > 0 ? (
          <>
            {categoryHandler?.category?.map(({ _id, name }) => {
              return (
                <option key={_id} name={name} value={name}>
                  {name}
                </option>
              );
            })}
          </>
        ) : (
          <option
            name={formData?.category?.name}
            value={formData?.category?.name}
          >
            {formData?.category?.name}
          </option>
        )}
      </select>
    </p>
  );
};

export default CategoriesSelect;
