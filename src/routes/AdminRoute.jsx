import React, { useContext } from "react";
import { AuthContext } from "../components/authentication/AuthProvider";
import useUserRole from "../components/hooks/useUserRole";
import { Navigate, useLocation } from "react-router";


const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  // Show loading spinner while checking user and role
  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-[#5b0e0e]"></span>
      </div>
    );
  }

  // If not logged in or not an admin, redirect to forbidden page
  if (!user || role !== "admin") {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // If everything is fine, render the protected content
  return children;
};

export default AdminRoute;
