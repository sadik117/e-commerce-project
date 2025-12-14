import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Banknote, Handbag, PackageCheck } from 'lucide-react';

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  if (!items.length) {
    return (
      <div className="text-center py-10">
        <h3 className="justify-center text-center flex mb-3">
          < Handbag className="text-orange-700 size-40" />
        </h3>
        <h4 className="text-xl mb-3 text-red-600 font-bold">Your Wishlist is Empty!! </h4>
        <p className="text-lg font-medium px-2">Add Your Favourite Products Now For Not To Miss Later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <Link
          to={`/product/${item.id}`}
          key={item.id}
          className="border rounded-lg p-3 hover:shadow"
        >
          <img src={item.image} className="h-fit w-full object-cover rounded" />
          <h3 className="mt-2 font-medium flex gap-2"><PackageCheck /> {item.name}</h3>
          <p className="text-[#5b0e0e] font-semibold flex gap-2 mt-2"><Banknote /> Tk {item.price}</p>
        </Link>
      ))}
    </div>
  );
}
