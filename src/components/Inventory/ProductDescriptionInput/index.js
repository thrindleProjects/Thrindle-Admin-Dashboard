const ProductDescriptionInput = ({ formData, handleFormChange }) => {
  return (
    <p className="text-white-text flex flex-col">
      <label htmlFor="description">Description:</label>
      <textarea
        className="font-medium text-primary-dark h-max"
        type="text"
        id="description"
        name={"description"}
        value={formData.description}
        required
        rows={3}
        onChange={handleFormChange}
      />
    </p>
  );
};

export default ProductDescriptionInput;
