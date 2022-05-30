const WeightSelect = ({ formData, handleFormChange, categoryHandler }) => {
  return (
    <>
      <p className="text-white-text">
        Selected Weight:
        <span className={`capitalize font-medium`}>
          {formData.weight ? formData.weight : "N/A"}
        </span>
      </p>
      <p className="text-white-text flex flex-col">
        <label htmlFor="weight">Weight:</label>
        <select
          name="weight"
          id="weight"
          value={formData.weight}
          onChange={handleFormChange}
          required
        >
          {categoryHandler?.weight?.length > 0 ? (
            categoryHandler.weight.map((item, index) => {
              return (
                <option key={index} name="weight" value={item}>
                  {item}
                </option>
              );
            })
          ) : (
            <option name="weight" value={formData.weight}>
              {formData.weight}
            </option>
          )}
        </select>
      </p>
    </>
  );
};

export default WeightSelect;
