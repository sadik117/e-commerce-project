/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, Tag, DollarSign, Calendar, Plus, Trash2 } from "lucide-react";

export default function CouponPage() {
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    userEmail: "",
    code: "",
    discount: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://robe-by-shamshad-server.vercel.app/users");
      setUsers(res.data.users || res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://robe-by-shamshad-server.vercel.app/coupons");
      setCoupons(res.data.coupons || res.data);
    } catch (err) {
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userEmail || !form.code || !form.discount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post("https://robe-by-shamshad-server.vercel.app/coupons", form);
      toast.success("Coupon assigned successfully!");
      setForm({ userEmail: "", code: "", discount: "" });
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to assign coupon");
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    
    try {
      await axios.delete(`https://robe-by-shamshad-server.vercel.app/coupons/${couponId}`);
      toast.success("Coupon deleted successfully!");
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 -mt-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Tag className="text-blue-600" size={28} />
            Coupon Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Assign and manage discount coupons for users
          </p>
        </div>

        {/* Coupon Form */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus size={20} className="text-green-600" />
            Assign New Coupon
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Email Select */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                User Email
              </label>
              <select
                value={form.userEmail}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
                required
              >
                <option value="">Select User Email</option>
                {users.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Coupon Code */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-gray-400" />
                Coupon Code
              </label>
              <input
                type="text"
                placeholder="Enter coupon code (e.g., SUMMER25)"
                value={form.code}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                required
              />
            </div>

            {/* Discount Amount */}
            <div>
              <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                <DollarSign size={16} className="text-gray-400" />
                Discount Amount (৳)
              </label>
              <input
                type="number"
                placeholder="Enter discount amount in Taka"
                value={form.discount}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                min="1"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Assign Coupon
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Tag size={20} />
              All Coupons ({coupons.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading coupons...</p>
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-8">
              <Tag className="mx-auto text-gray-300 mb-3" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
              <p className="text-gray-500 text-sm">Assign your first coupon to get started</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User Email
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coupon Code
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {coupons.map((coupon) => (
                      <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-900">
                          {coupon.userEmail}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {coupon.code}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-semibold text-green-600">
                          ৳ {coupon.discount}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(coupon.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDeleteCoupon(coupon._id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1 rounded"
                            title="Delete coupon"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {coupons.map((coupon) => (
                  <div key={coupon._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {coupon.code}
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            ৳ {coupon.discount}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium truncate">
                          {coupon.userEmail}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteCoupon(coupon._id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      Created: {new Date(coupon.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}