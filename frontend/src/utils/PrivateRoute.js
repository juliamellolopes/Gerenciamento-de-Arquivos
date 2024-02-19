import React from "react";
import { Navigate } from "react-router-dom";
import { authenticateUser } from "./AuthenticateUser";

const PrivateRoute = ({ children }) => {
  const user = authenticateUser();

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
