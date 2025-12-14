import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Banknote, Handbag, PackageCheck, Trash2, ShoppingCart } from "lucide-react";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  /*  Remove single item */
  const removeFromWishlist = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  /*  Move wishlist items to cart */
  const proceedToCheckout = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = [...cart];

    items.forEach((wishItem) => {
      const existing = updatedCart.find((c) => c.id === wishItem.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        updatedCart.push({ ...wishItem, quantity: 1 });
      }
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));

    // clear wishlist
    localStorage.removeItem("wishlist");
    window.dispatchEvent(new Event("wishlistUpdated"));
    setItems([]);

    navigate("/checkout");
  };

  /*  Empty wishlist UI */
  if (!items.length) {
    return (
      <div className="text-center py-10">
        <h3 className="flex justify-center mb-3">
          <Handbag className="text-orange-700 size-40" />
        </h3>
        <h4 className="text-xl mb-3 text-red-600 font-bold">
          Your Wishlist is Empty!!
        </h4>
        <p className="text-lg font-medium px-2">
          Add Your Favourite Products Now For Not To Miss Later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/*  Wishlist Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-3 hover:shadow relative"
          >
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                className="h-fit w-full object-cover rounded"
              />
              <h3 className="mt-2 font-medium flex gap-2 items-center">
                <PackageCheck size={18} /> {item.name}
              </h3>
              <p className="text-[#5b0e0e] font-semibold flex gap-2 mt-2 items-center">
                <Banknote size={18} /> Tk {item.price}
              </p>
            </Link>

            {/*  Remove Button */}
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
              title="Remove from wishlist"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Add to Cart & Proceed to Checkout */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={proceedToCheckout}
          className="flex items-center gap-2 bg-[#5b0e0e] text-white px-6 py-3 rounded-lg hover:bg-[#4a0b0b] transition font-semibold"
        >
          <ShoppingCart size={20} />
          Add to Cart & Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
