import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../components/pages/Home";
import ShopPage from "../components/pages/ShopPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/shop",
        Component: ShopPage
      },
    ],
  },
]);
