const ProductStockInput = ({ formData, handleFormChange }) => {
  return (
    <p className="text-white-text flex flex-col">
      <label htmlFor="no_in_stock">Stock: </label>
      <input
        type="number"
        min={0}
        name="no_in_stock"
        id="no_in_stock"
        value={formData.no_in_stock}
        onChange={handleFormChange}
        required
        className="font-medium text-primary-dark"
      />
    </p>
  );
};

export default ProductStockInput;
