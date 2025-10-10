import { Component } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../components/pages/Home";
import ShopPage from "../components/pages/ShopPage";
import AdminDashboard from "../components/admin/AdminDashboard";
import DashboardLayout from "../components/admin/DashboardLayout";
import AddProduct from "../components/admin/AddProduct";
import ViewOrders from "../components/admin/ViewOrders";
import ErrorPage from "../components/pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/shop",
        Component: ShopPage
      },
      {
        path: "/admin",
        element: <AdminDashboard></AdminDashboard>,
        children:[
          {
            index: true,
            Component: DashboardLayout
          },
          {
            path: "add-product",
            Component: AddProduct
          },
          {
            path: "orders",
            Component: ViewOrders
          }
        ] 
      },
      
    ],
  },
]);
