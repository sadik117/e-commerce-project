import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Loading from "../layouts/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  if (!product) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 -mt-20 md:mt-0">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-contain rounded-xl"
      />
      <div className="ml-2 md:ml-35 -mt-16 md:mt-0">
      <h2 className="text-2xl font-bold mt-2 md:mt-4 ">{product.name}</h2>
      <p className="text-gray-500 capitalize">{product.category}</p>
      <p className="text-lg mt-1 text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-2 text-error">Tk {product.price}</p>
      <button className="inline-block px-3 py-1 mt-2 bg-[#7e1a1a] text-white font-medium rounded-xl">Add to Cart</button>
    </div>
    </div>
  );
}
