import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ component: Component, ...restOfProps }) => {
  const { accessToken } = useSelector((state) => state.login);

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Component {...restOfProps} />;
};

export default ProtectedRoutes;
