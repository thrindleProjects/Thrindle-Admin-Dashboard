import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
// import MainContainer from "../../../components/common/mainContainer/mainContainer";
import axiosInstance from "../../utils/axiosInstance";
import {
  productTypeArr,
  unitsArr,
  productSizes,
  productSizes2,
  mainColor,
} from "../../data/sizeAndColor";
import { Error } from "../../styles/globalStyles";
// import { useDispatch } from "react-redux";
// import { showNotification } from "../../redux/actions/statusNotifications";
import AddProductBtn from "../../components/Common/Button/AddProductBtn";
import Dropdown from "../../components/Common/Dropdown/Dropdown";
import InputWithFieldSet from "../../components/Common/Input/InputWithFieldSet";
import TextArea from "../../components/Common/Input/TextArea";
import DoubleDropdown from "../../components/Common/Input/DoubleDropdown";
import SingleDropdown from "../../components/Common/Input/SingleDropdown";
import DisplayImages from "../../components/DisplayImages/DisplayImages";
import AddImageContainer from "../../components/AddImageContainer/AddImageContainer";
import NavBar from "../../components/Common/NavBar/NavBar";

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
  const [size1, setSize1] = useState([]);
  const [size2, setSize2] = useState([]);
  const [colors, setColors] = useState([]);
  const [productType, setProductType] = useState("");
  const [otherValues, setOtherValues] = useState({});
  const [uploading, setUploading] = useState(false);
  const [stores, setStores] = useState([]);
  const [storeValue, setStoreValue] = useState("");
  const [storeID, setStoreID] = useState("");
  const productSizeArr = productSizes.map((item) => item.title);
  const productSizeArr2 = productSizes2.map((item) => item.title);

  // const dispatch = useDispatch();
  const history = useHistory();

  // functions for image upload & delete
  const chooseImage = (event) => {
    const imageList = event.target.files[0];
    if (imageList && imageList.type.startsWith("image")) {
      let updatedList = [...images, imageList];
      setImages(updatedList);
    } else {
      // dispatch(
      //   showNotification({
      //     notify: {
      //       status: 2,
      //       message: "Please select a file of image type",
      //     },
      //   })
      // );
    }
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
        .max(25, "Title cannot exceed 25 characters")
        .required("Required"),
      description: Yup.string()
        .min(10, "Too Short")
        .max(240, "Description cannot exceed 240 characters")
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
        size: [...size1, ...size2],
        weight: weightClassValue,
        productTypeStatus: storeID.startsWith("EM")
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

    images.forEach((item) => formData.append("images", item));
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

      console.log(data);
      if (data) {
        setTimeout(() => {
          setUploading(false);
          history.push("/");
          // dispatch(
          //   showNotification({
          //     notify: {
          //       status: 1,
          //       message: "Your product was successfully added",
          //     },
          //   })
          // );
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        // dispatch(
        //   showNotification({
        //     notify: {
        //       status: 2,
        //       message: `${error.response.data.message}`,
        //     },
        //   })
        // );
      } else {
        console.log(error);
        // dispatch(
        //   showNotification({
        //     notify: {
        //       status: 0,
        //       message: "Please check that you're connected",
        //     },
        //   })
        // );
      }
    }
  };

  // helper function to get categories, getStoresPerMarket, subCategories, weightClass, productType
  const getMarketCategories = async (marketValue) => {
    const marketID = getMarketID(marketValue);
    try {
      let res = await axiosInstance.get(`categories/market/${marketID}`);
      localStorage.setItem("marketCategories", JSON.stringify(res.data.data));
      let category = res.data.data.map((item) => item.name);
      setCategories(category);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  const getStoresPerMarket = async (marketValue) => {
    const marketID = getMarketID(marketValue);
    try {
      let res = await axiosInstance.get(`/stores/storespermarket/${marketID}`);
      localStorage.setItem("storesPerMarket", JSON.stringify(res.data.data));
      let stores = res.data.data.map((item) => item.store_name);
      setStores(stores);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log(error);
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
    getStoresPerMarket(value);
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

  const selectStore = (value) => {
    setStoreValue(value);
    getStoreId(value);
  };

  const chooseSize1 = (value) => {
    if (size1.includes(value)) {
      setSize1(size1.filter((item) => item !== value));
    } else {
      setSize1([...size1, value]);
    }
  };

  const chooseSize2 = (value) => {
    if (size2.includes(value)) {
      setSize2(size2.filter((item) => item !== value));
    } else {
      setSize2([...size2, value]);
    }
  };

  const chooseColor = (value) => {
    if (colors.includes(value)) {
      setColors(colors.filter((item) => item !== value));
    } else {
      setColors([...colors, value]);
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

  const getStoreId = (storeValue) => {
    const storesData = JSON.parse(localStorage.getItem("storesPerMarket"));
    const findStore = storesData.find((item) => item.store_name === storeValue);
    setStoreID(findStore.store_id);
  };

  const getMarketID = (marketValue) => {
    if (marketValue !== "") {
      let marketData = JSON.parse(localStorage.getItem("marketData"));
      let findMarket = marketData.find((item) => item.name === marketValue);
      return findMarket.id;
    }
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
            console.log(error.response);
          } else {
            console.log(error);
          }
        }
      };

      getMarkets();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-11/12 pt-20 mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full pb-20 lg:flex lg:justify-between lg:h-[75vh]"
        >
          <div className="w-full lg:w-55">
            <p className="text-white-text pb-4 font-Bold md:text-base text-sm">
              Product Listing
            </p>
            {images.length !== 0 ? (
              <DisplayImages
                imageList={images}
                deleteImage={(val) => deleteImage(val)}
                onChange={chooseImage}
              />
            ) : (
              <div className="border-0.98 border-dashed border-primary-main rounded-md flex flex-col items-center justify-center md:py-24 py-10 xl:px-10 md:px-10 px-5">
                <AddImageContainer onChange={chooseImage} required={true} />

                <p className="md:text-sm text-xs text-white-lightGray font-Bold pt-5">
                  You can attach multiple images (1-6) 500px by 500px
                </p>
              </div>
            )}
          </div>

          <div className="w-full lg:w-40 lg:overflow-y-scroll md:pr-4">
            <div className="my-3">
              <InputWithFieldSet
                type="text"
                id="title"
                name="title"
                fieldset="Product title"
                placeholder="Enter product title"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Error>
                {formik.errors.title && formik.touched.title ? (
                  <>{formik.errors.title}</>
                ) : null}
              </Error>
            </div>

            <div className="my-3">
              <TextArea
                type="textarea"
                fieldset="Description"
                id="description"
                name="description"
                placeholder="Enter product description"
                rows={3}
                value={formik.values.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Error>
                {formik.errors.description && formik.touched.description ? (
                  <>{formik.errors.description}</>
                ) : null}
              </Error>
            </div>

            <div className="my-3">
              <Dropdown
                fieldset="Market"
                list={markets}
                id="market"
                name="market"
                emptyValue="Choose a Market"
                value={marketValue}
                onChange={(value) => selectMarket(value)}
                required={true}
              />
            </div>

            <div className="my-3">
              <Dropdown
                fieldset="Stores"
                list={stores}
                id="store"
                name="store"
                emptyValue="Choose a store"
                value={storeValue}
                onChange={(val) => selectStore(val)}
                required={true}
              />
            </div>

            <div className="my-3">
              <Dropdown
                fieldset="Category"
                list={categories}
                id="category"
                name="category"
                emptyValue="Choose a Category"
                value={categoryValue}
                onChange={(value) => selectCategory(value)}
                required={true}
              />
            </div>

            <div className="my-3">
              <Dropdown
                fieldset="Sub Category"
                list={subCategory}
                id="subCategory"
                name="subCategory"
                emptyValue="Choose a Sub Category"
                value={subCategoryValue}
                onChange={(value) => selectSubCategory(value)}
                required={true}
              />
            </div>

            <div className="my-3">
              <Dropdown
                weightClass={true}
                fieldset="Weight Class"
                list={weightClass}
                id="weightClass"
                name="weightClass"
                emptyValue="Choose a Weight Class"
                value={weightClassValue}
                onChange={(value) => selectWeightClass(value)}
                required={true}
              />
            </div>

            {storeID.startsWith("CV") && (
              <div className="my-3">
                <Dropdown
                  fieldset="Product type"
                  list={productTypeArr}
                  id="productType"
                  name="productType"
                  emptyValue="Select an option"
                  value={productType}
                  onChange={(value) => selectProductType(value)}
                  required={true}
                />
              </div>
            )}

            <div className="my-3">
              <InputWithFieldSet
                type="number"
                id="productStock"
                name="productStock"
                fieldset="Product Stock"
                placeholder="Number of product in stock"
                value={formik.values.productStock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Error>
                {formik.errors.productStock && formik.touched.productStock ? (
                  <>{formik.errors.productStock}</>
                ) : null}
              </Error>
            </div>

            <div className="my-3">
              <Dropdown
                fieldset="Unit"
                list={unitsArr}
                id="unit"
                name="unit"
                emptyValue="Choose a unit"
                value={unit}
                onChange={(val) => selectUnit(val)}
                required={true}
              />
            </div>

            <div className="my-3">
              <InputWithFieldSet
                type="number"
                id="price"
                name="price"
                fieldset="Price"
                placeholder="Enter Product Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Error>
                {formik.errors.price && formik.touched.price ? (
                  <>{formik.errors.price}</>
                ) : null}
              </Error>
            </div>

            <div className="flex my-3">
              <DoubleDropdown
                fieldset="Sizes"
                list1={productSizeArr}
                list2={productSizeArr2}
                emptyState1="e.g Small"
                emptyState2="e.g 30"
                onChange1={(value) => chooseSize1(value)}
                onChange2={(value) => chooseSize2(value)}
              />
            </div>

            <div className="flex my-3">
              <SingleDropdown
                fieldset="Colors"
                colors={mainColor}
                emptyState="Product Color"
                onChange={(value) => chooseColor(value)}
              />
            </div>

            <div className="my-6">
              <AddProductBtn
                blueBg
                longButton
                text="Add product"
                type="submit"
                processing={uploading}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProducts;