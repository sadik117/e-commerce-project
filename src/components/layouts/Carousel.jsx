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
        const response = await fetch("/api/slides");
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
        // Fallback to hardcoded data if API fails (optional)
        setSlides([
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
          {
            id: 4,
            image:
              "https://i.ibb.co.com/ycnZpTPk/photo-2025-11-13-18-33-20.jpg",
            title: "Any time return policy",
            subtitle: "Return your product any time you want",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[200px] md:h-[370px] flex items-center justify-center">
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
        navigation={false} // Enable navigation arrows
        className="w-full rounded-2xl aspect-[16/9] sm:aspect-[21/9] md:aspect-auto" // Fluid aspect ratio for responsiveness
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[180px] sm:h-[250px] md:h-[370px] lg:h-[450px] flex flex-col justify-center items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
        {/* Text content */}
        <div className="relative z-10 text-center text-white px-4">
          {/* <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium drop-shadow-md">
                  {slide.subtitle}
                </p> */}
          <Link
            to="/shop"
            className="mt-2 sm:mt-4 inline-block bg-[#f04141] hover:bg-red-700 px-3 sm:px-4 py-1.5 sm:py-1 md:py-2 rounded-md font-semibold text-sm sm:text-base md:text-lg"
          >
            Shop Now
          </Link>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
