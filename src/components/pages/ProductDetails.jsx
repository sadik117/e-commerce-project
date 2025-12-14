import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import Loading from "../layouts/Loading";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`https://robe-by-shamshad-server.vercel.app/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  useEffect(() => {
    if (!product) return;

    document.title = `${product.name} | Robe by Shamshad`;

    const setMeta = (property, content) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("og:title", product.name);
    setMeta("og:description", product.description);
    setMeta("og:image", product.image);
    setMeta("og:url", window.location.href);
    setMeta("og:type", "product");
  }, [product]);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
      toast.error("Unable to share product");
    }
  };

  // cart add functionality
  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === product._id
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage"));

    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  // wishlist add functionality

  const toggleWishlist = () => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = saved.find((i) => i.id === product._id);

    let updated;
    if (exists) {
      updated = saved.filter((i) => i.id !== product._id);
    } else {
      updated = [
        ...saved,
        {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      ];
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const productImages = [product?.image];

  if (!product) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex gap-3 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                      selectedImage === index
                        ? "border-error ring-2 ring-error/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-warning text-warning"
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                  </div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                <p className="text-xl font-semibold text-error mb-2">
                  Tk {product.price.toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="text-gray-600 leading-relaxed">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delivery Charge:
                </h3>
                <p>
                  Delivery charge overall 13 Taka. So, order before 24th
                  December
                </p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-gray-900">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-red-800 hover:bg-error/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      toggleWishlist();
                    }}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      isFavorite
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>In stock • Ready to ship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
