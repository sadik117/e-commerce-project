// main.jsx or index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./components/authentication/AuthProvider";
import { initFacebookPixel } from "./components/metaPixel";
import { HelmetProvider } from "react-helmet-async";

initFacebookPixel(); // Initialize Meta Pixel once globally

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
