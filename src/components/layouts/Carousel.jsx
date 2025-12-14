import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";
import { useState } from "react";

const Carousel = () => {
  const [slides] = useState([
    {
      id: 1,
      image: "https://i.ibb.co.com/v42d4tKQ/IMG-5767.png",
      title: "Celebrate Winter",
      subtitle: "Explore our new winter collection",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/LD2GLr5Z/IMG-5764.png",
      title: "Aesthetic Products",
      subtitle: "Explore our all new aesthetic products",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/B2LXq9YW/IMG-5766.png",
      title: "Bride Products",
      subtitle: "Explore our full collection for a bride",
    },
    // {
    //   id: 4,
    //   image: "https://i.ibb.co.com/ycnZpTPk/photo-2025-11-13-18-33-20.jpg",
    //   title: "Any time return policy",
    //   subtitle: "Return your product any time you want",
    // },
  ]);

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8 mt-2">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        navigation={false}
        className="w-full rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Fixed container with controlled dimensions */}
            <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-2xl">
              <img
                src={slide.image}
                alt={slide.alt || "Slide image"}
                className="w-full h-full object-cover"
              />

              {/* Optional overlay or content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* slide content here */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Button */}
      <div className="relative z-10 text-center text-white px-4">
        <Link
          to="/shop"
          className="mt-2 sm:mt-4 inline-block bg-[#801a1a] hover:bg-red-700 px-3 sm:px-4 py-1.5 sm:py-1 md:py-2 rounded-xl font-semibold text-sm sm:text-base md:text-lg"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
