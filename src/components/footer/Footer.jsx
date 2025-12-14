import React from "react";

export default function Footer({
  brand = "Robe By Shamshad Company",
  phone = "+8801401836480",
  hours = "(8am–12pm)",
  email = "shamshadrobe@gmail.com",
  addressLines = ["Robe By Shamshad Company Ltd.", "Dhaka, Bangladesh"],
  year = new Date().getFullYear(),
}) {
  const cols = {
    ABOUT: ["Blog","About Us","Privacy Policy"],
    INFORMATION: [
      "Terms & Conditions",
      "Payment Options",
      "Coverage Areas",
    ],
    "CUSTOMER SERVICE": [
      "FAQs",
      "Store Locator",
      "Report Issue",
    ],
  };

  return (
    <footer className="bg-[#0e0a0a] text-white">
      {/* Logo Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row items-center gap-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="https://i.ibb.co.com/xK5vVGb2/rbs-logo.jpg" 
                alt="Robe By Shamshad logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">{brand}</h2>
              <p className="text-gray-300 italic mt-1">-"The shop is in your hand".</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-8">
        <div className="grid gap-10 py-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Link groups */}
          {Object.entries(cols).map(([title, items]) => (
            <nav key={title} className="space-y-4">
              <h6 className="font-bold text-lg text-white mb-4 pb-2 border-b border-gray-700">
                {title}
              </h6>
              <ul className="space-y-3">
                {items.map((label) => (
                  <li key={label}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-white transition-colors"></span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Info block */}
          <aside className="space-y-4">
            <h6 className="font-bold text-lg text-white mb-4 pb-2 border-b border-gray-700">
              CONTACT INFO
            </h6>
            <div className="text-gray-300 space-y-4">
              <div>
                <p className="font-semibold text-white text-lg mb-2">{brand}</p>
                {addressLines.map((line) => (
                  <p key={line} className="text-sm mb-1">{line}</p>
                ))}
              </div>
         
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">{phone}</p>
                    <p className="text-sm opacity-80">{hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a
                    href={`mailto:${email}`}
                    className="text-white hover:text-blue-300 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Newsletter + Socials */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Newsletter */}
          <div className="w-full lg:w-1/2">
            <p className="text-lg font-semibold text-white mb-3">
              📬 Sign up for our Newsletter
            </p>
            <p className="text-gray-300 text-sm mb-4">
              Get updates on new arrivals, exclusive offers, and fashion tips.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Socials */}
          <div className="w-full lg:w-auto">
            <p className="text-lg font-semibold text-white mb-4 text-center lg:text-left">
              Follow Us
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4">
              {[
                { 
                  href: "http://facebook.com/robebyshamshad", 
                  label: "Facebook",
                  icon: (
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.02H7.9v-2.91h2.41V9.41c0-2.38 1.4-3.69 3.56-3.69 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.91h-2.21V22c4.78-.74 8.44-4.91 8.44-9.93z" />
                  )
                },
                { 
                  href: "https://www.instagram.com/robebyshamshad/", 
                  label: "Instagram",
                  icon: (
                    <path d="M12 2.2c3.2 0 3.58.012 4.85.068 1.17.054 1.97.24 2.66.51.7.27 1.33.64 1.85 1.2a5.1 5.1 0 0 1 1.2 1.85c.27.69.46 1.49.51 2.66.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.51 2.66a5.1 5.1 0 0 1-1.2 1.85 5.1 5.1 0 0 1-1.85 1.2c-.69.27-1.49.46-2.66.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.66-.51a5.1 5.1 0 0 1-1.85-1.2 5.1 5.1 0 0 1-1.2-1.85c-.27-.69-.46-1.49-.51-2.66-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.97.51-2.66.27-.7.64-1.33 1.2-1.85a5.1 5.1 0 0 1 1.85-1.2c.69-.27 1.49-.46 2.66-.51C8.42 2.21 8.8 2.2 12 2.2zm0 5.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 1.8a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm6.1-2.9a1.35 1.35 0 1 1-2.7 0 1.35 1.35 0 0 1 2.7 0z" />
                  )
                },
                { 
                  href: "#", 
                  label: "X / Twitter",
                  icon: (
                    <path d="M18.244 2h3.166l-6.92 7.91L22.5 22h-6.17l-4.83-6.31L5.82 22H2.65l7.4-8.45L1.5 2h6.31l4.36 5.77L18.244 2zm-1.08 18h1.75L7.01 4h-1.8l12.954 16z" />
                  )
                },
                { 
                  href: "#", 
                  label: "YouTube",
                  icon: (
                    <path d="M23.5 7.2s-.23-1.67-.95-2.4c-.9-.95-1.9-.95-2.36-1C17.74 3.5 12 3.5 12 3.5S6.26 3.5 3.81 3.8c-.46.05-1.46.05-2.36 1C.73 5.53.96 7.2.96 7.2s.04 1.96.04 3.9v1.8c0 1.94-.04 3.9-.04 3.9s.23 1.67.95 2.4c.9.95 1.9.95 2.36 1C6.26 20.5 12 20.5 12 20.5s5.74 0 8.19-.3c.46-.05 1.46-.05 2.36-1 .72-.73.95-2.4.95-2.4s.04-1.96.04-3.9v-1.8c0-1.94-.04-3.9-.04-3.9zM9.6 15.2V7.9l6.4 3.65-6.4 3.65z" />
                  )
                }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="opacity-90"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
              
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-50"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      
      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {year} {brand}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}