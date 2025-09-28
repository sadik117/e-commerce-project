import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router";


const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-324px)]">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
