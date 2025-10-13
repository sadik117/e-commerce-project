import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    paymentMethod: "Cash On Delivery",
    shipping: "Standard Shipping",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 100;
  const total = subtotal + shipping;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        customer: form,
        items: cart,
        subtotal,
        shipping,
        total,
        createdAt: new Date(),
      };

      await axios.post("http://localhost:3000/orders", orderData);
      toast.success("Order placed successfully!");

      // Clear cart
      localStorage.removeItem("cart");
      setCart([]);

      // Reset form
      setForm({
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
        address: "",
        paymentMethod: "Cash On Delivery",
        shipping: "Standard Shipping",
      });
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-8">
      {/* Left side: Shipping form */}
      <form
        onSubmit={handleCheckout}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Shipping Address
        </h2>

        <input
          name="email"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Street Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="2"
          required
        />

        {/* Payment Method */}
        <div>
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <p className="border rounded p-2 bg-gray-50 text-gray-700">
            Cash On Delivery
          </p>
        </div>

        {/* Shipping Option */}
        <div>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="radio"
              name="shipping"
              value="Standard Shipping"
              checked={form.shipping === "Standard Shipping"}
              onChange={handleChange}
            />
            Standard Shipping (Tk. 100)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5b0e0e] text-white py-2 rounded hover:bg-[#7d1a1a]"
          disabled={loading || cart.length === 0}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      {/* Right side: Order Review */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">Order Review</h2>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">৳ {item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-1 text-right">
          <p>Subtotal: ৳ {subtotal.toFixed(2)}</p>
          <p>Shipping: ৳ {shipping.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ৳ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
