import ScreenHeader from "../Common/ScreenTitle/ScreenHeader";
import { IoMdAdd } from "react-icons/io";
const UnPScreenHeader = ({ handleSetModal }) => {
  return (
    <div>
      <div className={`flex flex-row gap-4 items-center w-max`}>
        <ScreenHeader title={"Users & Permissions"} noVal />
        <button
          className="pb-10 pt-5 flex flex-row items-center gap-2 font-semibold"
          onClick={() => handleSetModal(`SHOW_CREATE_USER`)}
        >
          <span className="bg-primary-dark text-white-main p-3 w-max h-max rounded-full flex items-center justify-center cursor-pointer text-2xl">
            <IoMdAdd />
          </span>
          <span className="text-primary-dark text-sm w-max">Add new user</span>
        </button>
      </div>
    </div>
  );
};

export default UnPScreenHeader;
