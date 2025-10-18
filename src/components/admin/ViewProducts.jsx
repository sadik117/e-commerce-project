/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 
  const [uploading, setUploading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data.products || res.data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setUploading(true);
      try {
        const res = await axios.post("http://localhost:3000/upload", { image: reader.result });
        setForm((prev) => ({ ...prev, image: res.data.url }));
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${editingProduct}`, form);
      toast.success("Product updated successfully");
      setEditingProduct(null);
      fetchProducts();
    } catch {
      toast.error("Update failed");
    }
  };

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Admin Product Management
      </h1>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-left">Image</th>
              <th className="py-3 px-2 sm:px-4 text-left">Name</th>
              <th className="py-3 px-2 sm:px-4 text-left">Category</th>
              <th className="py-3 px-2 sm:px-4 text-left">Price</th>
              <th className="py-3 px-2 sm:px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-2 sm:px-4">
                    <img src={p.image} alt={p.name} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded" />
                  </td>
                  <td className="py-3 px-2 sm:px-4 font-medium text-gray-800">{p.name}</td>
                  <td className="py-3 px-2 sm:px-4 capitalize text-gray-600">{p.category}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-700 font-semibold">৳ {p.price}</td>
                  <td className="py-3 px-2 sm:px-4 text-center space-x-2">
                    <button onClick={() => handleEdit(p)} className="px-2 py-1 sm:px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="px-2 py-1 sm:px-3 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button key={num} onClick={() => setCurrentPage(num + 1)} className={`px-3 py-1 border rounded ${currentPage === num + 1 ? "bg-[#5b0e0e] text-white" : "hover:bg-gray-100"}`}>
              {num + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product Name" className="w-full border p-2 rounded" />
              <input name="price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="w-full border p-2 rounded" />
              <input name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="w-full border p-2 rounded" />
              
              {/* Image Upload */}
              <div>
                <label className="block mb-1 font-medium">Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded mb-2" />
                {uploading ? (
                  <p className="text-sm text-gray-500">Uploading...</p>
                ) : form.image ? (
                  <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
                ) : null}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
