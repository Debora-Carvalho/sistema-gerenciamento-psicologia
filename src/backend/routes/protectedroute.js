import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userID = localStorage.getItem("userID");

  if (!userID) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
