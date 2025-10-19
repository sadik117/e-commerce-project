import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Upload, 
  Package, 
  FileText, 
  Tag, 
  Users, 
  Palette,
  Plus,
  Loader,
  Banknote
} from "lucide-react";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    gender: "",
    color: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ["sharee", "dress", "t-shirt", "watch", "bag", "hijab", "collection", "panjabi"];
  const genders = ["men", "women"];
  const colors = [
    { name: "black", code: "#000000" },
    { name: "white", code: "#ffffff" },
    { name: "red", code: "#dc2626" },
    { name: "blue", code: "#2563eb" },
    { name: "green", code: "#16a34a" },
    { name: "yellow", code: "#eab308" },
    { name: "orange", code: "#ea580c" },
    { name: "pink", code: "#db2777" },
    { name: "purple", code: "#9333ea" },
    { name: "navy", code: "#1e40af" },
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload image → Cloudinary (via backend)
      const uploadRes = await axios.post("http://localhost:3000/upload", {
        image,
      });
      const imageUrl = uploadRes.data.url;

      const productData = { ...form, image: imageUrl };
      await axios.post("http://localhost:3000/products", productData);

      toast.success("Product added successfully!");
      
      // Reset form
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        gender: "",
        color: "",
      });
      setImage(null);
      setImagePreview(null);
      document.getElementById("image-upload").value = "";
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 -mt-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8"> 
          <div className="inline-flex items-center justify-center w-10 h-10 bg-[#5b0e0e] rounded-full mb-1">
            <Plus className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Fill in the details to add a new product to your store</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Package size={18} className="text-[#5b0e0e]" />
                Product Name
              </label>
              <input
                name="name"
                placeholder="Enter product name..."
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5b0e0e] focus:border-[#5b0e0e] transition-all duration-200"
                required
              />
            </div>

            {/* Price & Description Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <Banknote size={18} className="text-[#5b0e0e]" />
                  Price (৳)
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5b0e0e] focus:border-[#5b0e0e] transition-all duration-200"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <FileText size={18} className="text-[#5b0e0e]" />
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter product description..."
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5b0e0e] focus:border-[#5b0e0e] transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Tag size={18} className="text-[#5b0e0e]" />
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <label 
                    key={cat} 
                    className={`flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      form.category === cat 
                        ? "border-[#5b0e0e] bg-[#5b0e0e] text-white shadow-md" 
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={form.category === cat}
                      onChange={handleChange}
                      className="hidden"
                      required
                    />
                    <span className="capitalize text-sm font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Users size={18} className="text-[#5b0e0e]" />
                Gender
              </label>
              <div className="flex gap-3">
                {genders.map((g) => (
                  <label 
                    key={g} 
                    className={`flex-1 flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      form.gender === g 
                        ? "border-[#5b0e0e] bg-[#5b0e0e] text-white shadow-md" 
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="capitalize text-sm font-medium">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Palette size={18} className="text-[#5b0e0e]" />
                Color
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                {colors.map((clr) => (
                  <label key={clr.name} className="relative">
                    <input
                      type="radio"
                      name="color"
                      value={clr.name}
                      checked={form.color === clr.name}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`w-10 h-10 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                        form.color === clr.name
                          ? "ring-2 ring-[#5b0e0e] ring-offset-2 scale-110"
                          : "hover:scale-105 border-gray-300"
                      }`}
                      style={{ backgroundColor: clr.code }}
                      title={clr.name}
                    >
                      {form.color === clr.name && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Upload size={18} className="text-[#5b0e0e]" />
                Product Image
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#5b0e0e] transition-all duration-200">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl mx-auto border shadow-sm"
                      />
                      <p className="text-sm text-green-600 font-medium">Image selected ✓</p>
                      <p className="text-xs text-gray-500">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="text-gray-400" size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5b0e0e] text-white py-4 rounded-xl font-semibold hover:bg-[#7d1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Add Product
                </>
              )}
            </button>
          </form>
        </div>

        {/* Form Status */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            All fields marked with * are required
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;