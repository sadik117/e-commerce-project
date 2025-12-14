import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../layouts/Loading";
import { FiFilter, FiX } from "react-icons/fi";

/* Config Options */
const PRICE_RANGES = [
  { id: "p1", label: "Under Tk. 1000", test: (p) => p.price < 1000 },
  { id: "p2", label: "Tk. 1001 - Tk. 1500", test: (p) => p.price >= 1001 && p.price <= 1500 },
  { id: "p3", label: "Tk. 1501 - Tk. 2000", test: (p) => p.price >= 1501 && p.price <= 2000 },
  { id: "p4", label: "Tk. 2001 - Tk. 3000", test: (p) => p.price >= 2001 && p.price <= 3000 },
  { id: "p5", label: "Tk. 3001 - Tk. 4000", test: (p) => p.price >= 3001 && p.price <= 4000 },
  { id: "p6", label: "Tk. 4001 - Tk. 5000", test: (p) => p.price >= 4001 && p.price <= 5000 },
  { id: "p7", label: "Above Tk. 5000", test: (p) => p.price > 5000 },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured", cmp: null },
  { id: "priceAsc", label: "Price: Low to High", cmp: (a, b) => a.price - b.price },
  { id: "priceDesc", label: "Price: High to Low", cmp: (a, b) => b.price - a.price },
];

const COLORS = [
  { name: "black", code: "#000000" },
  { name: "white", code: "#ffffff" },
  { name: "red", code: "#ff0000" },
  { name: "blue", code: "#2196f3" },
  { name: "green", code: "#00b050" },
  { name: "yellow", code: "#ffeb3b" },
  { name: "orange", code: "#ff9800" },
  { name: "pink", code: "#e91e63" },
  { name: "purple", code: "#9c27b0" },
  { name: "navy", code: "#000080" },
];

const PAGE_SIZES = [12, 24, 48];

/* Filter Section Component */
function FilterSection({
  gender, setGender, priceId, setPriceId, color, setColor, 
  category, setCategory, sortId, setSortId, perPage, setPerPage,
  setPage, products, clearAll, onApply
}) {
  const onPerPageChange = (v) => {
    setPerPage(v);
    setPage(1);
  };

  // Get unique categories
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  return (
    <div className="rounded-xl border border-base-300 bg-base-200 p-4 md:p-5 space-y-5">
      <h2 className="text-lg font-extrabold tracking-wide">Filters</h2>

      {/* Active filters display */}
      <div className="flex flex-wrap gap-2">
        {gender && (
          <span className="badge badge-neutral gap-2">
            Gender: {gender}
            <button onClick={() => setGender(null)} className="hover:opacity-70">✕</button>
          </span>
        )}
        {priceId && (
          <span className="badge badge-neutral gap-1">
            {PRICE_RANGES.find((r) => r.id === priceId)?.label}
            <button onClick={() => setPriceId(null)} className="hover:opacity-70">✕</button>
          </span>
        )}
        {color && (
          <span className="badge badge-neutral gap-1">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <button onClick={() => setColor(null)} className="hover:opacity-70">✕</button>
          </span>
        )}
        {category && (
          <span className="badge badge-neutral gap-1">
            Category: {category}
            <button onClick={() => setCategory(null)} className="hover:opacity-70">✕</button>
          </span>
        )}
        {!gender && !priceId && !color && !category && (
          <span className="text-sm opacity-60">No filters applied</span>
        )}
      </div>

      {/* Items per page + Sort */}
      <div className="grid grid-cols-2 gap-3">
        <div className="form-control">
          <label className="label py-0">
            <span className="label-text text-sm opacity-70">Items per page</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label py-0">
            <span className="label-text text-sm opacity-70">Sort</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={sortId}
            onChange={(e) => {
              setSortId(e.target.value);
              setPage(1);
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gender Filter */}
      <div className="collapse collapse-arrow bg-base-100 rounded-lg">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-sm font-extrabold tracking-wide">
          GENDER
        </div>
        <div className="collapse-content space-y-2 pt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={gender === "men"}
              onChange={() => setGender(gender === "men" ? null : "men")}
            />
            <span>Men</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={gender === "women"}
              onChange={() => setGender(gender === "women" ? null : "women")}
            />
            <span>Women</span>
          </label>
        </div>
      </div>

      {/* Category Filter */}
      <div className="collapse collapse-arrow bg-base-100 rounded-lg">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-sm font-extrabold tracking-wide">
          CATEGORY
        </div>
        <div className="collapse-content space-y-2 pt-2">
          {uniqueCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 capitalize">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={category === cat}
                onChange={() => setCategory(category === cat ? null : cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="collapse collapse-arrow bg-base-100 rounded-lg">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-sm font-extrabold tracking-wide">
          PRICE
        </div>
        <div className="collapse-content space-y-2 pt-2">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={priceId === r.id}
                onChange={() =>
                  setPriceId(priceId === r.id ? null : r.id)
                }
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="collapse collapse-arrow bg-base-100 rounded-lg">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-sm font-extrabold tracking-wide">
          COLOR
        </div>
        <div className="collapse-content flex flex-wrap gap-3 pt-2">
          {COLORS.map((c) => (
            <button
              key={c.name}
              className={`w-7 h-7 rounded-full border-2 ${
                color === c.name ? "ring-2 ring-primary ring-offset-1" : "border-base-300"
              }`}
              style={{ backgroundColor: c.code }}
              onClick={() =>
                setColor(color === c.name ? null : c.name)
              }
              title={c.name}
              aria-label={c.name}
            />
          ))}
        </div>
      </div>

      {/* Clear Button */}
      <button className="btn btn-ghost btn-sm w-full" onClick={clearAll}>
        Clear all filters
      </button>
      
      {/* Mobile Apply Button */}
      {onApply && (
        <button 
          className="btn btn-primary w-full mt-4 md:hidden"
          onClick={onApply}
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}

/* Main Component */
export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [gender, setGender] = useState(null);
  const [priceId, setPriceId] = useState(null);
  const [color, setColor] = useState(null);
  const [category, setCategory] = useState(null);
  const [sortId, setSortId] = useState("featured");
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://robe-by-shamshad-server.vercel.app/products"); 
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /*  Filtering & Sorting */
  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === priceId);
    let out = products.filter((p) => {
      const byGender = !gender || p.gender?.toLowerCase() === gender.toLowerCase();
      const byPrice = !range || range.test(p);
      const byColor = !color || p.color?.toLowerCase() === color.toLowerCase();
      const byCategory = !category || p.category?.toLowerCase() === category.toLowerCase();
      return byGender && byPrice && byColor && byCategory;
    });

    const sorter = SORT_OPTIONS.find((s) => s.id === sortId)?.cmp;
    if (sorter) out = [...out].sort(sorter);

    return out;
  }, [products, gender, priceId, color, category, sortId]);

  /* Pagination Logic  */
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  const clearAll = () => {
    setGender(null);
    setPriceId(null);
    setColor(null);
    setCategory(null);
    setSortId("featured");
    setPerPage(12);
    setPage(1);
    setMobileFiltersOpen(false);
  };

  // Active filters count
  const activeFilterCount = [gender, priceId, color, category].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-10">
      {/* Mobile Filter Button */}
      <div className="md:hidden sticky top-0 z-30 bg-base-100 py-3 mb-4 flex items-center justify-between border-b shadow-sm">
        <div className="text-sm dark:text-white">
          <span className="font-medium pl-2">{filtered.length}</span> products for you
        </div>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="btn btn-sm btn-neutral flex items-center gap-2 mr-2"
        >
          <FiFilter size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="badge badge-sm badge-primary -ml-1">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Desktop Filters (hidden on mobile) */}
        <aside className="hidden md:block md:top-20 md:sticky dark:text-white h-fit">
          <FilterSection
            gender={gender}
            setGender={setGender}
            priceId={priceId}
            setPriceId={setPriceId}
            color={color}
            setColor={setColor}
            category={category}
            setCategory={setCategory}
            sortId={sortId}
            setSortId={setSortId}
            perPage={perPage}
            setPerPage={setPerPage}
            setPage={setPage}
            products={products}
            clearAll={clearAll}
          />
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity dark:text-white"
              onClick={() => setMobileFiltersOpen(false)}
            />
            
            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-base-100 shadow-xl overflow-y-auto">
              <div className="sticky top-0 z-10 bg-base-100 border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="badge badge-primary badge-sm">
                      {activeFilterCount} active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="btn btn-ghost btn-sm btn-circle"
                  aria-label="Close filters"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <FilterSection
                  gender={gender}
                  setGender={setGender}
                  priceId={priceId}
                  setPriceId={setPriceId}
                  color={color}
                  setColor={setColor}
                  category={category}
                  setCategory={setCategory}
                  sortId={sortId}
                  setSortId={setSortId}
                  perPage={perPage}
                  setPerPage={setPerPage}
                  setPage={setPage}
                  products={products}
                  clearAll={clearAll}
                  onApply={() => setMobileFiltersOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PRODUCTS */}
        <section className="min-w-0">
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Products Count for Desktop */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <div className="text-sm opacity-70">
                  Showing {current.length} of {filtered.length} products
                </div>
                <div className="text-sm opacity-70">
                  Page {clampedPage} of {totalPages}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {current.map((p) => (
                  <article
                    key={p._id}
                    onClick={() => navigate(`/product/${p._id}`)}
                    className="card bg-base-100 border border-base-200 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1"
                  >
                    <figure className="bg-base-200 aspect-square">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-contain p-4"
                      />
                    </figure>
                    <div className="card-body p-4">
                      <h3 className="text-[13px] font-semibold leading-snug line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="text-xs opacity-70 capitalize">{p.category}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-error font-bold">
                          Tk {p.price?.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-actions mt-3">
                        <button className="btn btn-sm btn-neutral w-full">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {current.length === 0 && (
                <div className="py-16 text-center opacity-70">
                  <div className="text-lg mb-2">No products found</div>
                  <p className="text-sm opacity-70 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <button 
                    onClick={clearAll}
                    className="btn btn-sm btn-neutral"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filtered.length > 0 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    className="btn btn-sm"
                    disabled={clampedPage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  <div className="join">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const idx = i + 1;
                      const show =
                        idx === 1 ||
                        idx === totalPages ||
                        Math.abs(idx - clampedPage) <= 1 ||
                        (clampedPage <= 2 && idx <= 3) ||
                        (clampedPage >= totalPages - 1 &&
                          idx >= totalPages - 2);
                      if (!show) {
                        if (
                          (idx === 2 && clampedPage > 3) ||
                          (idx === totalPages - 1 && clampedPage < totalPages - 2)
                        ) {
                          return (
                            <button
                              key={`dots-${idx}`}
                              className="btn btn-sm join-item btn-disabled"
                              disabled
                            >
                              ...
                            </button>
                          );
                        }
                        return null;
                      }
                      return (
                        <button
                          key={idx}
                          className={`btn btn-sm join-item ${
                            clampedPage === idx ? "btn-neutral" : ""
                          }`}
                          onClick={() => setPage(idx)}
                        >
                          {idx}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className="btn btn-sm"
                    disabled={clampedPage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}