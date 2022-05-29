const ProductTitleInput = ({ formData, handleFormChange }) => {
  return (
    <p className="text-white-text flex flex-col">
      <label htmlFor="name">Product Title:</label>
      <input
        className="font-medium text-primary-dark"
        type="text"
        id="name"
        name={"name"}
        value={formData.name}
        required
        onChange={handleFormChange}
      />
    </p>
  );
};

export default ProductTitleInput;
