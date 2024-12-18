import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check for admin/employee routes
  if (adminOnly) {
    const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
      user?.role
    );
    if (!isAdminOrEmployee) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
