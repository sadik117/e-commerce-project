/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CouponPage() {
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    userEmail: "",
    code: "",
    discount: "",
  });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data.users || res.data);
  };

  const fetchCoupons = async () => {
    const res = await axios.get("http://localhost:3000/coupons");
    setCoupons(res.data.coupons || res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/coupons", form);
      toast.success("Coupon assigned!");
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to assign coupon");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assign Coupon to User</h1>

      {/* Coupon Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg space-y-4">
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
        >
          <option>Select User Email</option>
          {users.map((user) => (
            <option key={user._id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Coupon Code"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <input
          type="number"
          placeholder="Discount (Taka)"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Assign Coupon
        </button>
      </form>

      {/* Show All Coupons */}
      <h2 className="text-xl font-bold mt-8">All Coupons</h2>
      <table className="w-full mt-4 bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Discount (৳)</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id} className="border-b">
              <td className="p-2">{c.userEmail}</td>
              <td className="p-2">{c.code}</td>
              <td className="p-2">৳ {c.discount}</td>
              <td className="p-2">{new Date(c.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
