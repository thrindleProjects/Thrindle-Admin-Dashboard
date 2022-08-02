import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../utils/axiosInstance";
import { productSizes, productSizes2 } from "../../data/sizeAndColor";
import NavBar from "../../components/Common/NavBar/NavBar";
import { toast } from "react-toastify";
import FormBody from "../../components/AddProducts/FormBody";
import ImagesBody from "../../components/AddProducts/ImagesBody";
import CropImageModal from "../../components/Inventory/CropImageModal";
import axios from "axios";

const AddProducts = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [marketValue, setMarketValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [weightClassValue, setWeightClassValue] = useState("");
  const [weightClass, setWeightClass] = useState([]);
  const [unit, setUnit] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [productType, setProductType] = useState("");
  const [otherValues, setOtherValues] = useState({});
  const [uploading, setUploading] = useState(false);
  const [searchStoreValue, setSearchStoreValue] = useState("");
  const [storeID, setStoreID] = useState("");
  const [storeValue, setStoreValue] = useState("");
  const [currentSize, setCurrentSize] = useState({
    size1: [],
    size2: [],
  });
  const [cropModal, setCropModal] = useState({
    activeImage: { src: "", type: "" },
    isActive: false,
  });
  const productSizeArr = productSizes.map((item) => item.title);
  const productSizeArr2 = productSizes2.map((item) => item.title);
  const navigate = useNavigate();

  // functions for image upload & delete
  const chooseImage = (event) => {
    const imageList = Array.from(event.target.files);

    let totalImages = images.length + imageList.length;

    let isImage = imageList.every((item) => item.type.includes("image"));
    if (!isImage) {
      toast.error("Only image files are allowed");
      return;
    }

    if (totalImages > 6) {
      toast.error("You can only upload 6 images");
      return;
    }

    let isDuplicate = imageList.some((newImage) =>
      images.some((item) => newImage.name === item.name)
    );
    if (isDuplicate) {
      toast.error("Cannot have duplicate image");
      return;
    }

    let passed = imageList.every((item) => item.size < 1000000);
    if (!passed) {
      toast.error("Image size must be less than 1mb");
      return;
    }

    setImages([
      ...images,
      ...imageList.map((item) => ({
        type: "newImage",
        name: item.name,
        src: item,
      })),
    ]);
    return;
  };

  const deleteImage = (val) => {
    let newImages = images.filter((item, index) => index !== val);
    setImages(newImages);
  };

  // form submissions
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      productStock: "",
      price: "",
    },

    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(2, "Too Short")
        .required("Required"),
      description: Yup.string()
        .min(10, "Too Short")
        .max(3000, "Description cannot exceed 3000 characters")
        .required("Required"),

      productStock: Yup.number()
        .required("Required")
        .positive("Enter a positive value")
        .integer("Enter a positive value"),
      price: Yup.number().required("Required").positive().integer(),
    }),

    onSubmit: (values) => {
      let values2 = {
        images: images,
        category: getCategoryId(categoryValue),
        subCategory: getSubCategoryId(subCategoryValue),
        unit: unit,
        colors: colors,
        size: [...currentSize.size1, ...currentSize.size2],
        weight: weightClassValue,
        productTypeStatus: storeID?.startsWith("EM")
          ? true
          : getProductTypeBoolean(productType),
      };

      setOtherValues({ ...otherValues, values2 });
      let x = { ...values, values2 };

      submitForm(x);
    },
  });

  const submitForm = async (productData) => {
    const {
      description,
      price,
      productStock,
      title,
      values2: {
        images,
        category,
        subCategory,
        unit,
        colors,
        size,
        weight,
        productTypeStatus,
      },
    } = productData;
    let formData = new FormData();

    images.forEach((item) => formData.append("images", item.src));
    formData.append("name", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subCategory);
    formData.append("weight", weight);
    formData.append("original_price", price);
    formData.append("no_in_stock", productStock);
    formData.append("unit", unit);
    formData.append("new", productTypeStatus);
    size.forEach((item) => formData.append("details[size][]", item));
    colors.forEach((item) => formData.append("details[color][]", item));
    formData.append("market", getMarketID(marketValue));

    try {
      setUploading(true);
      const { data } = await axiosInstance.post(
        `products/admin/addproduct/${storeID}`,
        formData
      );
      if (data) {
        toast.success("Product was successfully added");
        setTimeout(() => {
          setUploading(false);
          navigate(0);
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response);
        toast.warning(`${error.response.data.message}`);
      } else {
        console.error(error);
        toast.error(`${error}`);
      }
    } finally {
      setUploading(false);
    }
  };

  // helper function to get categories, getStoresPerMarket, subCategories, weightClass, productType
  const getMarketCategories = async (marketValue) => {
    setStoreValue("");
    const marketID = getMarketID(marketValue);
    try {
      let res = await axiosInstance.get(`categories/market/${marketID}`);
      localStorage.setItem("marketCategories", JSON.stringify(res.data.data));
      let category = res.data.data.map((item) => item.name);
      setCategories(category);
    } catch (error) {
      if (error.response) {
        console.error(error.response);
      } else {
        console.error(error);
      }
    }
  };

  const getSubCategories = (categoryValue) => {
    let marketData = JSON.parse(localStorage.getItem("marketCategories"));
    let findMarket = marketData.find((item) => item.name === categoryValue);
    let subCategoryData = findMarket.subcategories;
    let subCategory = findMarket.subcategories.map((item) => item.name);
    setSubCategory(subCategory);
    setSubCategoryData(subCategoryData);
  };

  const getProductTypeBoolean = (value) => {
    if (value === "New") {
      return true;
    } else {
      return false;
    }
  };

  const getWeightClass = (categoryValue) => {
    let marketData = JSON.parse(localStorage.getItem("marketCategories"));
    let findMarket = marketData.find((item) => item.name === categoryValue);
    let weightList = findMarket.weight.map((item) => item.name); // maps real-time weight class
    setWeightClass(weightList); // renders real-time weight class
  };

  // update states for forms
  const selectMarket = (value) => {
    setMarketValue(value);
    getMarketCategories(value);
    getMarketID(value);
  };

  const selectCategory = (value) => {
    setCategoryValue(value);
    getSubCategories(value);
    getWeightClass(value);
  };

  const selectSubCategory = (value) => {
    setSubCategoryValue(value);
  };

  const selectWeightClass = (value) => {
    setWeightClassValue(value);
  };

  const chooseSize1 = (value) => {
    if (currentSize.size1.includes(value)) {
      setCurrentSize((prevState) => {
        return {
          ...prevState,
          size1: currentSize.size1.filter((item) => item !== value),
        };
      });
    } else {
      setCurrentSize((prevState) => {
        return { ...prevState, size1: [...currentSize.size1, value] };
      });
    }
  };

  const chooseSize2 = (value) => {
    if (currentSize.size2.includes(value)) {
      setCurrentSize((prevState) => {
        return {
          ...prevState,
          size2: currentSize.size2.filter((item) => item !== value),
        };
      });
    } else {
      setCurrentSize((prevState) => {
        return { ...prevState, size2: [...currentSize.size2, value] };
      });
    }
  };

  const removeSize1 = (value) => {
    if (currentSize.size1.includes(value)) {
      setCurrentSize((prevState) => {
        return {
          ...prevState,
          size1: currentSize.size1.filter((item) => item !== value),
        };
      });
    }
  };

  const removeSize2 = (value) => {
    if (currentSize.size2.includes(value)) {
      setCurrentSize((prevState) => {
        return {
          ...prevState,
          size2: currentSize.size2.filter((item) => item !== value),
        };
      });
    }
  };

  const chooseColor = (value) => {
    if (colors.includes(value)) {
      setColors(colors.filter((item) => item !== value));
    } else {
      setColors([...colors, value]);
    }
  };

  const removeColor = (value) => {
    if (colors.includes(value)) {
      setColors(colors.filter((item) => item !== value));
    }
  };

  const selectProductType = (value) => {
    setProductType(value);
  };

  const selectUnit = (value) => {
    setUnit(value);
  };

  // helper functions to get IDs
  const getCategoryId = (category) => {
    let marketData = JSON.parse(localStorage.getItem("marketCategories"));
    let findMarket = marketData.find((item) => item.name === category);
    return findMarket._id;
  };

  const getSubCategoryId = (subCategoryValue) => {
    let findMarket = subCategoryData.find(
      (item) => item.name === subCategoryValue
    );
    return findMarket._id;
  };

  const getStoreId = useCallback((storeValue) => {
    const storesData = JSON.parse(localStorage.getItem("storesPerMarket"));
    const findStore = storesData.find((item) => item.store_name === storeValue);
    setStoreID(findStore?.store_id);
  }, []);

  const getMarketID = (marketValue) => {
    if (marketValue !== "") {
      let marketData = JSON.parse(localStorage.getItem("marketData"));
      let findMarket = marketData.find((item) => item.name === marketValue);
      return findMarket.id;
    }
  };

  // handle store search
  const handleSearch = (value) => {
    setSearchStoreValue(value);
    return value;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    let imageList = images;
    [imageList[result.source.index], imageList[result.destination.index]] = [
      imageList[result.destination.index],
      imageList[result.source.index],
    ];
    return setImages(imageList);
  };

  // open and close crop modal
  const handleCropImageModalVisiblity = (action, payload) => {
    switch (action) {
      case "SHOW_CROP_IMAGE_MODAL":
        setCropModal((old) => ({
          ...old,
          isActive: true,
          activeImage: payload,
        }));
        // setModalId(modalId);
        break;
      case "CLOSE_CROP_IMAGE_MODAL":
        setCropModal((old) => ({ ...old, isActive: false, activeImage: null }));
        break;
      default:
        console.log("Invalid action");
        break;
    }
  };

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
      original: cropModal.activeImage?.original
        ? { ...cropModal.activeImage?.original, zoom, crop, aspect }
        : { ...cropModal.activeImage, zoom, crop, aspect },
    };

    if (croppedImage.original.type === "newImage") {
      let newImages = [...images];
      // Find index of active image in newImages array
      let index = newImages.findIndex(
        (item) => item.src === cropModal.activeImage.src
      );
      [newImages[index]] = [croppedImage];
      setImages(newImages);
      setCropModal((old) => ({ ...old, activeImage: croppedImage }));
    }
    toast.success("Image cropped successfully");
  };

  // reset crop on single image
  const handleResetCrop = (image) => {
    let newImages = [...images];
    let index = newImages.findIndex(
      (item) => item.src === cropModal.activeImage.src
    );
    [newImages[index]] = [
      { ...image.original, zoom: null, crop: null, aspect: null },
    ];
    setImages(newImages);
    setCropModal((old) => ({
      ...old,
      activeImage: {
        ...image.original,
        zoom: null,
        crop: null,
        aspect: null,
      },
    }));
    return toast.success("Image reset successfully");
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const getMarkets = async () => {
        try {
          let res = await axiosInstance.get("markets/getAllMarkets");
          localStorage.setItem("marketData", JSON.stringify(res.data.data));
          let markets = res.data.data.map((item) => item.name);
          setMarkets(markets);
        } catch (error) {
          if (error.response) {
            toast.warning(`${error.response.data.message}`);
          } else {
            toast.error(`${error}`);
          }
        }
      };

      getMarkets();
    }
  }, []);

  // compute storeID
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (storeValue !== "") {
        getStoreId(storeValue);
      } else if (storeValue === "") {
        setStoreID("");
      }
    }

    return () => {
      mounted = false;
    };
  }, [getStoreId, storeValue]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-11/12 pt-10 mx-auto font-Regular">
        {cropModal.isActive && (
          <CropImageModal
            handleCropImageModalVisiblity={handleCropImageModalVisiblity}
            activeImage={cropModal.activeImage}
            handleSetCropImage={handleSetCropImage}
            cropInit={cropModal.activeImage?.original?.crop}
            aspectInit={cropModal.activeImage?.original?.aspect}
            zoomInit={cropModal.activeImage?.original?.zoom}
            handleResetCrop={handleResetCrop}
          />
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full pb-20 lg:flex lg:justify-between lg:h-vh80"
        >
          <ImagesBody
            images={images}
            deleteImage={deleteImage}
            chooseImage={chooseImage}
            handleOnDragEnd={handleOnDragEnd}
            handleCropImageModalVisiblity={handleCropImageModalVisiblity}
          />
          <FormBody
            formik={formik}
            markets={markets}
            marketValue={marketValue}
            selectMarket={selectMarket}
            getMarketID={getMarketID}
            searchStoreValue={searchStoreValue}
            setStoreValue={setStoreValue}
            handleSearch={handleSearch}
            categories={categories}
            categoryValue={categoryValue}
            selectCategory={selectCategory}
            subCategory={subCategory}
            subCategoryValue={subCategoryValue}
            selectSubCategory={selectSubCategory}
            weightClass={weightClass}
            selectWeightClass={selectWeightClass}
            weightClassValue={weightClassValue}
            storeID={storeID}
            productType={productType}
            selectProductType={selectProductType}
            productSizeArr={productSizeArr}
            productSizeArr2={productSizeArr2}
            unit={unit}
            selectUnit={selectUnit}
            chooseSize1={chooseSize1}
            chooseSize2={chooseSize2}
            currentSize={currentSize}
            removeSize1={removeSize1}
            removeSize2={removeSize2}
            colors={colors}
            chooseColor={chooseColor}
            removeColor={removeColor}
            uploading={uploading}
            handleOnDragEnd={handleOnDragEnd}
          />
        </form>
      </div>
    </>
  );
};

export default AddProducts;
