import * as constants from '../../../redux/constants/index';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaRegBell,
  FaAngleDown,
  FaSearch,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import User from '../../../assets/images/image.jpg';
import Image from '../../../assets/images/profile.svg';
import Image1 from '../../../assets/images/settings2.svg';
import Image2 from '../../../assets/images/logout.svg';
import Image3 from '../../../assets/images/noti-settings.svg';
import Image4 from '../../../assets/images/noti.svg';
import Logo from '../../../assets/images/About.png';
import './MainContainer.css';
import SingleNavItem from '../../Navbar/SingleNavItem';
import { data2 } from '../../Navbar/navData';
import { useSelector, useDispatch } from 'react-redux';

const MainContainer = (props) => {
  const [showNav, setShowNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const closeSideNav = () => {
    setShowSideNav(false);
  };
  const { name, email } = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const [noti, setNoti] = useState(false);
  document.title = props.title || 'Thrindle Dashboard';

  return (
    <MainCont showNav={showNav} className='w-full font-Regular'>
      <TopNav className='w-full flex flex-row  px-9 fixed top-0 z-50 bg-white-main left-0 right-0'>
        <div
          className={
            showNav
              ? 'nav-inputs-cont rounded-md showNav'
              : 'nav-inputs-cont rounded-md'
          }
        >
          <input
            type='text'
            placeholder='Search'
            className='w-full flex pl-5 flex-row h-full nav-input rounded-md text-lg text-white-text outline-none focus:outline-none'
          />
        </div>
        {/* LAPTOP CCONTENT */}
        <div className='logo-cont lg:hidden'>
          <img src={Logo} alt='Thrindle Logo' className='block w-full h-full' />
        </div>
        <FaBars
          className='bar-icon text-2xl text-primary-dark cursor-pointer lg:hidden'
          onClick={() => setShowSideNav(true)}
        />

        <div className='user-cont'>
          <div
            className='search-cont mr-6 flex flex-row cursor-pointer'
            onClick={() => setShowNav(!showNav)}
          >
            <FaSearch className=' text-xl text-white-text bell-icon' />
          </div>
          <div
            onClick={() => setNoti(!noti)}
            className='noti-bell mr-6 flex flex-row cursor-pointer'
          >
            <FaRegBell className='text-xl text-white-text bell-icon ' />
            {/* NOTIFICATION DROPDOWN */}
            <div
              className={
                noti
                  ? 'bg-white-main w-full showNav absolute rounded-md  top-14 notification-dropdown '
                  : 'bg-white-main w-full absolute rounded-md  top-14 notification-dropdown '
              }
            >
              <div className='w-full h-64 relative'>
                <div className='w-full h-full px-5 pt-5'>
                  <div className='w-full align-middle justify-between  flex flex-row'>
                    <p className='text-lg text-white-text font-Bold'>
                      Notification
                    </p>
                    <img src={Image3} alt='settings-icon' className='block' />
                  </div>
                  <div className='w-full pt-10 flex flex-col align-middle justify-center '>
                    <img
                      src={Image4}
                      alt='settings-icon'
                      className='block w-14 h-14 mx-auto'
                    />
                    <p className='text-white-text text-sm font-Bold text-center mt-3'>
                      Omo! you no get notification jare
                    </p>
                  </div>
                </div>
                <NavLink
                  to='/notifications'
                  exact
                  onClick={() => setNoti(false)}
                  className='absolute bottom-0 w-full h-10 rounded-md bg-secondary-yellow flex flex-row noti-bottom'
                >
                  <p className='text-white-main text-sm font-Medium'>
                    Show all notifications
                  </p>
                </NavLink>
              </div>
            </div>
          </div>
          <div className='sub-user relative'>
            <img src={User} alt='user' className='user block' />
            <div>
              <p className='user-name capitalize text-white-text text-sm ml-2'>
                {name}
              </p>
              <p className='user-name lowercase text-white-text text-xs ml-2'>
                {email}
              </p>
            </div>
            <FaAngleDown
              className='text-secondary-light text-md ml-2 block mt-1 cursor-pointer'
              onClick={() => setDropdown(!dropdown)}
            />
            <div
              className={
                dropdown
                  ? 'w-full absolute bg-white-main pb-5 top-12 rounded-md sub-dropdown showNav '
                  : 'w-full absolute bg-white-main pb-5 top-12 rounded-md sub-dropdown '
              }
            >
              <div className='w-full flex flex-row px-3 sub-user-cont pb-4 pt-4'>
                <img src={User} alt='user' className='user small-user block' />
                <div>
                  <p className='user-name  capitalize text-white-text text-sm ml-2'>
                    {name}
                  </p>
                  <p className='user-name lowercase text-primary-dark text-xs ml-2'>
                    {email}
                  </p>
                </div>
              </div>
              <div className='w-full pt-2 '>
                {/* SINGLE */}
                <NavLink
                  to='/profile'
                  onClick={() => setDropdown(false)}
                  className='single-dropdown flex flex-row w-full px-3'
                  activeClassName='nav-profile-dropdown'
                >
                  <img
                    src={Image}
                    alt='icon'
                    className='block mr-5 single-dropdown-icon'
                  />
                  <p className='text-left dropdown-text text-sm font-Bold'>
                    Admin Profile
                  </p>
                </NavLink>
                {/* SINGLE */}
                <NavLink
                  to='/settings'
                  onClick={() => setDropdown(false)}
                  className='single-dropdown flex flex-row w-full px-3'
                  activeClassName='nav-profile-dropdown'
                >
                  <img
                    src={Image1}
                    alt='icon'
                    className='block mr-5 single-dropdown-icon'
                  />
                  <p className='text-left dropdown-text text-sm font-Bold'>
                    Settings
                  </p>
                </NavLink>
                {/* SINGLE */}
                <div
                  onClick={() => {
                    setDropdown(false);
                    dispatch({ type: constants.ADMIN_LOGOUT });
                  }}
                  className='single-dropdown flex flex-row w-full px-3'
                >
                  <img
                    src={Image2}
                    alt='icon'
                    className='block mr-5 single-dropdown-icon'
                  />
                  <p className='text-left dropdown-text text-sm font-Bold'>
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TopNav>
      {/* {showSideNav && ( */}
      <SideNav
        onClick={() => setShowSideNav(false)}
        id='main-side-nav'
        className={
          !showSideNav
            ? 'side-nav w-screen h-screen fixed top-0 bottom-0 left-0 right-0'
            : 'side-nav active w-screen h-screen fixed top-0 bottom-0 left-0 right-0 '
        }
      >
        <div className='side-nav-cont bg-white-main  h-full'>
          <FaTimes
            className='side-nav-icon absolute'
            id='close-side-nav-icon'
            onClick={() => setShowSideNav(false)}
          />
          <div className='side-nav-logo'>
            <img
              src={Logo}
              alt='main-logo'
              className='side-logo w-full h-full'
            />
          </div>
          <div className='side-nav-links overflow-auto'>
            {data2.map((item, index) => (
              <SingleNavItem {...item} key={index} closeNav={closeSideNav} />
            ))}
          </div>
        </div>
      </SideNav>
      <MainContent className='w-full '>
        {/* MOBILE SEARCH */}
        <SearchCont2 className='inputCont2 bg-white-main mb-10 mt-5 rounded-xl lg:hidden'>
          <div className='icon-cont2 '>
            <FaSearch className='text-white-text text-base' />
          </div>
          <input placeholder='Search' className='search-input2 ml-2' />
        </SearchCont2>
        {props.children}
      </MainContent>
    </MainCont>
  );
};

export default MainContainer;

const MainCont = styled.div`
  padding-left: 21%;
  // background: #e5e5e5;
  @media (max-width: 1000px) {
    padding-left: 0px;
  }
`;

const TopNav = styled.div`
  border-bottom: 1px solid #c2c2c2;
  // padding: 15px 10px;
  // z-index: 200;
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
  align-items: center;
  height: 55px;
  justify-content: space-between;
  // justify-content: flex-end;
  .user-cont,
  .sub-user {
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  .user {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
  .noti-bottom {
    align-items: center;
    justify-content: center;
  }
  .small-user {
    width: 35px;
    height: 35px;
    border-radius: 35px;
  }
  .user-cont {
    width: 40%;
    justify-content: flex-end;
    @media (max-width: 1100px) {
      width: 50%;
    }
  }
  .sub-dropdown {
    box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
    transform: translateY(-500px);
    transition: all 0.5s ease-in-out;
    z-index: 300;
    opacity: 0;
    // transform: translateY(-200px);
  }
  .sub-user-cont {
    border-bottom: 1px solid #e0e0e0;
  }
  .single-dropdown {
    align-items: center;
    height: 50px;
    transition: all 0.5s ease-in-out;
    &:hover {
      background: rgba(22, 88, 143, 0.3);
    }
  }
  .notification-dropdown {
    width: 30%;
    box-shadow: 0px 50px 18px 1px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateY(-500px);
    transition: all 0.5s ease-in-out;
    // top: 20;
    z-index: 300;
    @media (min-width: 2000px) {
      width: 25%;
    }
  }
  .single-dropdown-icon {
    width: 20px;
    height: 20px;
  }
  .dropdown-text {
    color: #464f54;
  }
  .noti-bell,
  .search-cont {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: #f4f4f4;
    align-items: center;
    justify-content: center;
  }
  .nav-inputs-cont {
    width: 60%;
    height: 70%;
    transition: all 0.5s ease-in-out;
    transform: translateY(-100px);
    @media (max-width: 1100px) {
      width: 50%;
    }
  }
  .showNav {
    transform: translateY(0px);
    opacity: 1;
  }
  .showNav2 {
    opacity: 1;
    transform: translateY(0%);
  }
  .nav-input {
    background: #f4f4f4;
    align-items: center;

    &::placeholder {
      font-size: 14px;
    }
  }
  @media (min-width: 1380px) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @media (min-width: 2000px) {
    padding-left: 230px;
    padding-right: 230px;
  }

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    .nav-inputs-cont {
      display: none;
    }

    .user-cont {
      display: none;
    }
    .logo-cont {
      width: 120px;
      height: 30px;
    }
  }
  @media (max-width: 600px) {
    padding: 0px 15px;
  }
`;

const MainContent = styled.div`
  padding: 80px 30px;
  @media (min-width: 1380px) {
    padding: 100px 80px;
  }
  @media (min-width: 2000px) {
    padding: 100px 230px;
  }
  @media (max-width: 1000px) {
    padding: 80px 20px;
  }
  @media (max-width: 600px) {
    padding: 80px 15px;
  }
`;
const SearchCont2 = styled.div`
  display: none;
  height: 48px;
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
  .icon-cont2 {
    width: 5%;
  }
  .search-input2 {
    background: transparent;
    border: 0px;
    width: 85%;
    color: #211c33;

    &::placeholder {
      color: #bbb7ca;
      font-size: 14px;
    }
    &:focus {
      outline: none !important;
      border: 0px !important;
    }
  }
  @media (max-width: 1000px) {
    // margin: 15px;
    display: flex;
    align-items: center;
    height: 40px;
  }
`;

const SideNav = styled.div`
  z-index: 900;
  .side-nav-cont {
    width: 70%;
  }
  .side-nav-icon {
    right: 50px;
    top: 30px;
    color: #fff;
    font-size: 3rem;
  }
  .side-nav-logo {
    height: 25%;
    align-items: center;
    justify-content: center;
    display: flex;
    box-shadow: 0px 4px 4px 12px rgba(0, 0, 0, 0.1);
  }
  .side-logo {
    width: 160px;
    height: 32px;
  }
  .side-nav-links {
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10%;
    // justify-content: center;
  }
  @media (max-width: 1000px) {
  }
  @media (max-width: 650px) {
    .side-nav-cont {
      width: 80%;
    }
    .side-nav-icon {
      right: 10px;
      top: 20px;
      color: #fff;
      font-size: 2.5rem;
    }
  }
`;
