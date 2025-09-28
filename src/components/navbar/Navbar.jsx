import React, { useState } from "react";

export default function Navbar({
  brand = "ROBE BY SHAMSHAD",
  announcement = "ALL SHIPPING TO USA ARE ON HOLD DUE TO NEW TARIFF ADVISORY UNTIL FURTHER NOTICE",
  links = ["HOME", "SHOP", "ABOUT US", "COLLECTION", "SHAREE", "BAGS", "SALE"],
  cartCount = 0,
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-neutral-200 sticky top-0 z-50 bg-white">
      {/* Announcement Bar */}
      <div className="w-full text-center text-[10px] sm:text-xs tracking-wide text-white py-2 px-3 bg-[#5b0e0e]">
        {announcement}
      </div>

      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 -ml-1 rounded-lg hover:bg-neutral-100 active:scale-[.98] transition"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobileDrawer"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <a href="#" className="inline-grid place-items-center w-9 h-9 rounded-full border border-neutral-300">
              <span className="font-black text-lg">R</span>
              <span className="sr-only">Home</span>
            </a>
          </div>

          {/* Center: Brand (hidden on mobile) */}
          <div className="hidden md:flex">
            <a href="#" className="font-semibold tracking-wide text-sm lg:text-base uppercase">
              {brand}
            </a>
          </div>

          {/* Right: Search + Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Search (≥sm) */}
            <div className="relative hidden sm:flex items-center">
              <svg
                className="absolute left-3 w-4 h-4 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="search products..."
                className="w-56 lg:w-72 rounded-full border border-neutral-200 pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>

            {/* Wishlist */}
            <button className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Wishlist">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>

            {/* Account */}
            <button className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Account">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart */}
            <button className="p-2 rounded-lg hover:bg-neutral-100 relative" aria-label="Cart">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-[#5b0e0e] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Menu Row */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <ul className="flex items-center justify-center gap-6 lg:gap-10 py-3">
            {links.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="text-[12px] lg:text-[13px] font-semibold tracking-[0.22em] text-neutral-500 hover:text-neutral-900 uppercase"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobileDrawer"
        className={`md:hidden border-t border-neutral-200 overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="grid gap-2 p-4 bg-white">
          {links.map((label) => (
            <li key={label}>
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-semibold text-neutral-700 uppercase"
                style={{ letterSpacing: "0.18em" }}
              >
                {label}
              </a>
            </li>
          ))}
          {/* Optional search inside drawer for very small screens */}
          <li className="pt-2">
            <div className="relative">
              <svg className="absolute left-3 w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="search products..."
                className="w-full rounded-full border border-neutral-200 pl-9 pr-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
              />
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
