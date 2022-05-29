import { IoCloseCircleOutline } from "react-icons/io5";

const NewBigImage = ({ activeImage, handleImageDelete }) => {
  return (
    <div className="h-full relative flex-shrink-0">
      <img
        className="object-contain h-full rounded-md flex-shrink-0"
        src={URL.createObjectURL(activeImage.src)}
        onLoad={() => URL.revokeObjectURL(activeImage.src)}
        alt={`Product`}
      />
      <div
        className="bg-primary-main rounded-full cursor-pointer absolute top-0 right-0 w-max text-2xl transform translate-x-1/2 -translate-y-1/2"
        onClick={(e) => {
          let imageurl = activeImage.src;
          handleImageDelete(e, imageurl, activeImage.type);
        }}
      >
        <IoCloseCircleOutline className="text-white-main" />
      </div>
    </div>
  );
};

export default NewBigImage;
