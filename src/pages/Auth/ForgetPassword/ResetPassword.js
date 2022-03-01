import React from "react";
import styled from "styled-components";
import Bg from "../../../assets/images/Login.png";
import Logo from "../../../assets/images/thrindle.png";
import LoginBtn from "../../../components/Common/Button/LoginBtn";
import LoginPasswordInput from "../../../components/Common/CustomInput/LoginPasswordInput";

const ResetPassword = () => {
  return (
    <MainCont className="w-screen h-screen flex flex-col">
      <div className="logo-cont">
        <img src={Logo} alt="Thrindle Logo" className="block" />
      </div>
      <h6 className="text-lg text-white-main text-center font-Bold mt-5 tracking-widest">
        Set New Password
      </h6>
      <p className="text-white-main sm:text-sm text-xs  main-text font-Regular mt-5">
        Set a new password , ensures it’s 8 characters long and must contain
        atleast one number e.g darkweb1
      </p>
      <form className=" mt-10 w-1/2 login-input flex flex-col">
        <LoginPasswordInput placeholder="New Password" />
        <LoginPasswordInput placeholder="Confirm Password" />

        <div className="login-btn mt-10">
          <LoginBtn title="Submit Password" />
        </div>
      </form>
      <div className="flex flex-row absolute login-footer bottom-10">
        <p className="md:text-base text-sm text-white-main font-Regular md:mr-10 mr-5">
          © thrindle
        </p>
        <p className="md:text-base text-sm text-white-main font-Regular md:mr-10 mr-5">
          Privacy & Terms
        </p>
        <p className="md:text-base text-sm text-white-main font-Regular">
          Contact us
        </p>
      </div>
    </MainCont>
  );
};

export default ResetPassword;

const MainCont = styled.div`
  background: url(${Bg});
  align-items: center;
  justify-content: center;
  .login-input {
    align-items: center;
  }
  .forget-cont {
    align-items: flex-end;
  }
  .login-btn {
    width: 100%;
  }
  .login-footer {
    align-items: center;
  }
  @media (min-width: 2000px) {
    .login-input {
      width: 20% !important;
    }
    .main-text {
      width: 20% !important;
    }
  }
  @media (max-width: 2000px) {
    .login-input {
      width: 30% !important;
    }
    .main-text {
      width: 30% !important;
    }
  }
  @media (max-width: 1050px) {
    .login-input {
      width: 50% !important;
    }
    .main-text {
      width: 50% !important;
    }
  }
  @media (max-width: 600px) {
    .login-input {
      width: 80% !important;
    }
    .main-text {
      width: 80% !important;
    }
  }
  @media (max-width: 350px) {
    .login-input {
      width: 90% !important;
    }
    .main-text {
      width: 90% !important;
    }
  }
`;
