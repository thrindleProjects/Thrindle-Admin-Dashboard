import styled from 'styled-components';
import { HiDownload, HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';

const SingleOrderHeader = () => {
  let history = useHistory();

  return (
    <div>
      <MainHeader className='flex flex-row justify-between pt-5 pb-10'>
        <h2 className='text-left header text-3xl font-ExtraBold mr-5'>
          Orders
        </h2>
        <div className='export-cont rounded-md flex flex-row '>
          <HiDownload className='text-primary-main text-lg mr-2' />
          <p className='text-primary-main font-Regular text-base mr-2'>
            Export
          </p>
        </div>
      </MainHeader>
      <div className='flex items-center bg-secondary-header text-white-main p-4 rounded-md h-59.26'>
        <button
          className='border border-white-main px-3 py-2 rounded-md cursor-pointer mr-4 flex items-center'
          onClick={() => history.go(-1)}
        >
          <HiOutlineArrowNarrowLeft className='inline mr-1 align-middle' />
          <span>Back</span>
        </button>
        <p>Order Details</p>
      </div>
    </div>
  );
};

export default SingleOrderHeader;

const MainHeader = styled.div`
  align-items: center;
  .header {
    color: #2f3133;
  }
  .box {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
  }
  .export-cont {
    width: 150px;
    border: 1px solid #16588f;
    height: 45px;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
  }
  @media (min-width: 2000px) {
    .header {
      font-size: 36px;
    }
  }
`;
