import { Link } from "react-router";

// Collection.jsx
export default function CollectionSection() {
  return (
    <div className="px-4 md:px-8 mt-8">
      <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
        {/* Collection Image */}
        <img
          src="https://i.postimg.cc/dV0LhYVf/Shamshad-collection.png"
          alt="collection banner"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <Link to="collection" className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-black hover:text-white transition">
            See Collections
          </Link>
        </div>

        {/* Title (Static) */}
        <div className="absolute bottom-4 left-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
            Exclusive Collection
          </h2>
        </div>
      </div>
    </div>
  );
}
