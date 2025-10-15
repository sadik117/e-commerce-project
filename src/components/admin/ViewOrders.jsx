import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Package,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import Loading from "../layouts/Loading";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortenId = (id) => `${id.substring(0, 8)}...`;

  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Package className="text-[#5b0e0e]" size={32} />
            Order Management
          </h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#5b0e0e]">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-600">Total Order</p>
            <p className="text-2xl font-bold text-gray-900">
              ৳ {orders.reduce((sum, order) => sum + order.subtotal, 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Avg. Order</p>
            <p className="text-2xl font-bold text-gray-900">
              ৳{" "}
              {orders.length > 0
                ? (
                    orders.reduce((sum, order) => sum + order.subtotal, 0) /
                    orders.length
                  ).toFixed(2)
                : "0.00"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">
              {
                orders.filter((order) => {
                  const orderDate = new Date(order.createdAt);
                  const now = new Date();
                  return (
                    orderDate.getMonth() === now.getMonth() &&
                    orderDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Package size={20} />
              All Orders ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                When orders are placed, they will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  {/* Responsive layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Order Info */}
                    <div className="md:col-span-2">
                      <span className="inline-block px-2 py-1 bg-[#5b0e0e] text-white text-xs font-medium rounded">
                        {shortenId(order._id)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="md:col-span-3 text-sm">
                      <div className="flex items-center gap-2 font-medium">
                        <User size={14} className="text-gray-400" />
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={12} /> {order.customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={12} /> {order.customer.mobile}
                      </div>
                      <div className="flex items-start gap-2 text-gray-600 mt-1">
                        <MapPin size={12} className="mt-1" />{" "}
                        <span>{order.customer.address}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="md:col-span-3 text-sm">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between mb-1 text-gray-800"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>৳ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-gray-500 mt-1">
                          +{order.items.length - 2} more items
                        </p>
                      )}
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-2 text-right text-sm">
                      <div className="text-gray-600">
                        Subtotal: ৳ {order.subtotal.toFixed(2)}
                      </div>
                      {/* <div className="text-gray-600">
                        Shipping: ৳ {order.shipping.toFixed(2)}
                      </div> */}
                      <div className="text-gray-600">
                        Payment:{" "}
                        <span className="font-medium">
                          {order.customer.paymentMethod}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-right">
                      <div className="text-lg font-bold text-[#5b0e0e]">
                        ৳ {order.subtotal.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
