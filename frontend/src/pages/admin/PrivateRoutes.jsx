import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import AdminRootLayout from "@/pages/admin/RootLayout";

function PrivateRoutes({ ...props }) {
  let location = useLocation();
  const { adminData } = useSelector((state) => state.adminAuth);
  
  return (
    <>
      {adminData?.isAdmin === true ? (
        <AdminRootLayout />
      ) : (
        <Navigate to="/admin/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
