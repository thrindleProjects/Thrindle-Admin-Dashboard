import React from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import { FaPen } from "react-icons/fa";
import CustomInputs from "../../components/Common/CustomInput/CustomInput";
import ProfileBtn from "../../components/Common/Button/ProfileBtn";

const Profile = () => {
  return (
    <MainContainer>
      <ScreenHeader title="Profile" noVal />
      <MainCont className="w-full rounded md:px-10 px-5 py-10 ">
        <div className="w-full flex flex-row title-cont">
          <p className="text-base font-Regular text-white-text">
            Profile Information
          </p>
          <div className="edit-cont flex flex-row cursor-pointer">
            <FaPen className="text-base text-primary-dark mr-2 " />
            <p className="text-base font-Regular text-primary-dark">Edit</p>
          </div>
        </div>
        <form className="w-full md:grid md:grid-cols-2 xl:gap-10 md:gap-10 mt-10">
          <CustomInputs placeholder="Name" />
          <div className="w-full">
            <CustomInputs placeholder="Email" mb={0} />
            <p className="text-primary-dark text-sm mt-2 pl-2 xl:text-sm font-Bold cursor-pointer md:mb-0 mb-5">
              Change email address
            </p>
          </div>
          <CustomInputs placeholder="Phone Number" />
          <CustomInputs placeholder="Gender" />
          <CustomInputs placeholder="Admin Role" />
          <CustomInputs placeholder="Users Permission" />
        </form>
        <ProfileBtn cancelText="Cancel " deleteText="Save Changes" />
      </MainCont>
    </MainContainer>
  );
};

export default Profile;

const MainCont = styled.div`
  background: #fcfcfc;
  .title-cont,
  .edit-cont {
    align-items: center;
    justify-content: space-between;
  }
`;
