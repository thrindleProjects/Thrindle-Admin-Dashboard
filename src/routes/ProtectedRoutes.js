import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ component: Component, ...restOfProps }) => {
  const { accessToken } = useSelector((state) => state.login);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoutes;
