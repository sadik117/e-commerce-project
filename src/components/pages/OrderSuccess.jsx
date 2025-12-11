import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router";


export default function OrderSuccess() {
  const location = useLocation();
  
  // Optional: Receive order info through navigation
  const order = location.state?.order || null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center animate-fadeIn">
        
        {/* Success Icon */}
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Weʼll contact you soon for delivery.
        </p>

        {/* Order Details (Optional) */}
        {order && (
          <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>

            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-1">
                <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                <span className="font-semibold">
                  ৳{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <hr className="my-2" />

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="font-bold text-lg">৳{order.totalAmount}</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/"
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    </div>
  );
}
