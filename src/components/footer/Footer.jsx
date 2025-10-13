import React from "react";

export default function Footer({
  brand = "Robe Company",
  phone = "09666200300",
  hours = "(8am–12pm)",
  email = "support@example.com",
  addressLines = ["Robe Company Ltd.", "123 Example Road", "City, Country"],
  year = new Date().getFullYear(),
}) {
  const cols = {
    ABOUT: [
      "About Us",
      "Careers",
      "Awards & Recognition",
      "Investors",
      "Franchise",
      "Share Department",
    ],
    INFORMATION: [
      "TERMS & CONDITIONS",
      "Payment Options",
      "Privacy Policy",
      "Franchise Programme",
      "Coverage areas",
    ],
    "POPULAR BRANDS": [
      "Brand One",
      "Brand Two",
      "Brand Three",
      "Brand Four",
      "Brand Five",
      "Brand Six",
      "Brand Seven",
    ],
    "CUSTOMER SERVICE": [
      "FAQs",
      "MyAccount",
      "Store Locator",
      "Care Guide",
      "Contact Info",
      "Report Issue",
    ],
  };

  return (
    <footer className="bg-zinc-600 text-white">
      {/* Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* 4 link groups */}
          {Object.entries(cols).map(([title, items]) => (
            <nav key={title} className="space-y-3">
              <h6 className="footer-title text-white">{title}</h6>
              <ul className="space-y-2">
                {items.map((label) => (
                  <li key={label}>
                    <a className="link link-hover text-sm opacity-80 hover:opacity-100">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Info block */}
          <aside className="space-y-3">
            <h6 className="footer-title text-white">INFO</h6>
            <div className="text-sm opacity-90 space-y-1">
              <p className="font-semibold text-white/90">{brand}</p>
              {addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}

              <p className="pt-2">
                Call us at:{" "}
                <span className="text-white font-medium">{phone}</span>{" "}
                <span className="opacity-70">{hours}</span>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${email}`}
                  className="link link-hover text-white"
                >
                  {email}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Newsletter + Socials */}
      <div className="border-t border-base-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Newsletter */}
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-semibold text-white mb-2">
              Sign up for our Newsletter
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:w-auto max-w-md"
            >
              <div className="join w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="input input-bordered join-item w-full bg-base-200"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </form>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            <a className="btn btn-ghost btn-circle" aria-label="Facebook">
              {/* Facebook */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-90"
              >
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.02H7.9v-2.91h2.41V9.41c0-2.38 1.4-3.69 3.56-3.69 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.91h-2.21V22c4.78-.74 8.44-4.91 8.44-9.93z" />
              </svg>
            </a>
            <a className="btn btn-ghost btn-circle" aria-label="X / Twitter">
              {/* X / Twitter */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-90"
              >
                <path d="M18.244 2h3.166l-6.92 7.91L22.5 22h-6.17l-4.83-6.31L5.82 22H2.65l7.4-8.45L1.5 2h6.31l4.36 5.77L18.244 2zm-1.08 18h1.75L7.01 4h-1.8l12.954 16z" />
              </svg>
            </a>
            <a className="btn btn-ghost btn-circle" aria-label="Instagram">
              {/* Instagram */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-90"
              >
                <path d="M12 2.2c3.2 0 3.58.012 4.85.068 1.17.054 1.97.24 2.66.51.7.27 1.33.64 1.85 1.2a5.1 5.1 0 0 1 1.2 1.85c.27.69.46 1.49.51 2.66.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.51 2.66a5.1 5.1 0 0 1-1.2 1.85 5.1 5.1 0 0 1-1.85 1.2c-.69.27-1.49.46-2.66.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.66-.51a5.1 5.1 0 0 1-1.85-1.2 5.1 5.1 0 0 1-1.2-1.85c-.27-.69-.46-1.49-.51-2.66-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.97.51-2.66.27-.7.64-1.33 1.2-1.85a5.1 5.1 0 0 1 1.85-1.2c.69-.27 1.49-.46 2.66-.51C8.42 2.21 8.8 2.2 12 2.2zm0 5.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 1.8a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm6.1-2.9a1.35 1.35 0 1 1-2.7 0 1.35 1.35 0 0 1 2.7 0z" />
              </svg>
            </a>
            <a className="btn btn-ghost btn-circle" aria-label="YouTube">
              {/* YouTube */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-90"
              >
                <path d="M23.5 7.2s-.23-1.67-.95-2.4c-.9-.95-1.9-.95-2.36-1C17.74 3.5 12 3.5 12 3.5S6.26 3.5 3.81 3.8c-.46.05-1.46.05-2.36 1C.73 5.53.96 7.2.96 7.2s.04 1.96.04 3.9v1.8c0 1.94-.04 3.9-.04 3.9s.23 1.67.95 2.4c.9.95 1.9.95 2.36 1C6.26 20.5 12 20.5 12 20.5s5.74 0 8.19-.3c.46-.05 1.46-.05 2.36-1 .72-.73.95-2.4.95-2.4s.04-1.96.04-3.9v-1.8c0-1.94-.04-3.9-.04-3.9zM9.6 15.2V7.9l6.4 3.65-6.4 3.65z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="btn btn-circle btn-outline fixed bottom-6 right-6"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Bottom bar */}
      <div className="border-t border-base-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs opacity-70">
          © {year} {brand}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
