const PriceEditInput = ({ formData, handleFormChange, modalData }) => {
  return (
    <>
      <p className="text-white-text flex flex-col">
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          min={0}
          name="price"
          id="price"
          value={formData.price}
          onChange={handleFormChange}
          required
          className="font-medium text-primary-dark"
        />
      </p>
      <p className="text-white-text">
        Original Price:
        <span className={`capitalize font-medium`}>
          {modalData[0]?.original_price}
        </span>
      </p>
    </>
  );
};

export default PriceEditInput;
