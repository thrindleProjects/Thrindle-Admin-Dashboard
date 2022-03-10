import React from 'react';
import styled from 'styled-components';
import Loader from '../Loader/Loader';

const LoginBtn = (props) => {
  return (
    <MainPagination className='w-full'>
      <button
        type='submit'
        className='flex flex-row w-full cancel rounded-md border border-secondary-yellow text-white-main outline-none focus:outline-none mr-5 lg:mb-0 mb-5 bg-secondary-yellow hover:opacity-80'
        onClick={props.onClick}
      >
        {props.isLoading ? (
          <Loader />
        ) : (
          <p className='text-base font-Regular text-center capitalize'>
            {props.title}
          </p>
        )}
      </button>
    </MainPagination>
  );
};

export default LoginBtn;

const MainPagination = styled.div`
  .cancel {
    height: 45px;
    align-items: center;
    justify-content: center;

    transition: all 0.3s ease-in-out;
  }
`;
