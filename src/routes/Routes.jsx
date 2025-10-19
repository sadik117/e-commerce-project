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
import Registration from "../components/authentication/Registration";
import Login from "../components/authentication/Login";
import PrivateRoute from "./PrivateRoute";
import ViewProducts from "../components/admin/ViewProducts";
import CouponPage from "../components/admin/CouponPage";
import AdminRoute from "./AdminRoute";

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
        element: <PrivateRoute>
          <CheckoutPage></CheckoutPage>
        </PrivateRoute>
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
        element: <AdminRoute>
           <AdminDashboard></AdminDashboard>
        </AdminRoute>,
        children:[
          {
            index: true,
            Component: DashboardLayout
          },
          {
            path: "add-product",
            element: <AdminRoute>
              <AddProduct></AddProduct>
            </AdminRoute>
          },
          {
            path: "orders",
            element: <AdminRoute>
              <ViewOrders></ViewOrders>
            </AdminRoute>
          },
          {
            path: "view-products",
            element: <AdminRoute>
              <ViewProducts></ViewProducts>
            </AdminRoute>
          },
          {
            path: "coupons",
            element: <AdminRoute>
              <CouponPage></CouponPage>
            </AdminRoute>
          }
        ] 
      }, 
      {
        path: "/auth",
        children:[
          {
            path: "/auth/registration",
            Component: Registration
          },
          {
            path: "/auth/login",
            Component: Login
          },
        ]
      },
    ],
  },
]);
