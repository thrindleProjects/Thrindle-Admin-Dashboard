import React from "react";
import styled from "styled-components";
import Bg from "../../../assets/images/Login.png";
import Logo from "../../../assets/images/thrindle.png";
import LoginBtn from "../../../components/Common/Button/LoginBtn";
import LoginInput from "../../../components/Common/CustomInput/LoginInput";
import { NavLink } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <MainCont className="w-screen h-screen flex flex-col">
      <div className="logo-cont">
        <img src={Logo} alt="Thrindle Logo" className="block" />
      </div>
      <h6 className="text-lg text-white-main text-center font-Bold mt-5 tracking-widest">
        Forgot Password
      </h6>
      <p className="text-white-main sm:text-sm text-xs  main-text font-Regular mt-5">
        Have issue trying to access the dashboard, a reset link will be sent to
        the email provided below
      </p>
      <form className=" mt-10 w-1/2 login-input flex flex-col">
        <LoginInput placeholder="Email Address" />

        <div className="login-btn mt-10">
          <NavLink className="w-full" to="/login/reset-password">
            <LoginBtn title="Continue" />
          </NavLink>
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

export default ForgetPassword;

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
