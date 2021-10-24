import "aos/dist/aos.css";
import React from "react";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { Switch, Route, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes/index";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AOS from "aos";

function App() {
  const location = useLocation();
  AOS.init({
    easing: "ease-in-out",
  });
  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forget-password" component={ForgetPassword} />
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
