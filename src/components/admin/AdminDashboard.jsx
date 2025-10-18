import { useState } from "react";
import { NavLink, Outlet } from "react-router";

export default function AdminDashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold text-lg">{open ? "Admin Panel" : "AP"}</span>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 p-3 space-y-2">
          {/* Add Product */}
          <NavLink
            to="add-product"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-[#5b0e0e] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {open && <span>Add Product</span>}
          </NavLink>

          {/* View Products */}
          <NavLink
            to="view-products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-[#5b0e0e] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm4 4h10M7 12h10M7 16h6"
              />
            </svg>
            {open && <span>View Products</span>}
          </NavLink>

          {/* View Orders */}
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-[#5b0e0e] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
            </svg>
            {open && <span>View Orders</span>}
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
