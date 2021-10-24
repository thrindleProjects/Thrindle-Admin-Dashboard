import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoutes = ({ component: Component, ...restOfProps }) => {
  let isAuthenticated = true;
  //   document.title = title || "Thrindle Dashboard";
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoutes;
