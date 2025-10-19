import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../authentication/AuthProvider";
import useUserRole from "../hooks/useUserRole";


export default function Navbar({
  brand = "ROBE BY SHAMSHAD",
  announcement = "ALL SHIPPING TO USA ARE ON HOLD DUE TO NEW TARIFF ADVISORY UNTIL FURTHER NOTICE",
}) {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const { user, logOut } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(savedCart);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const currentCartCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Define dynamic nav links
  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "SHOP", path: "/shop" },
    { label: "COLLECTION", path: "/collection" },
    { label: "DRESS", path: "/dress" },
    { label: "BAGS", path: "/bags" },
  ];

  if (!roleLoading && user && role === "admin") {
    navLinks.push({ label: "ADMIN DASHBOARD", path: "/admin" });
  }

  return (
    <header className="w-full border-b border-neutral-200 sticky top-0 z-50 bg-white">
      {/* Announcement Bar */}
      <div className="w-full text-center text-[10px] sm:text-xs tracking-wide text-white py-2 px-3 bg-[#5b0e0e]">
        {announcement}
      </div>

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100"
              onClick={() => setOpen(!open)}
            >
              {open ? "✕" : "☰"}
            </button>
            <NavLink
              to="/"
              className="inline-grid place-items-center w-9 h-9 rounded-full border border-neutral-300"
            >
              <span className="font-black text-lg">R</span>
            </NavLink>
          </div>

          {/* Center: Brand & Nav Links */}
          <div className="flex flex-col items-center">
            <NavLink
              to="/"
              className="font-semibold tracking-wide text-sm uppercase"
            >
              {brand}
            </NavLink>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex gap-6 mt-2 text-sm text-gray-700 font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `hover:text-[#5b0e0e] transition-colors ${
                      isActive ? "text-[#5b0e0e] font-semibold" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Auth Buttons */}
              {!user ? (
                <NavLink
                  to="/auth/login"
                  className="hover:text-[#5b0e0e] transition-colors"
                >
                  LOGIN
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-[#5b0e0e] font-medium"
                >
                  LOGOUT
                </button>
              )}
            </nav>
          </div>

          {/* Right: Cart */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg hover:bg-neutral-100 relative"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
            >
              🛒
              {currentCartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#5b0e0e] text-white">
                  {currentCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 text-[#5b0e0e] font-semibold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {!user ? (
              <NavLink
                to="/auth/login"
                onClick={() => setOpen(false)}
                className="block py-2 px-3 rounded-lg hover:bg-gray-100"
              >
                LOGIN
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="block py-2 px-3 rounded-lg text-left hover:bg-gray-100 text-red-600"
              >
                LOGOUT
              </button>
            )}
          </nav>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[9999] overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform translate-x-0 transition-transform duration-300 animate-slideIn">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">
                  Your Cart ({currentCartCount})
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border border-gray-200 p-3 rounded-lg mb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-error font-semibold">
                          Tk {item.price}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1"
                            >
                              -
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-4 border-t space-y-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>Tk {calculateTotal().toLocaleString()}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="w-full bg-[#5b0e0e] text-white py-3 px-3 rounded-lg hover:bg-[#4a0b0b] transition"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
