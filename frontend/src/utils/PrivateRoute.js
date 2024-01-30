import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./cookieManager";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = isAuthenticated();

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
