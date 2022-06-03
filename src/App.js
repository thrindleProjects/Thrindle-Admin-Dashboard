import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { Route, useLocation, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/Auth/ForgetPassword/ResetPassword";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes/index";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AOS from "aos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  AOS.init({
    easing: "ease-in-out",
  });

  const { pathname: routeName } = location;
  useEffect(() => {
    if (
      routeName === "/login" ||
      routeName === "/login/forget-password" ||
      routeName === "/login/reset-password" ||
      routeName === "/add-products"
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [routeName]);

  return (
    <>
      <ToastContainer hideProgressBar={true} autoClose={3000} />
      {show ? "" : <Navbar />}

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/forget-password" component={ForgetPassword} />
          <Route path="/login/reset-password" component={ResetPassword} />
          {routes.map(({ path, component }, index) => (
            <Route
              path={path}
              key={index}
              element={<ProtectedRoutes component={component} />}
            />
          ))}
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
