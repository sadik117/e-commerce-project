import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router";


const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://robe-by-shamshad-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  return (
    <div className="mt-8 mx-8 mb-8">
      <h2 className="text-xl font-bold mb-4">🔥 Recently Added</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1.4}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
        }}
        breakpoints={{
          480: { slidesPerView: 2.3 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
        }}
        modules={[Autoplay]}
      >
        {products.map((p) => (
          <SwiperSlide key={p._id}>
            <Link to={`/product/${p._id}`}> 
              <div className="group relative rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300 cursor-pointer">

                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-52 object-cover group-hover:scale-105 duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-semibold text-lg group-hover:tracking-wide transition">
                    {p.name}
                  </h3>
                  <p className="text-sm opacity-80">{p.category || "Product"}</p>
                  <p className="text-yellow-300 font-bold mt-1">
                    ৳{p.price || "0.00"}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
