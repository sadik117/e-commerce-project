import React, { useMemo, useState } from "react";

/*  Demo Data   */
const SEED = [
  { id: 1, title: "Bata AWO Comfort Loafer for Men", brand: "BATA", price: 4490, priceOld: 5490, gender: "MEN", sizes: ["S","M","L"], color: "#1f2937", img: "https://picsum.photos/seed/loafer1/700/500", category: "Shoes" },
  { id: 2, title: "North Star SunRunner Flat Sneaker", brand: "NORTH STAR", price: 2490, priceOld: 3290, gender: "WOMEN", sizes: ["M","L"], color: "#60a5fa", img: "https://picsum.photos/seed/sneaker2/700/500", category: "Shoes" },
  { id: 3, title: "Power Activewear Hydro Tee", brand: "POWER", price: 1750, priceOld: 1990, gender: "MEN", sizes: ["S","M","L","XL"], color: "#f87171", img: "https://picsum.photos/seed/tshirt3/700/500", category: "Apparel" },
  { id: 4, title: "Bata Ladies Pump Kitten Heel", brand: "BATA RED LABEL", price: 3170, priceOld: 3990, gender: "WOMEN", sizes: ["S","M"], color: "#93c5fd", img: "https://picsum.photos/seed/pump4/700/500", category: "Shoes" },
  { id: 5, title: "Comfit Everyday Walking Shoe", brand: "COMFIT", price: 3890, priceOld: 4490, gender: "WOMEN", sizes: ["M","L","XL"], color: "#10b981", img: "https://picsum.photos/seed/walk5/700/500", category: "Shoes" },
  { id: 6, title: "Weinbrenner Outdoor Hiker", brand: "WEINBRENNER", price: 5290, priceOld: 5990, gender: "MEN", sizes: ["M","L","XL","XXL"], color: "#3b82f6", img: "https://picsum.photos/seed/hiker6/700/500", category: "Shoes" },
];

const expandProducts = (count = 48) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const base = SEED[i % SEED.length];
    arr.push({
      ...base,
      id: i + 1,
      price: Math.round((base.price * (0.9 + ((i % 7) / 70))) / 10) * 10,
      priceOld: Math.round((base.priceOld * (0.9 + ((i % 9) / 80))) / 10) * 10,
      img: `https://picsum.photos/seed/p${i + 10}/700/500`,
      color: ["#000000","#111827","#f87171","#60a5fa","#fbbf24","#10b981","#a855f7","#ef4444","#93c5fd","#fde68a"][i % 10],
      sizes: Array.from(new Set([...base.sizes, ["S","M","L","XL","XXL"][i % 5]])),
      gender: i % 2 === 0 ? "MEN" : "WOMEN",
    });
  }
  return arr;
};
const ALL = expandProducts(48);

/* --------------------------- Config Options --------------------------- */
const PRICE_RANGES = [
  { id: "p1", label: "Under Tk. 1000", test: (p) => p.price < 1000 },
  { id: "p2", label: "Tk. 1001 - Tk. 1500", test: (p) => p.price >= 1001 && p.price <= 1500 },
  { id: "p3", label: "Tk. 1501 - Tk. 2000", test: (p) => p.price >= 1501 && p.price <= 2000 },
  { id: "p4", label: "Tk. 2001 - Tk. 3000", test: (p) => p.price >= 2001 && p.price <= 3000 },
  { id: "p5", label: "Tk. 3001 - Tk. 4000", test: (p) => p.price >= 3001 && p.price <= 4000 },
  { id: "p6", label: "Tk. 4001 - Tk. 5000", test: (p) => p.price >= 4001 && p.price <= 5000 },
  { id: "p7", label: "Above Tk. 5000", test: (p) => p.price > 5000 },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = ["#000000","#ffffff","#f87171","#60a5fa","#10b981","#facc15","#a855f7","#ef4444","#0ea5e9","#f472b6","#94a3b8","#7c3aed"];
const SORT_OPTIONS = [
  { id: "featured", label: "Featured", cmp: null },
  { id: "priceAsc", label: "Price: Low to High", cmp: (a, b) => a.price - b.price },
  { id: "priceDesc", label: "Price: High to Low", cmp: (a, b) => b.price - a.price },
];
const PAGE_SIZES = [12, 24, 48];

/*  Component  */
export default function ShopPage() {
  const [gender, setGender] = useState(null);
  const [priceId, setPriceId] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [sortId, setSortId] = useState("featured");
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === priceId);
    let out = ALL.filter((p) => {
      const byGender = !gender || p.gender === gender;
      const byPrice = !range || range.test(p);
      const bySize = !size || p.sizes.includes(size);
      const byColor = !color || p.color.toLowerCase() === color.toLowerCase();
      return byGender && byPrice && bySize && byColor;
    });
    const sorter = SORT_OPTIONS.find((s) => s.id === sortId)?.cmp;
    if (sorter) out = [...out].sort(sorter);
    return out;
  }, [gender, priceId, size, color, sortId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  const clearAll = () => {
    setGender(null);
    setPriceId(null);
    setSize(null);
    setColor(null);
    setSortId("featured");
    setPerPage(12);
    setPage(1);
  };

  const onPerPageChange = (v) => {
    setPerPage(v);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-10">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/*  LEFT: ALL CONTROLS */}
        <aside className="md:top-20 md:sticky ">
          {/* Obvious visual panel so you can confirm it changed */}
          <div className="rounded-xl border border-base-300 bg-base-200 p-4 md:p-5 space-y-5">
            <h2 className="text-lg font-extrabold tracking-wide">Filters</h2>

            {/* Active chips */}
            <div className="flex flex-wrap gap-2">
              {gender && (
                <span className="badge badge-neutral gap-2">
                  Gender: {gender}
                  <button className="ml-1" onClick={() => setGender(null)}>✕</button>
                </span>
              )}
              {priceId && (
                <span className="badge badge-neutral gap-1">
                  {PRICE_RANGES.find((r) => r.id === priceId)?.label}
                  <button className="ml-1" onClick={() => setPriceId(null)}>✕</button>
                </span>
              )}
              {size && (
                <span className="badge badge-neutral gap-1">
                  Size: {size}
                  <button className="ml-1" onClick={() => setSize(null)}>✕</button>
                </span>
              )}
              {color && (
                <span className="badge badge-neutral gap-1">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                  <button className="ml-1" onClick={() => setColor(null)}>✕</button>
                </span>
              )}
              {!gender && !priceId && !size && !color && (
                <span className="text-sm opacity-60">No filters applied</span>
              )}
            </div>

            {/* Row: Items per page + Sort */}
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
                    <option key={n} value={n}>{n}</option>
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
                  onChange={(e) => { setSortId(e.target.value); setPage(1); }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender */}
            <div className="collapse collapse-arrow bg-base-100 rounded-lg">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-sm font-extrabold tracking-wide">GENDER</div>
              <div className="collapse-content space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={gender === "MEN"}
                    onChange={() => setGender(gender === "MEN" ? null : "MEN")}
                  />
                  <span>Men</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={gender === "WOMEN"}
                    onChange={() => setGender(gender === "WOMEN" ? null : "WOMEN")}
                  />
                  <span>Women</span>
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="collapse collapse-arrow bg-base-100 rounded-lg">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-sm font-extrabold tracking-wide">PRICE</div>
              <div className="collapse-content space-y-2">
                {PRICE_RANGES.map((r) => (
                  <label key={r.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={priceId === r.id}
                      onChange={() => setPriceId(priceId === r.id ? null : r.id)}
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="collapse collapse-arrow bg-base-100 rounded-lg">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-sm font-extrabold tracking-wide">SIZE</div>
              <div className="collapse-content">
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      className={`px-3 py-1 rounded-md border text-sm ${
                        size === s ? "bg-neutral text-neutral-content border-neutral" : "border-base-300 hover:bg-base-300"
                      }`}
                      onClick={() => setSize(size === s ? null : s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="collapse collapse-arrow bg-base-100 rounded-lg">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-sm font-extrabold tracking-wide">COLOR</div>
              <div className="collapse-content">
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      className={`w-7 h-7 rounded border ${color === c ? "ring-2 ring-neutral" : "border-base-300"}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(color === c ? null : c)}
                      aria-label={`Color ${c}`}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Clear */}
            <button className="btn btn-ghost btn-sm w-full" onClick={clearAll}>
              Clear all
            </button>
          </div>
        </aside>

        {/*  RIGHT: GRID ONLY  */}
        <section className="min-w-0">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {current.map((p) => (
              <article key={p.id} className="card bg-base-100 border border-base-200 hover:shadow-lg transition">
                <figure className="bg-base-200">
                  <img src={p.img} alt={p.title} className="h-44 sm:h-52 object-contain" />
                </figure>
                <div className="card-body p-4">
                  <h3 className="text-[13px] font-semibold leading-snug line-clamp-2">{p.title}</h3>
                  <p className="text-xs opacity-70">{p.brand}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-error font-bold">Tk {p.price.toLocaleString()}</span>
                    <span className="line-through text-xs opacity-60">Tk {p.priceOld.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    {p.sizes.slice(0, 4).map((s) => (
                      <span key={s} className="badge badge-ghost badge-xs">{s}</span>
                    ))}
                  </div>
                  <div className="card-actions mt-3">
                    <button className="btn btn-sm btn-neutral w-full">Shop Now</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {current.length === 0 && (
            <div className="py-16 text-center opacity-70">No products match your filters.</div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button className="btn btn-sm" disabled={clampedPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
            <div className="join">
              {Array.from({ length: totalPages }).map((_, i) => {
                const idx = i + 1;
                const show = idx === 1 || idx === totalPages || Math.abs(idx - clampedPage) <= 1 || (clampedPage <= 2 && idx <= 3) || (clampedPage >= totalPages - 1 && idx >= totalPages - 2);
                if (!show) {
                  if ((idx === 2 && clampedPage > 3) || (idx === totalPages - 1 && clampedPage < totalPages - 2)) {
                    return <button key={`dots-${idx}`} className="btn btn-sm join-item btn-disabled">...</button>;
                  }
                  return null;
                }
                return (
                  <button key={idx} className={`btn btn-sm join-item ${clampedPage === idx ? "btn-neutral" : ""}`} onClick={() => setPage(idx)}>
                    {idx}
                  </button>
                );
              })}
            </div>
            <button className="btn btn-sm" disabled={clampedPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
          </div>
        </section>
      </div>
    </div>
  );
}
