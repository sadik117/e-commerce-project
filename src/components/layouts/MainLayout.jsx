import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../footer/Footer";


const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-324px)]">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
};

export default MainLayout;
