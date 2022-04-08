import * as constants from "../../../redux/constants/index";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Bg from "../../../assets/images/Login.png";
import Logo from "../../../assets/images/thrindle.png";
import LoginBtn from "../../../components/Common/Button/LoginBtn";
import LoginInput from "../../../components/Common/CustomInput/LoginInput";
import LoginPasswordInput from "../../../components/Common/CustomInput/LoginPasswordInput";
import { NavLink } from "react-router-dom";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login_admin } from "../../../redux/actions/authActions/actions";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, isError, accessToken } = useSelector(
    (state) => state.login
  );

  // const formik = useFormik({
  //   initialValues: formData,
  //   validationSchema: Yup.object().shape({
  //     email: Yup.string().email('Invalid email').required('Required'),
  //     password: Yup.string().required('This field is required'),
  //   }),
  //   onSubmit: (values) => {
  //     console.log('something');
  //   },
  // });

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    return setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(login_admin(formData.email, formData.password));
  };

  useEffect(() => {
    if (accessToken && accessToken !== "") {
      history.push("/");
      dispatch({
        type: constants.CLEAR_DETAILS,
      });
    }
    if (isError && isError !== "") {
      toast.error(`${isError}`);
      dispatch({
        type: constants.CLEAR_DETAILS,
      });
    }
  }, [accessToken, history, isError, dispatch]);

  return (
    <MainCont className="w-screen h-screen flex flex-col">
      <div className="logo-cont">
        <img src={Logo} alt="Thrindle Logo" className="block" />
      </div>
      <h6 className="text-lg text-white-main text-center font-Bold mt-5 tracking-widest">
        Thrindle Admin Dashboard
      </h6>
      <form
        className="mt-10 w-1/2 login-input flex flex-col"
        onSubmit={handleFormSubmit}
      >
        <LoginInput
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          placeholder="Email Address"
        />
        <LoginPasswordInput
          name="password"
          value={formData.password}
          onChange={handleFormChange}
          placeholder="Password"
        />
        <div className="w-full forget-cont">
          <NavLink to="/login/forget-password">
            <p className="text-sm cursor-pointer text-secondary-yellow text-right">
              Forgot Password?
            </p>
          </NavLink>
        </div>
        <div className="login-btn mt-10">
          <LoginBtn
            isLoading={isLoading}
            onClick={handleFormSubmit}
            title="Login to Dashboard"
          />
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

export default Login;

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
  }
  @media (max-width: 2000px) {
    .login-input {
      width: 30% !important;
    }
  }
  @media (max-width: 1050px) {
    .login-input {
      width: 50% !important;
    }
  }
  @media (max-width: 600px) {
    .login-input {
      width: 80% !important;
    }
  }
  @media (max-width: 350px) {
    .login-input {
      width: 90% !important;
    }
  }
`;
