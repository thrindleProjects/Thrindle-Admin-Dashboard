import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { Switch, Route, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/Auth/ForgetPassword/ResetPassword";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes/index";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AOS from "aos";
import { useHistory } from "react-router-dom";

function App() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  
  AOS.init({
    easing: "ease-in-out",
  });
  const history = useHistory();

  const {
    location: { pathname: routeName },
  } = history;
  console.log(routeName);

  useEffect(() => {
    if (
      routeName === "/login" ||
      routeName === "/login/forget-password" ||
      routeName === "/login/reset-password"
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [routeName]);

  return (
    <>
      {show ? "" : <Navbar />}

      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/login/forget-password"
            component={ForgetPassword}
          />
          <Route exact path="/login/reset-password" component={ResetPassword} />
          {routes.map((item, index) => (
            <ProtectedRoutes
              key={index}
              title={item.title}
              path={item.path}
              exact
              component={item.component}
            />
          ))}
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
