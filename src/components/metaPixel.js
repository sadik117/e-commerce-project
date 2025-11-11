import ReactPixel from "react-facebook-pixel";

// Your Pixel ID
const PIXEL_ID = "857404480130156";

export const initFacebookPixel = () => {
  const options = {
    autoConfig: true,
    debug: false, // set true to log events in console
  };
  ReactPixel.init(PIXEL_ID, {}, options);
  ReactPixel.pageView(); // initial page load
};

export const trackPageView = () => {
  ReactPixel.pageView();
};

export const trackEvent = (eventName, data = {}) => {
  ReactPixel.track(eventName, data);
};
