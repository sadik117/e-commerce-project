import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Calendar, User, Phone, Mail, MapPin, DollarSign, Truck } from "lucide-react";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shortenId = (id) => {
    return `${id.substring(0, 8)}...`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#5b0e0e]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <Package className="text-[#5b0e0e]" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳ {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳ {orders.length > 0 ? (orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toFixed(2) : '0.00'}
                </p>
              </div>
              <Truck className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    const now = new Date();
                    return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <Calendar className="text-purple-500" size={24} />
            </div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">When orders are placed, they will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors">
                  {/* Mobile View */}
                  <div className="block lg:hidden">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-2 py-1 bg-[#5b0e0e] text-white text-xs font-medium rounded">
                            {shortenId(order._id)}
                          </span>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-[#5b0e0e]">
                          ৳ {order.total.toFixed(2)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User size={16} className="text-gray-400" />
                          <span className="font-medium">{order.customer.firstName} {order.customer.lastName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-gray-600">{order.customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-gray-600">{order.customer.mobile}</span>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <h4 className="font-medium text-sm mb-2">Items ({order.items.length})</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="flex-1">{item.name} × {item.quantity}</span>
                              <span className="font-medium">৳ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between text-sm border-t pt-3">
                        <div>
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="ml-2 font-medium">৳ {order.subtotal.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Shipping:</span>
                          <span className="ml-2 font-medium">৳ {order.shipping.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <span className="inline-block px-2 py-1 bg-[#5b0e0e] text-white text-xs font-medium rounded">
                        {shortenId(order._id)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="flex items-center gap-2 mb-1">
                        <User size={14} className="text-gray-400" />
                        <span className="font-medium">{order.customer.firstName} {order.customer.lastName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={12} />
                        {order.customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={12} />
                        {order.customer.mobile}
                      </div>
                    </div>
                    
                    <div className="col-span-3">
                      <div className="text-sm">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex justify-between mb-1">
                            <span className="truncate">{item.name} × {item.quantity}</span>
                            <span className="ml-2">৳ {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-gray-500 mt-1">
                            +{order.items.length - 2} more items
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-right">
                      <div className="text-sm text-gray-600">Subtotal: ৳ {order.subtotal.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Shipping: ৳ {order.shipping.toFixed(2)}</div>
                    </div>
                    
                    <div className="col-span-2 text-right">
                      <div className="text-lg font-bold text-[#5b0e0e]">৳ {order.total.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setSelectedOrder(null)} />
              
              <div className="relative inline-block w-full max-w-2xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:p-6">
                {/* Modal content would go here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}