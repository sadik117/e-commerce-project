import React from 'react';
import Carousel from '../layouts/Carousel';
import HomeFeatures from '../layouts/HomeFeatures';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <img src="/src/assets/Grand-Opening-Made-with-PosterMyWall.jpg" alt="banner"/>
            <HomeFeatures></HomeFeatures>
        </div>
    );
};

export default Home;