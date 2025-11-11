import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../footer/Footer";
import useFacebookTracking from "../useFacebookTracking";

const MainLayout = () => {
  useFacebookTracking(); //  Track every route change automatically

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-324px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
