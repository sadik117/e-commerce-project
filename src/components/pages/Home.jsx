import React from "react";
import Carousel from "../layouts/Carousel";
import HomeFeatures from "../layouts/HomeFeatures";
import PromoBanner from "../layouts/PromoBanner";
import CollectionSection from "../layouts/CollectionSection";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <CollectionSection></CollectionSection>
      <PromoBanner></PromoBanner>
      {/* <div className="px-10 rounded-3xl mt-5 md:mt-8 justify-center items-center flex">
        <img
          src="https://i.postimg.cc/hGLLrnVG/Banner-rbs-1.png"
          alt="banner"
          className="h-64"
        />
      </div> */}
      <HomeFeatures></HomeFeatures>
    </div>
  );
};

export default Home;
