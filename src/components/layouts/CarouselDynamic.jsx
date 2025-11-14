// src/components/Carousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "./Loading";

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("https://robe-by-shamshad-server.vercel.app/slides"); 
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error(err);
        // optional fallback
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[200px] md:h-[370px] flex items-center justify-center bg-gray-200">
       <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#f8f8f8] px-4 sm:px-6 lg:px-8 mt-2">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        navigation={true}
        className="w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: "21 / 9" }}   // fluid on all screens
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[180px] sm:h-[250px] md:h-[370px] lg:h-[450px] bg-cover bg-center flex flex-col justify-center items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              <div className="relative z-10 text-center text-white px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-md">
                  {slide.subtitle}
                </p>

                <Link
                  to="/shop"
                  className="mt-3 sm:mt-4 inline-block bg-[#f04141] hover:bg-red-700 px-3 sm:px-4 py-1.5 sm:py-2 md:py-3 rounded-md font-semibold text-sm sm:text-base md:text-lg transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;