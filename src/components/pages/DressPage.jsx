/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../layouts/Loading";

export default function DressPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortId, setSortId] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  const navigate = useNavigate();

  // Sorting options
  const SORT_OPTIONS = [
    { id: "featured", label: "Featured", cmp: null },
    { id: "priceAsc", label: "Price: Low to High", cmp: (a, b) => a.price - b.price },
    { id: "priceDesc", label: "Price: High to Low", cmp: (a, b) => b.price - a.price },
  ];

  // Fetch only dress products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://robe-by-shamshad-server.vercel.app/products");
        const all = res.data.products || res.data;
        const dressProducts = all.filter(
          (p) => p.category?.toLowerCase() === "dress"
        );
        setProducts(dressProducts);
      } catch (error) {
        console.error("Error fetching dress products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorter = SORT_OPTIONS.find((s) => s.id === sortId)?.cmp;
    if (sorter) return [...products].sort(sorter);
    return products;
  }, [products, sortId]);

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Dress Collection
          </h1>
          <p className="text-gray-600">
            Explore our curated collection of dresses for every occasion
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="mt-4 md:mt-0">
          <select
            value={sortId}
            onChange={(e) => {
              setSortId(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered select-sm"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <Loading />
      ) : currentProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No dresses found.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((p) => (
              <article
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="card bg-white border border-gray-200 hover:shadow-lg transition cursor-pointer"
              >
                <figure className="bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-52 w-full object-contain"
                  />
                </figure>
                <div className="card-body p-4">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">
                    {p.category}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-error font-bold text-[15px]">
                      Tk {p.price?.toLocaleString()}
                    </span>
                    <button className="btn btn-xs btn-neutral ml-0.5">Shop Now</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={`join-item btn btn-sm ${
                      currentPage === i + 1
                        ? "btn-neutral text-white"
                        : "btn-ghost"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="join-item btn btn-sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
