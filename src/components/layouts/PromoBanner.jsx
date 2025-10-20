import { Link } from "react-router";

const PromoBanner = () => {
  return (
    <section className="relative bg-[#5b0e0e] text-white py-12 px-6 my-5 md:my-8 overflow-hidden mx-8 rounded-xl">
      {/* Background pattern or image (optional) */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center py-10"
        style={{
          backgroundImage: "url('https://i.postimg.cc/VvpjfRy9/pexels-max-fischer-5872364.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          🎉 Winter Season Sale is Live!
        </h2>
        <p className="text-lg md:text-xl">
          Get <span className="font-bold text-yellow-300">20% OFF</span> on your first order.
        </p>
        <p className="mt-1 text-sm">
          Use Code: <span className="font-bold uppercase tracking-widest">WELCOME20</span>
        </p>

        <Link
          to="/shop"
          className="inline-block bg-[#f04141] text-white font-semibold py-2 px-6 rounded-md mt-5 hover:bg-red-700 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Decorative shapes */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
    </section>
  );
};

export default PromoBanner;
