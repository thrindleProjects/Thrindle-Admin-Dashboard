import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInstance";
import {
  mainColor,
  productSizes,
  productSizes2,
} from "../../data/sizeAndColor";
import { toast } from "react-toastify";
import NewLoader from "../newLoader/newLoader";
import ModalInfo from "./ModalInfo";
import {
  getMarketName,
  getMarketID,
  getSubCategories,
  getWeightClass,
  getUploadDate,
  getCategoryId,
  getSubCategoryId,
} from "./utils";

const VerifiedEditModal = (props) => {
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
  const { handleSetModal, getAllProducts, showModal } = props;

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
      new: formData.itemStatus,
    };
    try {
      let res = await axiosInstance.put(`${url}/${modalData[0]._id}`, formInfo);
      if (res.status < 400) {
        setUpdated(true);
        toast.success("Updated Successfully");
        return triggerTableUpdate();
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
    // document.documentElement.style.overflow = "revert";

    if (updated) {
      return triggerTableUpdate();
    }
    return handleSetModal("CLOSE_ALL_MODALS");
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
        } = await axios.get(`${url}/products/product/${id}`);
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
      let _id = getSubCategoryId(value, categoryHandler);
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

  const handleImageDelete = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    let activeImage = formData.activeImage.replace(
      "https://thrindleservices.herokuapp.com/api/thrindle/images/",
      ""
    );
    let newImages = modalData[0].images.filter((image) => image !== url);
    if (activeImage === url) {
      setFormData((old) => ({
        ...old,
        activeImage: `https://thrindleservices.herokuapp.com/api/thrindle/images/${newImages[0]}`,
      }));
    }
    setModalData((old) => [{ ...old, images: newImages }]);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    let images = modalData[0].images;
    // Swap two items in images array;
    [images[result.source.index], images[result.destination.index]] = [
      images[result.destination.index],
      images[result.source.index],
    ];
    setModalData((oldState) => [{ ...oldState[0], images }]);
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
  }, [formData.category.name]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (showModal.verifiedEditModal) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "revert";
      }
    }

    return () => {
      mounted = false;
    };
  }, [showModal.verifiedEditModal]);

  return (
    <ModalWrapper className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-25 w-full h-full z-50 flex items-center justify-center">
      <ModalContainer
        ref={modalRef}
        className="rounded-md py-12 px-8 overflow-y-auto overflow-x-hidden"
      >
        {modalData.length > 0 ? (
          modalData.map((item, index) => {
            const uploadDate = getUploadDate(item.updatedAt);
            return (
              <ModalInfo
                key={index}
                uploadDate={uploadDate}
                handleFormCancel={handleFormCancel}
                item={item}
                formData={formData}
                handleFormChange={handleFormChange}
                categoryHandler={categoryHandler}
                handleImageChange={handleImageChange}
                handleRemoveSize={handleRemoveSize}
                handleRemoveColor={handleRemoveColor}
                modalData={modalData}
                handleFormSubmit={handleFormSubmit}
                handleOnDragEnd={handleOnDragEnd}
                handleImageDelete={handleImageDelete}
              />
            );
          })
        ) : (
          <div className="h-52">
            <NewLoader />
          </div>
        )}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default VerifiedEditModal;

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
