# 👗 ROBE BY SHAMSHAD

**ROBE BY SHAMSHAD** is a modern eCommerce web application for fashion and luxury apparel.  
It’s built with **React + Tailwind CSS + Firebase + Express.js + MongoDB**, featuring a full shopping experience — from browsing collections to secure checkout, with admin management and dark mode support.

---

## 🌟 Features

### 🛍️ Customer Features
- Browse collections (Dresses, Bags, Accessories)
- Product search with instant suggestions
- Add to **Cart** and **Wishlist**
- Update and remove items dynamically
- Apply **coupon codes** at checkout
- Responsive UI (mobile-first)
- Light/Dark mode toggle 🌙

### 🔐 Authentication
- Firebase Email/Password registration & login
- Google OAuth integration (optional)
- Persistent login state
- Protected routes for checkout & admin

### 💳 Checkout System
- Cart summary with price calculation
- Coupon discount verification (`/verify-coupon`)
- Order submission to backend (`/orders`)
- Real-time order validation

### 🛠️ Admin Features
- View all products with CRUD (Create, Read, Update, Delete)
- Add new items (with image upload via Cloudinary)
- Manage inventory and prices
- View user orders and status updates

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, React Router, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB  |
| **Auth** | Firebase Authentication |
| **Storage** | Cloudinary (for product images) |
| **Deployment** | Vercel (client & server) |

---

🌐 API Endpoints
🛒 Orders

POST /orders
Save user order to the database.

🎟️ Coupon Verification

POST /verify-coupon
Validate coupon and return discount amount.

📦 Products

GET /products
GET /products/:id
POST /products (Admin only)
PATCH /products/:id
DELETE /products/:id

💡 Future Enhancements

Stripe / SSLCommerz payment gateway integration

Order tracking system

Product reviews & ratings

Email notifications
