import { IoAddSharp } from "react-icons/io5";

const SmallAddImageIcon = ({ handleImageUpload }) => {
  return (
    <div className="bg-primary-main text-white-main text-2xl h-8 w-8 rounded-md">
      <input
        type="file"
        name="image"
        multiple
        id="image"
        onChange={handleImageUpload}
        className="hidden"
      />
      <label
        htmlFor="image"
        className="cursor-pointer h-full w-full flex items-center justify-center"
      >
        <IoAddSharp />
      </label>
    </div>
  );
};

export default SmallAddImageIcon;
