import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image: "/src/assets/pexels-daredevil-27139274.jpg",
      title: "Celebrate Eid",
      subtitle: "Explore our new collection",
    },
    {
      id: 2,
      image: "/src/assets/pexels-pratik-prasad-3736245-5585346.jpg",
      title: "Aesthetic Products",
      subtitle: "Explore our all new aesthetic products",
    },
    {
      id: 3,
      image: "/src/assets/pexels-qazi-1297483.jpg",
      title: "Bride Products",
      subtitle: "Explore our full collection for a bride",
    },
    {
      id: 4,
      image: "/src/assets/pexels-leeloothefirst-8938722.jpg",
      title: "Pay Online",
      subtitle: "Pay with your comfortable method",
    },
    {
      id: 5,
      image: "/src/assets/pexels-n-voitkevich-6214155.jpg",
      title: "Shop Now",
      subtitle: "Sale is on, Buy your products now.",
    },
  ];

  return (
    <div className="relative w-full bg-[#f8f8f8] mb-2">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 4000 }}
        loop={true}
        slidesPerView={1}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[500px] flex justify-center items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative z-10 text-center text-white">
                <h1 className="text-3xl font-bold mb-2">{slide.title}</h1>
                <p className="text-md mb-6">{slide.subtitle}</p>
                <Link to="/shop" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold">
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
