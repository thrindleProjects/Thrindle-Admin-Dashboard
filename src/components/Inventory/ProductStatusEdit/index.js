const ProductStatusEdit = ({ formData, handleFormChange, item }) => {
  return (
    <>
      <p className="text-white-text">
        Product Type:{" "}
        <span className="font-medium text-primary-dark flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            name="itemStatus"
            id="itemStatus"
            checked={formData.itemStatus}
            onChange={handleFormChange}
          />
          {formData.itemStatus ? "New" : "Used"}
        </span>
      </p>
      <p className="text-white-text">
        Status:{" "}
        <span
          className={`capitalize font-medium ${
            item.verified ? "text-secondary-success" : "text-secondary-yellow"
          }`}
        >
          {item.verified ? "Approved" : "Pending"}
        </span>
      </p>
    </>
  );
};

export default ProductStatusEdit;
