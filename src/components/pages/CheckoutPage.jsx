import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // Fixed amount
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    paymentMethod: "Cash On Delivery",
  });

  // Load cart from localStorage on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Safe calculation (prevents undefined / NaN errors)
  const subtotal =
    cart?.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0) ||
    0;

  const finalTotal = Math.max(subtotal - (discount || 0), 0);

  //  Apply Coupon (fixed amount from backend)
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Enter a coupon code!");
      return;
    }
    try {
      const { data } = await axios.post("https://robe-by-shamshad-server.vercel.app/verify-coupon", {
        code: couponCode,
      });

      if (data.valid) {
        setDiscount(data.discountAmount); // fixed discount
        toast.success(`Coupon Applied! ৳${data.discountAmount} off`);
      } else {
        toast.error(data.message || "Invalid Coupon");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error applying coupon");
    }
  };

  //  Checkout Function
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!cart.length) return toast.error("Your cart is empty!");

    setLoading(true);
    try {
      const orderData = {
        customer: form,
        items: cart,
        subtotal,
        discount,
        totalAmount: finalTotal,
        couponApplied: couponCode || null,
        createdAt: new Date(),
      };

      await axios.post("https://robe-by-shamshad-server.vercel.app/orders", orderData);
      toast.success("Order placed successfully!");

      // Reset form & cart
      localStorage.removeItem("cart");
      setCart([]);
      setDiscount(0);
      setCouponCode("");
      setForm({
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
        address: "",
        paymentMethod: "Cash On Delivery",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-8">
      {/* LEFT SIDE - FORM */}
      <form
        onSubmit={handleCheckout}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Shipping Details
        </h2>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border p-2 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full border p-2 rounded"
          rows={2}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#5b0e0e] text-white py-2 rounded"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      {/* RIGHT SIDE - ORDER SUMMARY */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">Order Review</h2>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {cart.map((item, idx) => (
            <div
              key={item._id || idx}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  className="w-16 h-16 rounded object-cover"
                  alt={item.name}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">
                ৳ {(item.price * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-2 w-2/3 rounded"
          />
          <button
            type="button"
            onClick={applyCoupon}
            className="bg-black text-white p-2 rounded ml-2"
          >
            Apply
          </button>
        </div>

        <div className="border-t mt-4 pt-4 space-y-1 text-right">
          <p>Subtotal: ৳ {Number(subtotal).toFixed(2)}</p>
          <p>Discount: -৳ {Number(discount || 0).toFixed(2)}</p>
          <p className="font-bold text-lg">
            Total: ৳ {Number(finalTotal || 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
