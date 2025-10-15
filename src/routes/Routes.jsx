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
import ProductDetails from "../components/pages/ProductDetails";
import CheckoutPage from "../components/pages/CheckoutPage";
import DressPage from "../components/pages/DressPage";
import BagPage from "../components/pages/BagPage";
import CollectionPage from "../components/pages/CollectionPage";

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
        path: "/product/:id",
        Component: ProductDetails
      },
      {
        path: "/checkout",
        Component: CheckoutPage
      },
      {
        path: "/dress",
        Component: DressPage
      },
      {
        path: "/bags",
        Component: BagPage
      },
      {
        path: "/collection",
        Component: CollectionPage
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
