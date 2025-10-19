import React from "react";
import Carousel from "../layouts/Carousel";
import HomeFeatures from "../layouts/HomeFeatures";
import PromoBanner from "../layouts/PromoBanner";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <div className="px-5 rounded-3xl mt-10">
        <img
          src="https://i.postimg.cc/CKQ9V3Pn/Grand-Opening-Made-with-Poster-My-Wall.jpg"
          alt="banner"
        />
      </div>
      <PromoBanner></PromoBanner>
      <HomeFeatures></HomeFeatures>
    </div>
  );
};

export default Home;
