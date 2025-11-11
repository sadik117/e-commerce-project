// src/hooks/useFacebookTracking.js
import { useEffect } from "react";
import { trackPageView } from "../metaPixel";
import { useLocation } from "react-router";

const useFacebookTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track every route change as a new PageView
    trackPageView();
  }, [location.pathname]);
};

export default useFacebookTracking;
