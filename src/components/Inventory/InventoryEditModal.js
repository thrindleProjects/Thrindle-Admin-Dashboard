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

const InventoryEditModal = (props) => {
  const modalRef = useRef(null);
  const [modalData, setModalData] = useState([]);
  const [imagesHandler, setImagesHandler] = useState({
    activeImage: { type: "", src: "" },
    oldImagesImmutable: [],
    oldImages: [],
    newImages: [],
  });

  const [formData, setFormData] = useState({
    description: "",
    category: { _id: "", name: "" },
    subcategory: { _id: "", name: "" },
    weight: "0",
    name: "",
    details: { size: [], color: [] },
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

  const [cropModal, setCropModal] = useState({ isActive: false, image: {} });
  // Keep track if form was updated
  const [updated, setUpdated] = useState(false);

  const url = "https://api.thrindle.com/api/thrindle/sellers";
  const { handleSetModal, getAllProducts, showModal } = props;

  // Handle Submit Form Body
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let url =
      "https://api.thrindle.com/api/thrindle/products/admin/updateproduct";
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

  // Close Modal
  const handleFormCancel = (e) => {
    e.preventDefault();
    // document.documentElement.style.overflow = "revert";

    if (updated) {
      triggerTableUpdate();
    }
    handleSetModal("CLOSE_ALL_MODALS");
  };

  // Get Market Categories based on Market Name
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

  // Close Modal and Update Inventory Table
  const triggerTableUpdate = useCallback(() => {
    // document.documentElement.style.overflow = "revert";
    getAllProducts();
    handleSetModal("CLOSE_ALL_MODALS");
  }, [getAllProducts, handleSetModal]);

  // Get Product Information
  const getSingleProduct = useCallback(
    async (id) => {
      // document.documentElement.style.overflow = "hidden";
      try {
        let fetchUrl;
        if (showModal.verified) {
          fetchUrl = `${url}/products/product/${id}`;
        } else {
          fetchUrl = `${url}/products/unverifiedproduct/${id}`;
        }
        const {
          data: { data },
        } = await axios.get(fetchUrl);
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
        let oldImages = images.map((image) => {
          return {
            type: "oldImage",
            src: `https://api.thrindle.com/api/thrindle/images/${image}`,
          };
        });
        let oldImagesImmutable = [...oldImages];
        setFormData({
          description,
          name,
          category,
          subcategory,
          weight,
          details: {
            size,
            color,
          },
          no_in_stock,
          itemStatus,
          price,
        });
        setImagesHandler((old) => ({
          ...old,
          activeImage: {
            type: "oldImage",
            src: `https://api.thrindle.com/api/thrindle/images/${images[0]}`,
          },
          oldImagesImmutable,
          oldImages,
          newImages: [],
        }));
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
    [getMarketCategories, showModal.verified]
  );

  // Handle Input change on form body
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

  // Remove size from size array
  const handleRemoveSize = (item) => {
    let newSizes = formData.details.size.filter((size) => size !== item);
    return setFormData({
      ...formData,
      details: { ...formData.details, size: newSizes },
    });
  };

  // Remove color from color array
  const handleRemoveColor = (item) => {
    let newColors = formData.details.color.filter((color) => item !== color);
    return setFormData({
      ...formData,
      details: { ...formData.details, color: newColors },
    });
  };

  // Handle Image Change
  const handleImageChange = (e, image) => {
    e.preventDefault();
    setImagesHandler((old) => ({
      ...old,
      activeImage: { ...image },
    }));
  };

  // Handle Image Delete
  const handleImageDelete = (e, url, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "oldImage") {
      let oldImages = imagesHandler.oldImages.filter(
        (image) => image.src !== url
      );
      if (!oldImages.length && !imagesHandler.newImages?.length) {
        return setImagesHandler((old) => ({
          ...old,
          activeImage: { type: "", src: "" },
          oldImages,
        }));
      }
      if (!oldImages.length && !!imagesHandler.newImages.length) {
        return setImagesHandler((old) => ({
          ...old,
          activeImage: {
            type: "newImage",
            src: imagesHandler.newImages[0].src,
          },
          oldImages: [],
        }));
      }
      if (imagesHandler.activeImage.src === url) {
        return setImagesHandler((old) => ({
          ...old,
          activeImage: {
            type: "oldImage",
            src: oldImages[0].src,
          },
          oldImages,
        }));
      }
      return setImagesHandler((old) => ({ ...old, oldImages }));
    }
    if (type === "newImage") {
      let newImages = imagesHandler.newImages.filter((image) => {
        return image.name !== url.name;
      });
      if (!newImages.length && !imagesHandler.oldImages.length) {
        return setImagesHandler((old) => ({
          ...old,
          activeImage: { type: "", src: "" },
          newImages: [],
        }));
      }

      if (!newImages.length && !!imagesHandler.oldImages.length) {
        return setImagesHandler((old) => ({
          ...old,
          activeImage: {
            type: "oldImage",
            src: imagesHandler.oldImages[0].src,
          },
          newImages,
        }));
      }

      if (url.name === imagesHandler.activeImage.src?.name) {
        return setImagesHandler((old) => ({
          ...old,
          activeImage: { type: "newImage", src: newImages[0].src },
          newImages,
        }));
      }
      return setImagesHandler((old) => ({
        ...old,
        newImages,
      }));
    }
  };

  // Handle rearranging images
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.droppableId === "extra_images") {
      if (result.destination.droppableId !== "extra_images") return;
      let images = imagesHandler.oldImages;
      // Swap two items in images array;
      [images[result.source.index], images[result.destination.index]] = [
        images[result.destination.index],
        images[result.source.index],
      ];
      return setImagesHandler({ ...imagesHandler, oldImages: images });
    }

    if (result.source.droppableId === "new_extra_images") {
      if (result.destination.droppableId !== "new_extra_images") return;
      let images = imagesHandler.newImages;
      // Swap two items in images array;
      [images[result.source.index], images[result.destination.index]] = [
        images[result.destination.index],
        images[result.source.index],
      ];
      return setImagesHandler({
        ...imagesHandler,
        newImages: images,
      });
    }
  };

  // Handle Image Upload
  const handleImageUpdate = async (e) => {
    e.preventDefault();

    // If no images selected
    if (imagesHandler.oldImages.length + imagesHandler.newImages.length < 1) {
      toast.error("Please add at least one image");
      return;
    }
    try {
      // If new Images are to be uploaded and old images are present - adding new images to products and deletting or re-ordering old images
      if (
        !!imagesHandler.newImages.length &&
        !!imagesHandler.oldImages.length
      ) {
        let oldImages, images;
        if (!!imagesHandler.oldImages.length) {
          oldImages = imagesHandler.oldImages.map((image) =>
            image.src.replace(
              "https://api.thrindle.com/api/thrindle/images/",
              ""
            )
          );
        } else {
          oldImages = [];
        }
        images = imagesHandler.newImages.map((image) => image.src);
        let formData = new FormData();

        images.forEach((image) => formData.append("images", image));
        formData.append("oldImages", oldImages);
        let {
          data: { data },
        } = await axiosInstance.patch(
          `/products/addnewimage/${props.modalId}`,
          formData
        );
        let updatedImages = data.images.map((item) => ({
          src: `https://api.thrindle.com/api/thrindle/images/${item}`,
          type: "oldImage",
        }));
        toast.success("Images updated successfully");
        return setImagesHandler({
          ...imagesHandler,
          oldImagesImmutable: updatedImages,
          oldImages: updatedImages,
          newImages: [],
          activeImage: { type: "oldImage", src: updatedImages[0].src },
        });
      }
      // If old Images are to be updated and no new images are present - deleteing or re-arranging order of current images
      if (!!imagesHandler.oldImages.length && !imagesHandler.newImages.length) {
        let images = imagesHandler.oldImages.map((image) =>
          image.src.replace("https://api.thrindle.com/api/thrindle/images/", "")
        );
        let {
          data: { data },
        } = await axiosInstance.patch(
          `/products/updateimages/${props.modalId}`,
          { images }
        );
        let updatedImages = data.images.map((item) => ({
          src: `https://api.thrindle.com/api/thrindle/images/${item}`,
          type: "oldImage",
        }));
        toast.success("Images updated successfully");
        return setImagesHandler({
          ...imagesHandler,
          oldImagesImmutable: updatedImages,
          oldImages: updatedImages,
          newImages: [],
          activeImage: { type: "oldImage", src: updatedImages[0].src },
        });
      }

      // If new Images are to be uploaded and no old images are present - deleting
      if (!!imagesHandler.newImages.length && !imagesHandler.oldImages.length) {
        let images = imagesHandler.newImages.map((image) => image.src);
        let formData = new FormData();
        images.forEach((image) => formData.append("images", image));
        formData.append("oldImages", []);
        let {
          data: { data },
        } = await axiosInstance.put(
          `/products//updateimages/${props.modalId}`,
          formData
        );
        let updatedImages = data.images.map((item) => ({
          src: `https://api.thrindle.com/api/thrindle/images/${item}`,
          type: "oldImage",
        }));
        toast.success("Images updated successfully");
        return setImagesHandler({
          ...imagesHandler,
          oldImagesImmutable: updatedImages,
          oldImages: updatedImages,
          newImages: [],
          activeImage: { type: "oldImage", src: updatedImages[0].src },
        });
      }
      return toast.warning("No changes made");
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
      throw new Error(err);
    }
  };

  // Restore images to default images
  const handleRestoreImages = (e) => {
    e.preventDefault();
    setImagesHandler({
      ...imagesHandler,
      oldImagesImmutable: imagesHandler.oldImagesImmutable,
      oldImages: imagesHandler.oldImagesImmutable,
      activeImage: { ...imagesHandler.oldImagesImmutable[0] },
      newImages: [],
    });
  };

  // open and close crop modal
  const handleCropImageModalVisiblity = (action) => {
    switch (action) {
      case "SHOW_CROP_IMAGE_MODAL":
        setCropModal((old) => ({ ...old, isActive: true }));
        // setModalId(modalId);
        break;
      case "CLOSE_CROP_IMAGE_MODAL":
        setCropModal((old) => ({ ...old, isActive: false }));
        break;
      default:
        console.log("Invalid action");
        break;
    }
  };

  // reset crop on single image
  const handleResetCrop = (image) => {
    if (image.original.type === "newImage") {
      let newImages = [...imagesHandler.newImages];
      let index = newImages.findIndex(
        (item) => item.src === imagesHandler.activeImage.src
      );
      newImages[index] = image.original;
      setImagesHandler((old) => ({
        ...old,
        newImages,
        activeImage: image.original,
      }));
      return toast.success("Image reset successfully");
    }
    if (image.original.type === "oldImage") {
      let oldImages, newImages;
      if (!imagesHandler.oldImages.length) {
        oldImages = [image.original];
      } else {
        oldImages = imagesHandler.oldImages.map((item) => {
          if (item.src === image.original.src) {
            return image.original;
          }
          return item;
        });
      }
      newImages = imagesHandler.newImages.filter(
        (item) => item.original?.src !== image.original.src
      );

      setImagesHandler((old) => ({
        ...old,
        oldImages,
        newImages,
        activeImage: image.original,
      }));
      return toast.success("Image reset successfully");
    }
    toast.error("Something went wrong");
  };

  // crop image
  const handleSetCropImage = async (
    image,
    zoom = 1,
    crop = { x: 0, y: 0 },
    aspect = 1
  ) => {
    const config = { responseType: "blob" };
    let something = await axios.get(image, config);
    let fileName = image.split("/").pop();
    let res = new File([something.data], `${fileName}`, {
      type: "image/jpeg",
    });
    let croppedImage = {
      type: "newImage",
      src: res,
      name: fileName,
      original: imagesHandler.activeImage.original
        ? { ...imagesHandler.activeImage.original, zoom, crop, aspect }
        : { ...imagesHandler.activeImage, zoom, crop, aspect },
    };
    if (croppedImage.original.type === "oldImage") {
      let oldImages = imagesHandler.oldImages.filter(
        (item) => item.src !== croppedImage.original.src
      );
      let newImagesIndex = imagesHandler.newImages.find((item) => {
        return item.original?.src === croppedImage.original.src;
      });

      let newImages;

      if (newImagesIndex === undefined) {
        newImages = [...imagesHandler.newImages, croppedImage];
      } else {
        newImages = imagesHandler.newImages.map((image) => {
          if (image.original?.src === croppedImage.original.src) {
            return croppedImage;
          } else {
            return image;
          }
        });
      }
      setImagesHandler((old) => ({
        ...old,
        oldImages,
        newImages,
        activeImage: croppedImage,
      }));
    }
    if (croppedImage.original.type === "newImage") {
      let newImages = [...imagesHandler.newImages];
      // Find index of active image in newImages array
      let index = newImages.findIndex(
        (item) => item.src === imagesHandler.activeImage.src
      );
      [newImages[index]] = [croppedImage];
      setImagesHandler((old) => ({
        ...old,
        newImages,
        activeImage: croppedImage,
      }));
    }
    toast.success("Image cropped successfully");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // document.documentElement.style.overflow = "revert";

        if (modalData.length > 0 && updated) {
          triggerTableUpdate();
        }

        handleSetModal("CLOSE_ALL_MODALS");
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleSetModal, triggerTableUpdate, modalData, updated]);

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
      if (showModal.editModal) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "revert";
      }
    }

    return () => {
      mounted = false;
    };
  }, [showModal.editModal]);

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
                handleVerifyProduct={handleVerifyProduct}
                handleFormSubmit={handleFormSubmit}
                handleOnDragEnd={handleOnDragEnd}
                handleImageDelete={handleImageDelete}
                imagesHandler={imagesHandler}
                setImagesHandler={setImagesHandler}
                handleRestoreImages={handleRestoreImages}
                handleImageUpdate={handleImageUpdate}
                cropModal={cropModal}
                handleCropImageModalVisiblity={handleCropImageModalVisiblity}
                handleSetCropImage={handleSetCropImage}
                handleResetCrop={handleResetCrop}
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
