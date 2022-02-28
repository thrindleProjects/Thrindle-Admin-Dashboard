import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import { IoMdAdd } from "react-icons/io";

const UnPHeader = (props) => {
  return (
    <div className='flex flex-row items-center w-max'>
      <ScreenHeader title={props.title} noVal />
      <div className='flex flex-row gap-2 items-center w-max'>
        <span className='bg-primary-dark text-white-main text-xl p-4 rounded-full cursor-pointer flex items-center justify-center'>
          <IoMdAdd />
        </span>
        <span className='w-max'>Add new user</span>
      </div>
    </div>
  );
};

export default UnPHeader;
