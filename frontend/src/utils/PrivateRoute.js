import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Certifique-se de ajustar o caminho conforme necessário

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
