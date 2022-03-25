import React, { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../Common/Loader/Loader";
import axios from "axios";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInstance";
import {
  mainColor,
  productSizes,
  productSizes2,
} from "../../data/sizeAndColor";
import { toast } from "react-toastify";
import CustomInventoryDropdown from "./CustomInventoryDropdown";
import CustomColorDropdown from "./CustomColorInventoryDropdown";
import SelectedColors from "./SelectedColors";
import SelectedSizes from "./SelectedSizes";

const InventoryEditModal = (props) => {
  const modalRef = useRef(null);
  const [modalData, setModalData] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    category: { _id: "", name: "" },
    subcategory: { _id: "", name: "" },
    weight: "0",
    name: "",
    details: { size: [], color: [] },
    activeImage: "",
    no_in_stock: 0,
    price: 0,
    itemStatus: false,
  });
  const [categoryHandler, setCategoryHandler] = useState({
    marketName: "",
    category: [],
    subcategory: [],
    weight: [],
    size: [],
    color: [],
  });

  // Keep track if form was updated
  const [updated, setUpdated] = useState(false);

  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";
  const { handleSetModal, getAllProducts } = props;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let url =
      "https://thrindleservices.herokuapp.com/api/thrindle/products/admin/updateproduct";
    let formInfo = {
      name: formData.name,
      category: formData.category._id,
      description: formData.description,
      subcategory: formData.subcategory._id,
      weight: formData.weight,
      details: {
        size: formData.details.size,
        color: formData.details.color,
      },
      no_in_stock: formData.no_in_stock,
      price: formData.price,
      // new: formData.itemStatus,
    };

    try {
      let res = await axiosInstance.put(`${url}/${modalData[0]._id}`, formInfo);
      if (res.status < 400) {
        setUpdated(true);
        return toast.success("Updated Successfully");
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.error("Something went wrong");
      throw new Error(error);
    }
  };

  const handleFormCancel = (e) => {
    e.preventDefault();
    document.documentElement.style.overflow = "revert";

    if (updated) {
      return triggerTableUpdate();
    }
    return handleSetModal("CLOSE_ALL_MODALS");
  };

  const getMarketName = (storeId) => {
    if (storeId.trim().startsWith("CV")) return "Computer Village";
    if (storeId.trim().startsWith("BM")) return "Eko Market";
    if (storeId.trim().startsWith("EM")) return "Eko Market";
    return "Other Market";
  };

  const getMarketID = (marketValue) => {
    if (marketValue !== "") {
      let marketData = JSON.parse(localStorage.getItem("marketData"));
      let findMarket = marketData.find((item) => item.name === marketValue);
      return findMarket.id;
    }
    return false;
  };

  const getSubCategories = useCallback((categoryValue) => {
    let marketData = JSON.parse(localStorage.getItem("marketCategories"));
    let findMarket = marketData.find((item) => item.name === categoryValue);
    let subcategory = findMarket.subcategories;
    return subcategory;
  }, []);

  const getWeightClass = (categoryValue) => {
    let marketData = JSON.parse(localStorage.getItem("marketCategories"));
    let findMarket = marketData.find((item) => item.name === categoryValue);
    let weightList = findMarket.weight.map((item) => item.name); // maps real-time weight class
    return weightList; // renders real-time weight class
  };

  const getMarketCategories = useCallback(async (marketValue) => {
    const marketID = await getMarketID(marketValue);
    try {
      let res = await axiosInstance.get(`categories/market/${marketID}`);
      localStorage.setItem("marketCategories", JSON.stringify(res.data.data));
      let category = res.data.data.map(({ name, _id }) => {
        return { name, _id };
      });
      setCategoryHandler((oldState) => {
        return { ...oldState, category };
      });
    } catch (error) {
      if (error.response) {
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  }, []);

  const triggerTableUpdate = useCallback(() => {
    document.documentElement.style.overflow = "revert";
    getAllProducts();
    return handleSetModal("CLOSE_ALL_MODALS");
  }, [getAllProducts, handleSetModal]);

  const getSingleProduct = useCallback(
    async (id) => {
      document.documentElement.style.overflow = "hidden";

      try {
        const {
          data: { data },
        } = await axios.get(`${url}/products/unverifiedproduct/${id}`);
        let {
          description,
          name,
          category,
          subcategory,
          store_id,
          weight,
          images,
          details,
          no_in_stock,
          new: itemStatus,
          price,
        } = data[0];
        let marketName = getMarketName(store_id);
        await getMarketCategories(marketName);
        let size, color;
        console.log(data);
        size = details && details?.size ? details.size : [];
        color = details && details?.color ? details.color : [];

        setFormData({
          description,
          name,
          category,
          subcategory,
          weight,
          activeImage: `https://thrindleservices.herokuapp.com/api/thrindle/images/${images[0]}`,
          details: {
            size,
            color,
          },
          no_in_stock,
          itemStatus,
          price,
        });
        setModalData(data);
        setCategoryHandler((old) => {
          return { ...old, marketName };
        });
      } catch (error) {
        if (error.message) {
          toast.error(error.message);
          throw new Error(error.message);
        }
        toast.error("Something went wrong");
        throw new Error(error);
      }
    },
    [getMarketCategories]
  );

  const getUploadDate = (updatedAt) => {
    const date = new Date(updatedAt);
    let newDay = date.getDate();
    let newMonth = date.getMonth() + 1;
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
  };

  const getCategoryId = (category) => {
    let marketData = JSON.parse(localStorage.getItem("marketCategories"));
    let findMarket = marketData.find((item) => item.name === category);
    return findMarket._id;
  };

  const getSubCategoryId = (subCategoryValue) => {
    let findMarket = categoryHandler.subcategory.find(
      (item) => item.name === subCategoryValue
    );
    return findMarket._id;
  };

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (e.target.type === "checkbox") {
      let isChecked = e.target.checked;
      if (name === "size") {
        // If item is selected add new size to size arr
        if (isChecked) {
          return setFormData({
            ...formData,
            details: {
              ...formData.details,
              size: [...formData.details.size, value],
            },
          });
        }
        // if unselected remove old size from size arr
        let newArr = formData.details.size.filter((item) => item !== value);
        return setFormData({
          ...formData,
          details: {
            ...formData.details,
            size: newArr,
          },
        });
      }
      if (name === "color") {
        // If item is selected add new color to color arr
        if (isChecked) {
          return setFormData({
            ...formData,
            details: {
              ...formData.details,
              color: [...formData.details.color, value],
            },
          });
        }
        // if unselected remove old size from size arr
        let newArr = formData.details.color.filter((item) => item !== value);
        return setFormData({
          ...formData,
          details: {
            ...formData.details,
            color: newArr,
          },
        });
      }
      if (name === "itemStatus") {
        return setFormData({ ...formData, itemStatus: isChecked });
      }
    }

    if (name === "category") {
      let _id = getCategoryId(value);
      return setFormData({
        ...formData,
        category: { name: value, _id },
      });
    }

    if (name === "subcategory") {
      let _id = getSubCategoryId(value);
      return setFormData({
        ...formData,
        subcategory: { name: value, _id },
      });
    }

    if (["no_in_stock", "price"].includes(name)) {
      value = Number(value);
    }

    return setFormData({ ...formData, [name]: value });
  };

  const handleRemoveSize = (item) => {
    let newSizes = formData.details.size.filter((size) => size !== item);
    return setFormData({
      ...formData,
      details: { ...formData.details, size: newSizes },
    });
  };

  const handleRemoveColor = (item) => {
    let newColors = formData.details.color.filter((color) => item !== color);
    return setFormData({
      ...formData,
      details: { ...formData.details, color: newColors },
    });
  };

  const handleImageChange = (e, url) => {
    e.preventDefault();
    setFormData((old) => {
      return { ...old, activeImage: url };
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        document.documentElement.style.overflow = "revert";

        if (modalData.length > 0 && updated) {
          return triggerTableUpdate();
        }
        handleSetModal("CLOSE_ALL_MODALS");
      }
      return true;
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleSetModal, triggerTableUpdate, modalData, updated]);

  useEffect(() => {
    getSingleProduct(props.modalId);
  }, [props.modalId, getSingleProduct]);

  useEffect(() => {
    if (formData.category.name === "") return;
    let subcategory = getSubCategories(formData.category.name);
    let weight = getWeightClass(formData.category.name);
    let size = [productSizes, productSizes2];
    let color = mainColor;

    setCategoryHandler((old) => {
      return { ...old, subcategory, weight, size, color };
    });
    return;
  }, [formData.category.name, getSubCategories]);

  const handleVerifyProduct = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/products/updateunverifedproduct/${id}`);
      setModalData([{ ...modalData[0], verified: true }]);
      toast.success("Success");
      triggerTableUpdate();
    } catch (error) {
      console.error(error);
      toast.error("Oops! Something went wrong...");
    }
  };

  return (
    <ModalWrapper className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center">
      <ModalContainer
        ref={modalRef}
        className="rounded-md py-12 px-8 overflow-y-auto"
      >
        {modalData.length > 0 ? (
          modalData.map((item, index) => {
            const uploadDate = getUploadDate(item.updatedAt);
            return (
              <React.Fragment key={index}>
                <div className="flex justify-end mb-6 cursor-pointer">
                  <svg
                    className="relative w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleFormCancel}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <form
                  key={item._id}
                  className="items-center flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-4">
                    <div className="h-52 w-max mx-auto overflow-hidden shadow-md rounded-md">
                      <img
                        className="object-contain h-full"
                        src={formData.activeImage}
                        alt="Pending Item"
                      />
                    </div>
                    {item.images.length > 1 && (
                      <div className="flex flex-row gap-2">
                        {item.images.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className="w-1/6 rounded-md overflow-hidden shadow-md"
                              onClick={(e) =>
                                handleImageChange(
                                  e,
                                  `https://thrindleservices.herokuapp.com/api/thrindle/images/${item}`
                                )
                              }
                            >
                              <img
                                src={`https://thrindleservices.herokuapp.com/api/thrindle/images/${item}`}
                                alt="Pending Item"
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-2">
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
                            {categoryHandler?.subcategory?.map(
                              ({ _id, name }) => {
                                return (
                                  <option key={_id} name={name} value={name}>
                                    {name}
                                  </option>
                                );
                              }
                            )}
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
                    <p className="text-white-text">
                      Upload Date:{" "}
                      <span className="font-medium text-primary-dark">
                        {uploadDate}
                      </span>
                    </p>
                    <p className="text-white-text">
                      Product Type:{" "}
                      <span className="font-medium text-primary-dark flex flex-row gap-2 items-center">
                        {/* <input
                          type="checkbox"
                          name="itemStatus"
                          id="itemStatus"
                          checked={formData.itemStatus}
                          onChange={handleFormChange}
                        /> */}
                        {formData.itemStatus ? "New" : "Used"}
                      </span>
                    </p>
                    <p className="text-white-text">
                      Status:{" "}
                      <span
                        className={`capitalize font-medium ${
                          item.verified
                            ? "text-secondary-success"
                            : "text-secondary-yellow"
                        }`}
                      >
                        {item.verified ? "Approved" : "Pending"}
                      </span>
                    </p>
                  </div>
                  <div className="w-full flex flex-row gap-4 justify-end">
                    <ModalButton
                      className="border border-primary-dark bg-primary-dark text-white-main cursor-pointer"
                      type="submit"
                      onClick={handleFormSubmit}
                    >
                      Update
                    </ModalButton>
                    <ModalButton
                      className="border text-white-main bg-secondary-success cursor-pointer"
                      onClick={(e) => handleVerifyProduct(e, item._id)}
                    >
                      Approve
                    </ModalButton>
                  </div>
                </form>
              </React.Fragment>
            );
          })
        ) : (
          <div className="h-52">
            <Loader />
          </div>
        )}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default InventoryEditModal;

const ModalWrapper = styled.div`
  z-index: 15;
`;

const ModalContainer = styled.div`
  box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  width: 30%;
  min-height: 20rem;
  max-height: 85vh;
  p {
    display: flex;
    gap: 0.75rem;
    font-weight: 300;
    font-size: 0.875;
  }
  input,
  select,
  textarea,
  .custom-input {
    padding: 0.5rem 1rem;
    border: 1px solid #16588f;
  }
`;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
`;
