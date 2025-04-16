import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userID = localStorage.getItem("userID"); 

  if (!userID) {
    
    return <Navigate to="/" />;
  }

  return children; 
};

export default ProtectedRoute;