import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPasswordInput = (props) => {
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <MainInput
      mb={props.mb}
      focus={focus}
      width={props.width}
      className='w-full '
    >
      <p className='text-sm common-input-placeholder text-white-main sm:text-base lg:text-base xl:text-base font-Medium  mb-2'>
        {props.placeholder}
      </p>
      <div className='w-full main-common-input-cont rounded-md pl-5 flex flex-row px-5'>
        <input
          id={props.id}
          //   type={props.type}
          type={show ? 'text' : 'password'}
          value={props.value}
          placeholder={props.placeholder2}
          onChange={props.onChange}
          name={props.name}
          className='main-input h-full outline-none focus:outline-none bg-transparent'
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoComplete='off'
          required
        />

        <div className='icon-cont'>
          {show ? (
            <FaEye
              className='text-white-main text-xl cursor-pointer'
              onClick={() => setShow(!show)}
            />
          ) : (
            <FaEyeSlash
              className='text-white-main text-xl cursor-pointer'
              onClick={() => setShow(!show)}
            />
          )}
        </div>
      </div>
    </MainInput>
  );
};

export default LoginPasswordInput;

const MainInput = styled.div`
  width: ${({ width }) => (width ? `${width}%` : `100%`)};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '20px')};
  .common-input-placeholder {
    width: 70%;
  }
  .main-common-input-cont {
    align-items: center;
    // background: #f2f2f9;
    border: ${({ focus }) =>
      focus ? '1.5px solid #F69F13' : '1px solid #eee'};
    height: 50px;
    justify-content: space-between;
  }
  .main-input {
    width: 100%;
    color: #fff;
  }
  @media (min-width: 2000px) {
    .common-input-placeholder {
      width: 70%;
      //   color: #27477d;
      font-size: 24px;
    }
  }
`;
