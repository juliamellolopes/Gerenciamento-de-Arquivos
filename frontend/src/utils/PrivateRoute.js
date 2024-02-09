import React from "react";
import { Route, Navigate } from "react-router-dom";
import { authenticateUser } from "./AuthenticateUser";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = authenticateUser();

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
