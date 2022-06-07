import { IoAddSharp } from "react-icons/io5";

const SmallAddImageIcon = ({ handleImageUpload }) => {
  return (
    <div className="bg-primary-main text-white-main text-2xl h-8 w-8 rounded-md relative">
      <input
        type="file"
        name="image"
        multiple
        id="image"
        onChange={handleImageUpload}
        className="absolute w-full h-full top-0 left-0 opacity-0"
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
