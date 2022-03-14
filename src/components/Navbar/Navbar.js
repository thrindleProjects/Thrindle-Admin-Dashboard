import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/About.png';
import { navData } from './navData';
import SingleNavItem from '../../components/Navbar/SingleNavItem';

const Navbar = () => {
  return (
    <>
      <SideNav1>
        <div className='imgCont py-3'>
          <img src={Logo} className='logo block' alt='Thrindle Logo' />
        </div>
        <nav className='w-full main-nav mt-10 pl-7 h-vh90 pb-20 overflow-y-auto'>
          {navData.map((item, index) => (
            <div key={index}>
              <h6 className='text-primary-main text-sm font-Heavy mb-4'>
                {item.mainNav}
              </h6>
              {item.subNav.map((item, index) => (
                <SingleNavItem {...item} key={index} />
              ))}
            </div>
          ))}
        </nav>
      </SideNav1>
    </>
  );
};

export default Navbar;
const SideNav1 = styled.div`
  min-width: 21%;
  min-height: 100vh;
  background: #f4f4f4;
  left: 0;
  top: 0 !important;
  position: fixed;
  transition: all 0.5 ease-in-out;
  z-index: 100;
  transform: translateX(0%);
  //   padding-top: 10px;

  .logo {
    width: 120px;
    height: 30px;
  }

  .imgCont {
    display: flex;
    flex-direction: row;
    padding-left: 30px;
    border-bottom: 1px solid #c2c2c2;
    // align-items: baseline;
    // width: 100%;
  }

  .logo-text {
    background: transparent;
    justify-self: flex-end;
    padding-top: 5px;
  }

  @media (max-width: 1000px) {
    display: none !important;
  }
`;
