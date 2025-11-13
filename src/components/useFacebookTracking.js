// src/hooks/useFacebookTracking.js
import { useEffect } from "react";
import { useLocation } from "react-router";
import { trackPageView } from "./metaPixel";

const useFacebookTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track every route change as a new PageView
    trackPageView();
  }, [location.pathname]);
};

export default useFacebookTracking;
