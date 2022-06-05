import { Error } from "../../../styles/globalStyles";
import AddProductBtn from "../../Common/Button/AddProductBtn";
import CustomDropdown from "../../Common/Dropdown/CustomDropdown";
import Dropdown from "../../Common/Dropdown/Dropdown";
import DoubleDropdown from "../../Common/Input/DoubleDropdown";
import InputWithFieldSet from "../../Common/Input/InputWithFieldSet";
import SingleDropdown from "../../Common/Input/SingleDropdown";
import TextArea from "../../Common/Input/TextArea";
import {
  productTypeArr,
  unitsArr,
  mainColor,
} from "../../../data/sizeAndColor";

const FormBody = ({
  formik,
  markets,
  marketValue,
  selectMarket,
  getMarketID,
  searchStoreValue,
  setStoreValue,
  handleSearch,
  categories,
  categoryValue,
  selectCategory,
  subCategory,
  subCategoryValue,
  selectSubCategory,
  weightClass,
  selectWeightClass,
  weightClassValue,
  storeID,
  productType,
  selectProductType,
  productSizeArr,
  productSizeArr2,
  unit,
  selectUnit,
  chooseSize1,
  chooseSize2,
  currentSize,
  removeSize1,
  removeSize2,
  colors,
  chooseColor,
  removeColor,
  uploading,
}) => {
  return (
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

      <div className="my-3 ">
        <CustomDropdown
          fieldset="Stores"
          marketValue={marketValue}
          getMarketID={getMarketID}
          searchStoreValue={searchStoreValue}
          setStoreValue={setStoreValue}
          handleSearch={(value) => handleSearch(value)}
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

      {storeID?.startsWith("CV") && (
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
          currentSize={currentSize}
          removeSize1={removeSize1}
          removeSize2={removeSize2}
        />
      </div>

      <div className="flex my-3">
        <SingleDropdown
          fieldset="Colors"
          mainColors={mainColor}
          colors={colors}
          emptyState="Product Color"
          onChange={(value) => chooseColor(value)}
          removeColor={removeColor}
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
  );
};

export default FormBody;
